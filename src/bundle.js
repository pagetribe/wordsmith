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

	var wrapWith = __webpack_require__(1)
	window.wrapWith = wrapWith
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

/***/ }
/******/ ]);