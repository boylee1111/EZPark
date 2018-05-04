package ezpark;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;

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
        String updateReserveQuery = "UPDATE reservation SET isCanceled=1 WHERE id=?;";
        PreparedStatement updateReservationPreparedStatement = conn.prepareStatement(updateReserveQuery);
        updateReservationPreparedStatement.setLong(1, Long.parseLong(id));

        updateReservationPreparedStatement.executeUpdate();

        String searchQuery = "SELECT * FROM reservation WHERE id=?;";

        PreparedStatement getReservationPreparedStatement = conn.prepareStatement(searchQuery);
        getReservationPreparedStatement.setLong(1, Long.parseLong(id));

        ResultSet reservationSet = getReservationPreparedStatement.executeQuery();

        String location = "";
        if (reservationSet.next()) {
            location = reservationSet.getString("location");
        }

        if (location.isEmpty()) {
            return false;
        }

        String locationQuery = "SELECT * FROM spot WHERE location_name=?;";
        PreparedStatement locationPreparedStatement = conn.prepareStatement(locationQuery);
        locationPreparedStatement.setString(1, location);
        ResultSet spotSet = locationPreparedStatement.executeQuery();

        int availableSpots = -1;
        if (spotSet.next()) {
            availableSpots = spotSet.getInt("available_spots");
        }

        if (availableSpots == -1) {
            return false;
        }

        // Update available spot
        String updateSpotQuery = "UPDATE spot SET available_spots=? WHERE location_name=?;";
        PreparedStatement updatePrepareStatement = conn.prepareStatement(updateSpotQuery);
        updatePrepareStatement.setInt(1, availableSpots + 1);
        updatePrepareStatement.setString(2, location);
        updatePrepareStatement.executeUpdate();

        return true;
    }
}
