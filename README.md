The engage aplpication utilizied the MEAN Stack (Mongooose, Express, Angular, and Node.JS) in order to provide a front and back end framework to provide a resource that allows students to engage with non-profit organizations. 

Launching the Application:  
In order to run the program, there are a few software requiremnets that should not pose as much of a hindrance. 
(1). Node: in order to install node, you must first have "Homebrew" installed. The first step is to open a terminal window, and enter the following "ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"" To check that the installation was successful, type "brew-v" into the terminal window and make sure that there's a version result. 

Upon installing Homberew, the next step is to install node and npm. These can both be accomplished through the same step: simply type in "brew install node" into the terminal and Hombrew should take care of the rest. 
(2). Additionally, given that the applicaiton utilizies MongoDB, it is imperative that the database software is also on your machine. Wihtin terminal, execute "brew install mongodb" in order to download MongoDB.

(3) To set up the necessary environment for the application, navigate to the engage folder within a terminal window. You'll want to have to shells up to run both the express and mongodb server. In the first shell, enter the command "mongod" to initialize a mongodb server on your machine. Before initializing the express server, run the command "npm install" in order to install the necessary packages for the application into a directory called node_modules. I have included those packages in the final upload, and they are also avaialble under the dependencies within the package.json file. 

(4) After installing the necessary depndencies, enter the command "node server" into a terminal window within the engage directory, which should create a server with which you can interact with the softwar. The default port has been set to 3000, so refer to "localhost:3000" for all front and backend requests. 

(5) Although a few of the frontend routes are working, the entirety of the routes proved to diffiult for me to impliment given the time frame and my limited knowledge. To query these routes , download Postman (https://www.getpostman.com/) where you may perform HTTP requests to the server and see the effort put into developping the back end. Upon installing, enter the requested URL in the search bar, and select the HTTP verb corresponding with your request. Additionally, the application has been configured to parse form data, so to simulate a POST request, simply select post, and insert the form data by selecting "body", filling the "key" colomn with the key and "value" column with your tested value. To test authentication, follow the instructions highlighted in the routes.js and organization.js controller. Testing authentication with Postman requires altering the headers to accept a JWT. To do this, click "Headers" and in the key column, enter "Authorization" and in the value column enter "Bearer" + your JWT returned upon logging in/creating
an accont. For example, "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMmMwMDNlYWM2MzczNGM3MTZjZTY4OCIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwibmFtZSI6IkFkbWluIiwiaWF0IjoxNTEyODY4Mzg2LCJleHAiOjE1MTI4NzU1ODZ9.7b9FKVFxeDO2K-j5fEkh_X2qLt-BwluclNzKi30lQNs".

Sending POST requst requires going back to headers and add the "Content-Type" key's value to "application/x-www-form-urlencoded". Afterwards, select "Body" and insert as keys the relevant form name and as value, that form's value. For email, for example, one would put "email" in the Key column and "test@cs50.com" in the value column. The requirements for each form may be found in the register function within the controller for that action. To find what is necessary for User registration, navigate to app/controllers/user.js and find exports.register. 

To view the data within the database, download Robomongo (https://robomongo.org/) and connect to localhost:27017. From there, select engage as the database, and you should have access to the schemas after clicking "collections". 

