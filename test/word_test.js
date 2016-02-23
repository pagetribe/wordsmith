var expect = require('chai').expect
var wordsmith = require('../index.js')

describe('wordsmith', function() {
	describe('wrapWith', function(){
		it('wraps a given string with the supplied tag and class name', function(){
 			expect(wordsmith.wrapWith('span', 'hello', 'helloClass')).to.equal("<span class=\"helloClass\">hello</span>")
		})
	})

	describe('buildSuggestions', function(){
		it('builds out the suggestions', function() {
			var builtSuggestions = '<span class="suggestions"><span class="suggestion">anarchical</span><span class="suggestion">lawless</span></span>'
			var word = [{"synonyms": ["anarchical", "lawless"], "word": "anarchic", "numberOfSynonyms": 2}]
			expect(wordsmith.wrapSynonyms(word[0].synonyms)).to.equal(builtSuggestions)
		})
	})

})
