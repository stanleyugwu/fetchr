const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
    searchTerm: String,
    timestamp: Number
});

historySchema.index({timestamp: 1});

const searchHistoryModel = mongoose.model('searchHistory', historySchema)

module.exports = searchHistoryModel;