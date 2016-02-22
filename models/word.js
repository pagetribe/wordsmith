var mongoose = require('mongoose');
var schema = mongoose.Schema;

var WordSchema = new Schema({
	word: {
		type: String
	},
	numberOfSynonyms: {
		type: Number
	},
	synonyms: [
		{
			type: String
		}
	]
});

module.exports = mongoose.model('Word', WordSchema)
