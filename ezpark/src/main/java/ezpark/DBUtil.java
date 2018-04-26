package ezpark;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.MessageFormat;

public class DBUtil {
    public static boolean isUserExist(String username, Connection conn) throws SQLException {
        String checkQuery = MessageFormat.format(
                "SELECT * FROM user WHERE username=''{0}''",
                username);

        Statement statement = conn.createStatement();
        ResultSet usersResultSet = statement.executeQuery(checkQuery);

        return usersResultSet.next();
    }
}
