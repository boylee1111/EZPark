package ezpark;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

public class CancelReserve extends DBHttpServlet {
    public static final String MESSAGE = "message";
    private String message;

    public CancelReserve() throws Exception {
    }

    @Override
    public void init(final ServletConfig config) throws ServletException {
        super.init(config);
        message = config.getInitParameter(MESSAGE);
    }

    @Override
    protected void doGet(final HttpServletRequest req, final HttpServletResponse resp)
            throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        setAccessControlHeaders(resp);

        JSONObject result = new JSONObject();
        PrintWriter writer = resp.getWriter();
        String id = req.getParameter("id");
        if (ServletServer.isValidParameter(id)) {
            try {
                Connection conn = cpds.getConnection();
                if (delete(id, conn)) {
                    result.put("success", true);
                } else {
                    result.put("success", false);
                    result.put("error", "failed to cancel reservation");
                }
                writer.write(result.toString());
                writer.close();
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        } else {
            result.put("success", false);
            result.put("error", "illegal parameters");
            writer.write(result.toString());
            writer.close();
        }

    }

    @Override
    protected void doPost(final HttpServletRequest req, final HttpServletResponse resp)
            throws ServletException, IOException {
        doGet(req, resp);
    }

    private boolean delete(String id, Connection conn) throws SQLException {
        String updateQuery =
                "UPDATE reservations SET isCanceled=true WHERE id=?;";
        PreparedStatement preparedStatement =
                conn.prepareStatement(updateQuery);
        preparedStatement.setLong(1, Long.parseLong(id));

        preparedStatement.executeUpdate();
        return true;
    }
}
