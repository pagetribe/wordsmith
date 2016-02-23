// var mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/wordsmith')
// var db = mongoose.connection

// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', function(callback){
// 	console.log('db connection succeeded')
// })

function wrapWith (tag, str, className) {
	return '<' + tag + ' class=' + '"' + className + '"' + '>' + str + '</' + tag + '>'
}

function buildSuggestions(record) {
  var synWithSpan = '';
  record.synonyms.forEach(function(synonym){
    synWithSpan += wrapWith('span', synonym, 'suggestion');  
  }); 
  return wrapWith('span', synWithSpan, 'suggestions');
}


module.exports = {
	wrapWith: wrapWith,
	buildSuggestions: buildSuggestions
}

// function wrapWith(tag, str, className) {
//   return '<' + tag + ' class=' + '"' + className + '"' + '>' + str + '</' + tag + '>'; 
// }