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

function wrapSynonyms(synonyms) {
  return wrapWith('span', wrapEachSynonymWithSuggestionSpan(synonyms), 'suggestions')
}

function wrapEachSynonymWithSuggestionSpan(synonyms) {
  return synonyms.map(wrapWithSugestionSpan).join('')
}

function wrapWithSugestionSpan(synonym){
  return wrapWith('span', synonym, 'suggestion')
}


module.exports = {
  wrapWith     : wrapWith,
  wrapSynonyms : wrapSynonyms
}

// function wrapWith(tag, str, className) {
//   return '<' + tag + ' class=' + '"' + className + '"' + '>' + str + '</' + tag + '>';
// }