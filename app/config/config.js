/*
CONFIG FILE: Responsible for keeping all of our configuration variables that would be better kept away from the actual source code. 
*/
module.exports = {
	mongoose_uri: 'mongodb://localhost:27017/engage',  // Tells Mongoose where to connect, if db doesn't exist, one is created.
  	port: process.env.PORT || 3000, // Sets the defualt port to 3000 if there exists no port (in the event of hosting)
  	secret: "HARVARDSUCKS" // Our JWT secret used to sign each JWT that comes from our server
};