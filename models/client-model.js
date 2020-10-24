const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const clientSchema = new Schema({
	name: { type: Array, required: true},
	number: { type: Array, required: true},
	city: { type: Array, required: true},
	max: { type: String, required: true },
	min: { type: String, required: true },
	avg: { type: String, required: true },
	condition: { type: String, required: true }
}, {
	timestamps: true
});

const Client = mongoose.model('Client', clientSchema)

module.exports = Client;