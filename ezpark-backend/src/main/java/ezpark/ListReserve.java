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

import org.json.JSONArray;
import org.json.JSONObject;

public class ListReserve extends DBHttpServlet {
    public static final String MESSAGE = "message";
    private String message;

    public ListReserve() throws Exception {
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
        String username = req.getParameter("username");
        if (ServletServer.isValidParameter(username)) {
            try {
                Connection conn = cpds.getConnection();
                JSONArray reservation = listReservations(username, conn);
                if (reservation != null && reservation.length() != 0) {
                    result.put("reservations", reservation);
                } else {
                    result.put("reservations", "");
                    result.put("error", "no such reservation");
                }
                writer.write(result.toString());
                writer.close();
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        } else {
            result.put("reservations", "");
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

    private JSONArray listReservations(String username, Connection conn) throws SQLException {
        String searchQuery =
                "SELECT * FROM reservation WHERE username=?;";
        PreparedStatement preparedStatement =
                conn.prepareStatement(searchQuery);
        preparedStatement.setString(1, username);

        ResultSet reservationsSet = preparedStatement.executeQuery();

        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm");

        JSONArray reservationJsonArray = new JSONArray();
        while (reservationsSet.next()) {
            JSONObject reservationJson = new JSONObject();
            reservationJson.put("reservation_id", reservationsSet.getInt("id"));
            reservationJson.put(
                    "location", reservationsSet.getString("location"));
            reservationJson.put(
                    "reservation_date", dateFormat.format(
                            reservationsSet.getTimestamp("time")));
            reservationJson.put(
                    "reservation_space_hold", reservationsSet.getInt("space_hold_minutes"));
            reservationJson.put(
                    "is_canceled", reservationsSet.getInt("isCanceled"));
            reservationJsonArray.put(reservationJson);
        }

        return reservationJsonArray;
    }
}
