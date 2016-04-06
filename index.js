// var mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/wordsmith')
// var db = mongoose.connection

// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', function(callback){
// 	console.log('db connection succeeded')
// })

function wrapWith (tag, text, className) {
	return '<' + tag + ' class=' + '"' + className + '"' + '>' + text + '</' + tag + '>'
}

function buildSuggestions(synonyms) {
  return wrapWith('span', wrapEachSynonymWithSuggestionSpan(synonyms), 'suggestions')
}

function wrapEachSynonymWithSuggestionSpan(synonyms) {
  return synonyms.map(wrapWithSugestionSpan).join('')
}

function wrapWithSugestionSpan(synonym){
  return wrapWith('span', synonym, 'suggestion')
}

function appendSuggestionsToLastWord(suggestions, str) {
	return str.replace(/(\S+)\s*$/, suggestions + '$1')
}

function wrapWord(word, str) {
  var regex = new RegExp('\\b' + word + '\\b') //whole word
  return str.replace(regex, wrapWith('span', word, 'word'))
}

function synonymiseLastWord(str) {
  var lastWord = str.match(/(\S+)\s*$/)[0] //needed for lookup only
  var suggestions = buildSuggestions(findSynonyms(lastWord))
  var withSuggestions = appendSuggestionsToLastWord(suggestions, str)
  return wrapWord(lastWord, withSuggestions)
}

function findSynonyms(word) {
  // TODO: get real list of synonyms
  synonyms = [
    {"synonyms": ["anarchical", "lawless"], "word": "anarchic", "numberOfSynonyms": 2},
    {"synonyms": ["large", "huge"], "word": "big", "numberOfSynonyms": 2}
  ]
  return synonyms.filter(function(synonym) { return synonym.word == word })[0].synonyms
}

module.exports = {
  wrapWith     : wrapWith,
  buildSuggestions : buildSuggestions,
  appendSuggestionsToLastWord: appendSuggestionsToLastWord,
  wrapWord : wrapWord,
  synonymiseLastWord : synonymiseLastWord,
  findSynonyms : findSynonyms

}