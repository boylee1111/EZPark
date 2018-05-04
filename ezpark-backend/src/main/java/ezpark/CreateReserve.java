package ezpark;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

public class CreateReserve extends DBHttpServlet {
    public static final String MESSAGE = "message";
    private String message;

    public CreateReserve() throws Exception {
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

        JSONObject result = new JSONObject();
        PrintWriter writer = resp.getWriter();
        String username = req.getParameter("username");
        String location = req.getParameter("location");
        String date = req.getParameter("reservation_date");
        String spaces = req.getParameter("reservations_space_hold"); // what does this one do?
        if (ServletServer.isValidParameter(username, location, date, spaces)) {
            try {
                Connection conn = cpds.getConnection();
                long id = insertDB(username, location, date, spaces, conn);
                if (id != -1) {
                    result.put("success", true);
                    result.put("reservation_id", id);
                } else {
                    result.put("success", false);
                    result.put("error", "failed to create reservations");
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

    private long insertDB(String username, String location, String date, String spaces, Connection conn) throws SQLException {
        if (!DBUtil.isUserExist(username, conn)) {
            return -1;
        }

        String locationQuery = "SELECT * FROM spot WHERE location_name=?;";
        PreparedStatement locationPrepareStatement =
                conn.prepareStatement(locationQuery);
        locationPrepareStatement.setString(1, location);

        ResultSet resultSet = locationPrepareStatement.executeQuery();
        // Not exist spot location
        if (!resultSet.next()) {
            return -1;
        }

        // No enough spots
        int availableSpots = resultSet.getInt("available_spots");
        if (availableSpots <= 0) {
            return -1;
        }

        // Create reservation and update available spots
        String insertQuery =
                "insert into reservation (username, location, time, " +
                        "space_hold_minutes) values (?, ?, ?, ?);";
        PreparedStatement insertPrepareStatement = conn.prepareStatement(
                insertQuery,
                Statement.RETURN_GENERATED_KEYS);
        insertPrepareStatement.setString(1, username);
        insertPrepareStatement.setString(2, location);
        insertPrepareStatement.setString(3, date);
        insertPrepareStatement.setString(4, spaces);

        insertPrepareStatement.executeUpdate();

        // Get generated id
        long id = -1;
        ResultSet generatedKey = insertPrepareStatement.getGeneratedKeys();
        if (generatedKey.next()) {
            id = generatedKey.getLong(1);
        }

        // Update available spot
        String updateQuery =
                "UPDATE spot SET available_spots=? WHERE location_name=?;";
        PreparedStatement updatePrepareStatement =
                conn.prepareStatement(updateQuery);
        updatePrepareStatement.setInt(1, availableSpots - 1);
        updatePrepareStatement.setString(2, location);
        updatePrepareStatement.executeUpdate();

        return id;
    }
}
