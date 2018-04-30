package ezpark;

import java.beans.PropertyVetoException;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mchange.v2.c3p0.ComboPooledDataSource;

public class DBHttpServlet extends HttpServlet {
    protected ComboPooledDataSource cpds = new ComboPooledDataSource();
    // JDBC driver of MySQL Connector/J.
    protected static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
    // Database name.
    protected static final String DB_NAME = "ezpark";
    // URL for local MySQL DB.
    protected static final String URL = "jdbc:mysql://localhost:3306/" + DB_NAME
            + "?serverTimezone=UTC&useSSL=false&useUnicode=yes" +
            "&characterEncoding=UTF-8";
    // Username and password.
    protected static final String DB_USER = System.getenv("sqlusername");
    protected static final String DB_PWD = System.getenv("sqlpassword");
    protected static final String MESSAGE = "message";

    protected DBHttpServlet() throws PropertyVetoException {
        cpds = new ComboPooledDataSource();
        cpds.setDriverClass(JDBC_DRIVER); // loads the jdbc driver
        cpds.setJdbcUrl(URL);
        cpds.setUser(DB_USER);
        cpds.setPassword(DB_PWD);
    }

    // for Preflight
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException
    {
        setAccessControlHeaders(resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    void setAccessControlHeaders(HttpServletResponse resp) {
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }
}
