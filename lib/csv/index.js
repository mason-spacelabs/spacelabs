var csvjson = require('csvjson');
var fs = require('fs');
var path = require('path');

var data = fs.readFileSync(path.join(__dirname, 'data_elements.csv'), { encoding : 'utf8'});

var data_elements = csvjson.toObject(data); 
var data_objects = JSON.parse(data_elements);
for(var data_object in data_objects){
 console.log(data_object);
}