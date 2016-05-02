/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var wordSmith = __webpack_require__(1);

	var article = document.getElementById('rich_with_insert_html');
	var container = article.parentNode;
	var medium = new Medium({
	  element: article,
	  mode: Medium.richMode,
	  placeholder: 'Your Article',
	  attributes: null,
	  tags: null
	});

	function removeLastWord() {
	  var sel = window.getSelection();
	  var range;
	  if (sel.rangeCount > 0) {
	      range = sel.getRangeAt(0).cloneRange();
	      range.collapse(true);
	      range.setStart(sel.anchorNode, 0);
	  }
	  var words = range.toString().trim().split(' ');
	  var lastWord = words[words.length - 1];
	  /* Find word start and end */
	  var wordStart = range.toString().lastIndexOf(lastWord);
	  var wordEnd = wordStart + lastWord.length + 1; // + 1 added to remove a space before the word (buggy)
	  console.log("pos: (" + wordStart + ", " + wordEnd + ")");

	  range.setStart(sel.anchorNode, wordStart);
	  range.setEnd(sel.anchorNode, wordEnd);
	  range.deleteContents();
	}

	function insertElement(elem) {
	  medium.focus();
	  medium.insertHtml(
	    elem
	    // wordSmith.wrapWith('span', 'hello', 'helloClass')

	            // '<span style="background-color: yellow;">\
	            // Happy day!\
	            // </span>&nbsp;'
	          // '<span class="suggestions"><span class="suggestion">anarchical</span><span class="suggestion">lawless</span></span>' + '&nbsp'
	          );

	  return false;
	}

	function spacePressed() {
	  var str = article.textContent
	  var lastWord = str.match(/(\S+)\s*$/)[1].replace(/[.,!?:;'"-%]+/g,'') //needed for lookup only
	  // var lastWordRemoved = str.substring(0, str.lastIndexOf(" "))

	  var foundSynonyms = wordSmith.findSynonyms(lastWord)
	  if(foundSynonyms) {
	    var suggestions = wordSmith.synonymiseLastWord(lastWord)
	    removeLastWord();
	    console.log(wordSmith.synonymiseLastWord(lastWord))
	    insertElement(suggestions + '&nbsp')
	  }
	}

	// function getWordPrecedingCaret(containerEl) {
	//   var precedingWord = "";
	//   var sel;
	//   var range;
	//   var precedingRange;
	//   if (window.getSelection) {
	//     sel = window.getSelection();
	//     if (sel.rangeCount > 0) {
	//       range = sel.getRangeAt(0).cloneRange();
	//       range.collapse(false);
	//       // sel.collapse(containerEl.firstChild, 0)
	//       range.setStart(containerEl, 0);
	//       // TODO: see if regex get the whole word (and maybe greater than 3 chars in length) think this can be make more efficient
	//       precedingWord = range.toString().split(" ").pop().replace(/[.,!?:;'"-%]+/g,''); //gets word before caret and removes punctuation
	//     }
	//   } else if ( (sel = document.selection) && sel.type != "Control") {
	//     range = sel.createRange();
	//     precedingRange = range.duplicate();
	//     precedingRange.moveToElementText(containerEl);
	//     precedingRange.setEndPoint("EndToStart", range);
	//     precedingWord = precedingRange.text.slice(-1);
	//   }
	//   console.log(precedingWord)
	//   return precedingWord;
	// }

	// getWordPrecedingCaret(article);

	article.onkeyup = function(e) {
	  if(e.keyCode == 32) {
	    spacePressed();
	  }
	}



	// var wrapWith = require('../index.js')
	// window.wrapWith = wrapWith
	// require('rangy')
	// require('undo.js')
	// var Medium = require('medium.js')
	// window.onload = function() {
	//   // (function() {

	//       var article = document.getElementById('rich_with_insert_html_object')
	//       var medium = new Medium({
	//         element: article,
	//         mode: Medium.richMode,
	//         placeholder: 'Your Article',
	//         tags: null,
	//         attributes: null
	//       })

	//       //example of how to insert into contenteditible
	//       var container = article.parentNode

	//       container.querySelector('.li').onmousedown = function() {
	//         var ul = document.createElement('ul')
	//         var li = document.createElement('li')

	//         ul.style.border = 'dashed 5px #F92672';
	//         ul.className = 'ul-special';
	//         ul.appendChild(li);

	//         li.innerHTML = 'I came from an Object!';
	//         li.style.color = '#57ad68';
	//         li.className = 'li-special';

	//         medium.focus();
	//         medium.insertHtml(ul);

	//         return false;
	//       };
	//     // })();
	// }

/***/ },
/* 1 */
/***/ function(module, exports) {

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

	function wrapMainWordWithWordClassSpan(word, str) {
	  var regex = new RegExp('\\b' + word + '\\b') //whole word
	  return str.replace(regex, wrapWith('span', word, 'word'))
	}

	function synonymiseLastWord(str) {
	  var lastWord = str.match(/(\S+)\s*$/)[0].replace(/[.,!?:;'"-%]+/g,'').trim() //needed for lookup only
	  var foundSynonyms = findSynonyms(lastWord)
	  if(foundSynonyms) {
	    var suggestions = buildSuggestions(foundSynonyms)
	    var withSuggestions = appendSuggestionsToLastWord(suggestions, str)
	    return wrapMainWordWithWordClassSpan(lastWord, withSuggestions)
	  }
	}

	function findSynonyms(word) {
	  // TODO: get real list of synonyms
	  var synonyms = [
	    {"synonyms": ["anarchical", "lawless"], "word": "anarchic", "numberOfSynonyms": 2},
	    {"synonyms": ["large", "huge"], "word": "big", "numberOfSynonyms": 2}
	  ]
	  var foundSynonyms = synonyms.filter(function(synonym) { return synonym.word == word })[0]
	  if (foundSynonyms) {
	    return foundSynonyms.synonyms
	  }
	}

	module.exports = {
	  wrapWith     : wrapWith,
	  buildSuggestions : buildSuggestions,
	  appendSuggestionsToLastWord: appendSuggestionsToLastWord,
	  wrapMainWordWithWordClassSpan: wrapMainWordWithWordClassSpan,
	  synonymiseLastWord : synonymiseLastWord,
	  findSynonyms : findSynonyms

	}

/***/ }
/******/ ]);