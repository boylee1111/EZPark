package ezpark;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

public class GetReserve extends DBHttpServlet {
    public static final String MESSAGE = "message";
    private String message;

    public GetReserve() throws Exception {
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
                JSONObject reservation = getReservation(id, conn);
                if (reservation != null) {
                    result.put("reservation", reservation);
                } else {
                    result.put("reservation", "");
                    result.put("error", "no such reservation");
                }
                writer.write(result.toString());
                writer.close();
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        } else {
            result.put("reservation", "");
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

    private JSONObject getReservation(String id, Connection conn) throws SQLException {
        String searchQuery = "SELECT * FROM reservation WHERE id=? and isCanceled=0;";

        PreparedStatement preparedStatement = conn.prepareStatement(searchQuery);
        preparedStatement.setLong(1, Long.parseLong(id));

        ResultSet reservationSet = preparedStatement.executeQuery();

        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm");

        if (reservationSet.next()) {
            JSONObject reservationJson = new JSONObject();
            reservationJson.put("reservation_id", reservationSet.getInt("id"));
            reservationJson.put("location", reservationSet.getString("location"));
            reservationJson.put("reservation_date", dateFormat.format(reservationSet.getDate("time")));
            reservationJson.put("reservation_space_hold", reservationSet.getInt("space_hold_minutes"));
            return reservationJson;
        }
        return null;
    }
}
