# References #

[Code Review Guide](http://apcfl01v:8090/display/CCDT/Code+Reviews)

# Project Setup
1. Clone this repo
    ```
    git clone https://bitbucket.incomm.com/scm/cca/core.git cca
    cd cca
    ```

2. Set up SQL Server database: follow "SQL Server setup instructions" document from step 2
3. Set up IntelliJ project
	1. Install/enable the following plugins (some are already installed, others you may need to download):
		* Maven Integration
		* Maven Integration Extension
		* Spring Boot
		* Spring Data
		* Spring MVC
		* Tomcat and TomEE Integration
		* NPM Script Runner
		* Git Integration
		* Database Tools and SQL
	2. Choose "Open"
	3. Browse to the cca project root directory and select it
    4. Wait for IntelliJ to load and index the project. It should automatically create a run configuration called `CcaApplication`, and `web/src/main/java` should be marked as sources root.
    5. Add database connection
		1. Copy value from `spring.datasource.url` in `web\src\main\resources\application-local.properties`. This is your connection URL.
		2. Click "Databases" on right-hand side (or go to View/Tool Windows/Database).
		3. Click the + icon and select `Data Source/Microsoft SQL Server`.
		4. Change "Name" to `cca-local` or something similar. This will help you distinguish it from DBs in other environments.
		5. Uncheck "Use Windows domain authentication" and enter username and password (from `application-local.properties`).
		6. Paste the connection URL into the `URL` field with option "URL only" (instead of "default").
		7. Click "Test Connection". It should show "Successful" next to the button.
		8. Click "OK".

4. Install maven dependencies
	1. Navigate to `projects/cca` in a terminal window.
	2. Run `mvn clean install`.

5. Install node dependencies
	1. Navigate to `projects/cca/web/ng-app` in a terminal window.
	2. Run `npm install`.

6. Run project
	1. Start the backend server (`CcaApplication` run configuration )
	2. Start the front end server
        ```
        cd ng-app
        npm start
        ``` 
	3. Once in the app, log in with credentials `admin.username` and `admin.password` defined in `web\src\main\resources\application.properties`.