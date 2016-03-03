var wrapWith = require('../index.js')
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