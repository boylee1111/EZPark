package ezpark;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.MessageFormat;
import java.util.Base64;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

public class Login extends DBHttpServlet {
    private String message;

    public Login() throws Exception {
    }

    @Override
    public void init(final ServletConfig config) throws ServletException {
        super.init(config);
        message = config.getInitParameter(MESSAGE);
    }

    @Override
    protected void doGet(final HttpServletRequest req, final HttpServletResponse resp)
            throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(final HttpServletRequest req, final HttpServletResponse resp)
            throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        PrintWriter writer = resp.getWriter();
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        JSONObject result = new JSONObject();
        if (ServletServer.isValidParameter(username, password)) {
            String passwordHash;
            try {
                MessageDigest digest = MessageDigest.getInstance("SHA-256");
                byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
                passwordHash = Base64.getEncoder().encodeToString(hash);
            } catch (NoSuchAlgorithmException e) {
                //hash failed
                result.put("success", false);
                result.put("error", "server error");
                writer.write(result.toString());
                writer.close();
                return;
            }
            try {
                Connection conn = cpds.getConnection();
                if (authenticate(username, passwordHash, conn)) {
                    result.put("success", true);
                } else {
                    result.put("success", false);
                    result.put("error", "wrong username or password");
                }
                writer.write(result.toString());
                writer.close();
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        } else {
            result.put("success", false);
            result.put("error", "username or password cannot be empty");
            writer.write(result.toString());
            writer.close();
        }
    }

    private boolean authenticate(String username, String passHash, Connection conn) throws SQLException {
        String checkQuery = MessageFormat.format(
                "SELECT * FROM user WHERE username=''{0}'' and password=''{1}''",
                username, passHash);

        Statement statement = conn.createStatement();
        ResultSet usersResultSet = statement.executeQuery(checkQuery);

        if (usersResultSet.next()) {
            return true;
        }
        return false;
    }
}
