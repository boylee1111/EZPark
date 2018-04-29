package ezpark;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Base64;
import java.util.Enumeration;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

public class Signup extends DBHttpServlet {
    private String message;

    public Signup() throws Exception {
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
        setAccessControlHeaders(resp);
        PrintWriter writer = resp.getWriter();

        Enumeration<String> headerNames = req.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            System.out.println("Header Name - " + headerName + ", Value - " + req.getHeader(headerName));
        }

        Enumeration<String> params = req.getParameterNames();
        while (params.hasMoreElements()) {
            String paramName = params.nextElement();
            System.out.println("Parameter Name - " + paramName + ", Value - " + req.getParameter(paramName));
        }

        String username = req.getParameter("username");
        String password = req.getParameter("password");
        String passwordHash;
        String email = req.getParameter("email");
        String phone = req.getParameter("phone");
        //these two can be null;
        JSONObject result = new JSONObject();
        if (ServletServer.isValidParameter(username, password)) {
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
                if (insertDB(username, passwordHash, email, phone, conn)) {
                    result.put("success", true);
                } else {
                    result.put("success", false);
                    result.put("error", "username already exists");
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

    public boolean insertDB(
            String username, String passHash, String email, String phone, Connection conn) throws SQLException {
        if (!DBUtil.isUserExist(username, conn)) {
            email = (email == null ? "" : email.trim());
            phone = (phone == null ? "" : phone.trim());

            String insertQuery = "insert into user (username, password, " +
                    "email, phone) values (?, ?, ?, ?);";
            PreparedStatement pstmt = conn.prepareCall(insertQuery);
            pstmt.setString(1, username);
            pstmt.setString(2, passHash);
            pstmt.setString(3, email);
            pstmt.setString(4, phone);
            pstmt.executeUpdate();
            return true;
        }

        return false;
    }
}
