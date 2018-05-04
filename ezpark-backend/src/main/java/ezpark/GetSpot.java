package ezpark;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

public class GetSpot extends DBHttpServlet {
    private static final double COORDINATE_OFFSET = 3;
    public static final String MESSAGE = "message";
    private String message;

    public GetSpot() throws Exception {
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
        Integer x;
        Integer y;
        try {
            x = Integer.parseInt(req.getParameter("x"));
            y = Integer.parseInt(req.getParameter("y"));
        } catch (Exception e) {
            x = null;
            y = null;
        }

        try {
            JSONArray list;
            Connection conn = cpds.getConnection();

            if (x == null || y == null) {
                list = getSpotsList(conn);
            } else {
                list = getSpots(x, y, conn);
            }
            result.put("spots", list);
            writer.write(result.toString());
            writer.close();
            conn.close();
        } catch (SQLException e) {
            result.put("spots", new JSONArray());
            writer.write(result.toString());
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(final HttpServletRequest req, final HttpServletResponse resp)
            throws ServletException, IOException {
        doGet(req, resp);
    }

    private JSONArray getSpotsList(Connection conn) throws SQLException {
        String searchQuery = "SELECT * FROM spot;";
        PreparedStatement preparedStatement = conn.prepareStatement(searchQuery);
        ResultSet spotsSet = preparedStatement.executeQuery();

        JSONArray spotsJsonArray = new JSONArray();
        while (spotsSet.next()) {
            JSONObject spotJson = new JSONObject();
            spotJson.put("x", spotsSet.getDouble("x"));
            spotJson.put("y", spotsSet.getDouble("y"));
            spotJson.put("location", spotsSet.getString("location_name"));
            spotJson.put("price_per_hour", spotsSet.getDouble("price_per_hour"));
            spotJson.put("available_spots", spotsSet.getDouble("available_spots"));
            spotJson.put("radius", spotsSet.getDouble("radius"));
            spotsJsonArray.put(spotJson);
        }

        return spotsJsonArray;
    }

    private JSONArray getSpots(int x, int y, Connection conn) throws SQLException {
        String searchQuery = "SELECT * FROM spot WHERE x > ? and x < ? and y > ? and y < ?;";
        PreparedStatement preparedStatement = conn.prepareStatement(searchQuery);
        preparedStatement.setDouble(1, x - COORDINATE_OFFSET);
        preparedStatement.setDouble(2, x + COORDINATE_OFFSET);
        preparedStatement.setDouble(3, y - COORDINATE_OFFSET);
        preparedStatement.setDouble(4, y + COORDINATE_OFFSET);

        ResultSet spotsSet = preparedStatement.executeQuery();

        JSONArray spotsJsonArray = new JSONArray();
        while (spotsSet.next()) {
            JSONObject spotJson = new JSONObject();
            spotJson.put("x", spotsSet.getDouble("x"));
            spotJson.put("y", spotsSet.getDouble("y"));
            spotJson.put("location", spotsSet.getString("location_name"));
            spotJson.put("price_per_hour", spotsSet.getDouble("price_per_hour"));
            spotJson.put("available_spots", spotsSet.getDouble("available_spots"));
            spotJson.put("radius", spotsSet.getDouble("radius"));
            spotsJsonArray.put(spotJson);
        }

        return spotsJsonArray;
    }
}
