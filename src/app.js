var wordSmith = require('../index.js');

var article = document.getElementById('rich_with_insert_html');
var container = article.parentNode;
var medium = new Medium({
  element: article,
  mode: Medium.richMode,
  placeholder: 'Your Article',
  attributes: null,
  tags: null
});

function insertElement() {
  medium.focus();
  medium.insertHtml(
    wordSmith.wrapWith('span', 'hello', 'helloClass')

            // '<span style="background-color: yellow;">\
            // Happy day!\
            // </span>&nbsp;'
          // '<span class="suggestions"><span class="suggestion">anarchical</span><span class="suggestion">lawless</span></span>' + '&nbsp'
          );

  return false;
}

function spacePressed() {
  console.log(wordSmith.synonymiseLastWord(article.textContent))
  getWordPrecedingCaret(article);
  insertElement();
}

function getWordPrecedingCaret(containerEl) {
  var precedingWord = "";
  var sel;
  var range;
  var precedingRange;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount > 0) {
      range = sel.getRangeAt(0).cloneRange();
      range.collapse(false);
      // sel.collapse(containerEl.firstChild, 0)
      range.setStart(containerEl, 0);
      // TODO: see if regex get the whole word (and maybe greater than 3 chars in length) think this can be make more efficient
      precedingWord = range.toString().split(" ").pop().replace(/[.,!?:;'"-%]+/g,''); //gets word before caret and removes punctuation
    }
  } else if ( (sel = document.selection) && sel.type != "Control") {
    range = sel.createRange();
    precedingRange = range.duplicate();
    precedingRange.moveToElementText(containerEl);
    precedingRange.setEndPoint("EndToStart", range);
    precedingWord = precedingRange.text.slice(-1);
  }
  console.log(precedingWord)
  return precedingWord;
}

getWordPrecedingCaret(article);

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