package com.incomm.cca.util;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

/**
 * <p>
 * Manages the ThreadPools used by the Async services.
 */
public class ThreadPoolUtil implements ServletContextListener {

    public static final ExecutorService threadPool = Executors.newFixedThreadPool(50);

    @Override
    public void contextInitialized(ServletContextEvent sce) {
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        if (!threadPool.isShutdown()) {
            threadPool.shutdown(); // Disable new tasks from being submitted
            try {
                // Wait a while for existing tasks to terminate
                if (!threadPool.awaitTermination(30, TimeUnit.SECONDS)) {
                    threadPool.shutdownNow(); // Cancel currently executing tasks
                    // Wait a while for tasks to respond to being cancelled
                    if (!threadPool.awaitTermination(30, TimeUnit.SECONDS)) {
                        System.err.println("Pool did not terminate");
                    }
                }
            } catch (InterruptedException ie) {
                // (Re-)Cancel if current thread also interrupted
                threadPool.shutdownNow();
                // Preserve interrupt status
                Thread.currentThread()
                      .interrupt();
            }
        }
    }
}
