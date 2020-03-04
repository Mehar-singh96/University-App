const SERVER_PORT = 8140; //Using the assigned port
var express = require('express');
var fs = require('fs');
const FILE_NAME = "log.txt";


		var allowCrossDomain = function (req, res, next) {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
			res.header('Access-Control-Allow-Headers','Content-Type');
			next();
};


//set up the server variables
		var app = express();
		app.use(express.bodyParser());
		app.use(allowCrossDomain);
		app.use('/scripts', express.static(__dirname + '/scripts'));
		app.use('/css', express.static(__dirname + '/css'));
		app.use(express.static(__dirname));



		var mongodb = require('mongodb');
		var user = 'm_singh';
		var password = 'A00434701';
		var database = 'm_singh';

		var host = '127.0.0.1';
		var port = '27017'; // Default MongoDB port


		var connectionString = 'mongodb://' + user + ':' + password + '@' +
				host + ':' + port + '/' + database;

console.log(connectionString);



		var universities;
		const NAME_OF_COLLECTION = 'universities';


mongodb.connect(connectionString, function (error, db) {

    if (error) {
        throw error;
    }//end if

    universities = db.collection(NAME_OF_COLLECTION);

    process.on('SIGTERM', function () {
        console.log("Shutting server down.");
        db.close();
        app.close();
    });

    var server = app.listen(SERVER_PORT, function () {
        console.log('Listening on port %d',
                server.address().port);
    });
});

app.post('/save_university', function (request, response) {
var name = request.body.Name;
var address = request.body.Address;
var phone = request.body.Phone;

universities.insert(request.body, function (err, log) {
if (err) {
return response.send(400,'An error occurred saving a record.');
}
return response.send(200, "Record saved successfully.");
});

fs.writeFile("~/public_html/Project2" + FILE_NAME, name + "\n", function (err) {
if (err) {
return console.log(err);
}
console.log('Record inserted is :');
console.log('Name: ' + name + " , Address: " + address + " , Phone: " + phone);
console.log("The file was saved!");

});
});


app.post('/get_university', function (request, response) {
console.log(request.body);

var key = request.body;
console.log(key);
universities.find(key, function (err, log) {
if (err) {
return response.send(400, 'An error occurred retreving records.');
}//end if
console.log(log);
log.toArray(
function (error, logArray) {
 if (error) {
 return response.send(400, 'An error occurred processing your records.');
}
console.log(logArray);
return response.send(200, logArray[0]);
});
 });
});


app.post('/delete_university', function (request, response) {
console.log(request.body);

var key = request.body;
console.log(key);
universities.remove(key, function (err, log) {
if (err) {
return response.send(400, 'An error occurred retreving records.');
}//end if
var obj = JSON.parse(log);
console.log(obj.n + " records"); 
return response.send(200, log);

 });
});


app.post('/get_all_universities', function (request, response) {

		universities.find(function (err, log) {
		if (err) {
		return response.send(400, 'An error occurred retreving records.');
		}
		console.log(log);
		log.toArray(
		function (error, logArray) {
		 if (error) {
		 return response.send(400, 'An error occurred processing your records.');
		}
		console.log(logArray);
		return response.send(200, logArray);
		});
		});
});


