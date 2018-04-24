package ezpark;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.mchange.v2.c3p0.ComboPooledDataSource;

public class CreateReserve extends HttpServlet {
	// JDBC driver of MySQL Connector/J.
	private static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	// Database name.
	private static final String DB_NAME = "db";
	// URL for local MySQL DB.
	private static final String URL = "jdbc:mysql://localhost:3306/" + DB_NAME
			+ "?useSSL=false&useUnicode=yes&characterEncoding=UTF-8";
	// Username and password.
	private static final String DB_USER = System.getenv("sqlusername");
	private static final String DB_PWD = System.getenv("sqlpassword");
	ComboPooledDataSource cpds = new ComboPooledDataSource();
	public static final String MESSAGE = "message";
	private String message;

	public CreateReserve() throws Exception {
		cpds = new ComboPooledDataSource();
		cpds.setDriverClass(JDBC_DRIVER); // loads the jdbc driver
		cpds.setJdbcUrl(URL);
		cpds.setUser(DB_USER);
		cpds.setPassword(DB_PWD);
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
		JSONObject result = new JSONObject();
		PrintWriter writer = resp.getWriter();
		String username = req.getParameter("username");
		String location = req.getParameter("location");
		String date = req.getParameter("reservation_date");
		String time = req.getParameter("reservation_time");
		String spaces = req.getParameter("reservations_space_hold"); // what does this one do?
		if (ServletServer.isValidParameter(username, location, date, time, spaces)) {
			try {
				Connection conn = cpds.getConnection();
				long id = insertDB(username, location, date, time, spaces, conn);
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

	private long insertDB(String username, String location, String date, String time, String spaces, Connection conn) {
		// TODO
		return -1;
	}
}
