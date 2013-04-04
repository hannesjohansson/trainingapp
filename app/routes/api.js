/*
 * Serve JSON to our AngularJS client
 */


 var mongo = require('mongodb');

 /* Initialize mongoDB */ 
 var Server = mongo.Server,
 Db = mongo.Db,
 BSON = mongo.BSONPure;

 var server = new Server('localhost', 27017, {auto_reconnect: true});
 db = new Db('userdb', server);

 db.open(function(err, db) {
 	if(!err) {
 		console.log("Connected to 'userdb' database");
        	populateDB(); 
        	// Already populated.
        }
    });


 /* CRUD-methods */
 exports.findAll = function(req, res){
 	db.collection('users', function(err, collection) {
 		collection.find().toArray(function(err, items) {
 			res.json({
 				users: items
 			})
 		});
 	});
 };

 exports.findOne = function(req, res){
 	var id = req.params.id;
 	console.log('Retrieving user: ' + id);
 	db.collection('users', function(err, collection) {
 		collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
 			res.json({
 				user: item 
 			});
 		});
 	});
 };

 exports.create = function(req, res){
 	var user = req.body;
 	db.collection('users', function(err, collection) {
 		collection.insert(user, {safe:true}, function(err, result) {
 			if (err) {
 				res.send({'error':'An error has occurred'});
 			} else {
 				console.log('Success: ' + JSON.stringify(result[0]));
 				res.send(result[0]);
 			}
 		});
 	});
 };

 exports.update = function(req, res){
 	var id = req.params.id;
 	var user = req.body;
 	console.log(user)
 	console.log('Updating user: ' + id);
 	db.collection('users', function(err, collection) {
 		collection.update({'_id':new BSON.ObjectID(id)}, user, {safe:true}, function(err, result) {
 			if (err) {
 				console.log('Error updating user: ' + err);
 				res.send({'error':'An error has occurred'});
 			} else {
 				console.log('' + result + ' document(s) updated');
 				res.send(user);
 			}
 		});
 	});
 };

 exports.destroy = function(req, res){
 	var id = req.params.id;
 	console.log('Deleting user: ' + id);
 	db.collection('users', function(err, collection) {
 		collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
 			if (err) {
 				res.send({'error':'An error has occurred - ' + err});
 			} else {
 				console.log('' + result + ' document(s) deleted');
 				res.send(req.body);
 			}
 		});
 	});
 };


 /*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

	var users = [
	{
		name: "Hannes Johansson",
		year: "1987",
		country: "France",
		region: "Southern Rhone",
		description: "The aromas of fruit and spice..."
	},
	{
		name: "Sammi Haj Hassine",
		year: "1987",
		country: "Italy",
		region: "Rioja",
		description: "A resurgence of interest in boutique vineyards..."
	}];

	db.collection('users', function(err, collection) {
		collection.insert(users, {safe:true}, function(err, result) {});
	});
};

