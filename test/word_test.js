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
			expect(wordsmith.buildSuggestions(word[0].synonyms)).to.equal(builtSuggestions)
		})
	})

	describe('appendSuggestionsToLastWord', function(){
		it('inserts the suggestion object into a string', function(){
			var string = 'Life was turbulent and anarchic'
			var expectedString = 'Life was turbulent and <span class="suggestions"><span class="suggestion">anarchical</span><span class="suggestion">lawless</span></span>anarchic'
			var word = [{"synonyms": ["anarchical", "lawless"], "word": "anarchic", "numberOfSynonyms": 2}]
			var suggestions = wordsmith.buildSuggestions(word[0].synonyms)
			expect(wordsmith.appendSuggestionsToLastWord(suggestions, string)).to.equal(expectedString)
		})
	})

  describe('wrapWord', function(){
    it('wraps the whole word in span class word', function(){
      var string = 'Life was turbulent and <span class="suggestions"><span class="suggestion">anarchical</span><span class="suggestion">lawless</span></span>anarchic'
      var st = 'Life was turbulent and <span class="suggestions"><span class="suggestion">anarchical</span><span class="suggestion">lawless</span></span><span class="word">anarchic</span>'
      expect(wordsmith.wrapWord('anarchic', string)).to.equal(st)
    })
  })

  describe('synonymiseLastWord', function(){
    it('wraps the last word in word class and inserts suggestion span before word', function(){
      var str = 'Life was turbulent and anarchic'
      var st = 'Life was turbulent and <span class="suggestions"><span class="suggestion">anarchical</span><span class="suggestion">lawless</span></span><span class="word">anarchic</span>'
      expect(wordsmith.synonymiseLastWord(str)).to.equal(st)
    })
  })

  describe('findSynonyms', function() {
    it('returns the synonyms for a give word', function(){
      expect(wordsmith.findSynonyms('anarchic')).to.eql(["anarchical", "lawless"])
    })
  })
})
