var restful = require('node-restful');
var mongoose = restful.mongoose;

var resultSchema = new mongoose.Schema({
                                        searchTimes : Number,
                                       searchChanges : Number,
                                       linksViewed : Number,
                                       linksRevisited : Number,
                                       currentSearchPhrase : String,
                                       firstname : String,
                                       lastname : String,
                                       description : String,
                                       title : String,
                                       link : String,
                                       urlsVisited : [],
                                       searchterms : []
});

module.exports = restful.model('Results',resultSchema)