package ezpark;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.MessageFormat;

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
        JSONObject result = new JSONObject();
        PrintWriter writer = resp.getWriter();
        int x;
        int y;
        try {
            x = Integer.parseInt(req.getParameter("x"));
            y = Integer.parseInt(req.getParameter("y"));
        } catch (Exception e) {
            result.put("spots", "illegal parameters");
            writer.write(result.toString());
            writer.close();
            return;
        }
        try {
            Connection conn = cpds.getConnection();
            JSONArray list = getSpots(x, y, conn);
            result.put("spots", list);
            writer.write(result.toString());
            writer.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(final HttpServletRequest req, final HttpServletResponse resp)
            throws ServletException, IOException {
        doGet(req, resp);
    }

    private JSONArray getSpots(int x, int y, Connection conn) throws SQLException {
        String searchQuery = MessageFormat.format(
                "SELECT * FROM spot WHERE x > {0} and x < {1} and y > {2} and y < {3}",
                x - COORDINATE_OFFSET, x + COORDINATE_OFFSET,
                y - COORDINATE_OFFSET, y + COORDINATE_OFFSET);

        Statement statement = conn.createStatement();
        ResultSet spotsSet = statement.executeQuery(searchQuery);

        JSONArray spotsJsonArray = new JSONArray();
        while (spotsSet.next()) {
            JSONObject spotJson = new JSONObject();
            spotJson.put("location", spotsSet.getString("location_name"));
            spotJson.put(
                    "price_per_hour", spotsSet.getDouble("price_per_hour"));
            spotJson.put(
                    "available_spots", spotsSet.getDouble("available_spots"));
            spotsJsonArray.put(spotJson);
        }

        return spotsJsonArray;
    }
}
