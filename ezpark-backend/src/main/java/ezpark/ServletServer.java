package ezpark;

import javax.servlet.ServletException;

import io.undertow.Handlers;
import io.undertow.Undertow;
import io.undertow.server.HttpHandler;
import io.undertow.server.handlers.PathHandler;
import io.undertow.servlet.api.DeploymentInfo;
import io.undertow.servlet.api.DeploymentManager;

import static io.undertow.servlet.Servlets.defaultContainer;
import static io.undertow.servlet.Servlets.deployment;
import static io.undertow.servlet.Servlets.servlet;


/**
 * Driver class for all apis
 *
 */
public class ServletServer {
    public static void main(final String[] args) {
        try {
        	//q1
        	DeploymentInfo servletBuilder1 = deployment()
                    .setClassLoader(ServletServer.class.getClassLoader())
                    .setContextPath("/")
                    .setDeploymentName("test.war")
                    .addServlets(
                            servlet("Signup", Signup.class)
                            .addInitParam("message", "sign up")
                            .addMapping("/user/sign-up"),
                            servlet("Login", Login.class)
                            .addInitParam("message", "Login")
                            .addMapping("/user/login"), 
                            servlet("GetSpot", GetSpot.class)
                            .addInitParam("message", "get spot")
                            .addMapping("/spots/list"), 
                            servlet("CancelReserve", CancelReserve.class)
                            .addInitParam("message", "cancel reservation")
                            .addMapping("/reservations/cancel"),
                            servlet("CreateReserve", CreateReserve.class)
                            .addInitParam("message", "create reservation")
                            .addMapping("/reservations/create"),
                            servlet("GetReserve", GetReserve.class)
                            .addInitParam("message", "get reservation")
                            .addMapping("/reservations/get"),
                            servlet("ListReserve", ListReserve.class)
                            .addInitParam("message", "list reservations")
                            .addMapping("/reservations/list"));
                   

            DeploymentManager manager1 = defaultContainer().addDeployment(servletBuilder1);
            manager1.deploy();

            HttpHandler servletHandler = manager1.start();
            PathHandler path1 = Handlers.path()
                    .addPrefixPath("/", servletHandler);
            Undertow server1 = Undertow.builder()
                    .addHttpListener(8080, "0.0.0.0")
                    .setHandler(path1)
                    .build();
            server1.start();
            
           
        } catch (ServletException e) {
            throw new RuntimeException(e);
        }
    }
    
    public static boolean isValidParameter(String ... params) {
    		for (String s: params) {
    			if (s==null || s.isEmpty()) {
    				return false;
    			} 
    		}
    		return true;
    }
}
