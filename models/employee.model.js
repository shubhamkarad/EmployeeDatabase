const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Employee = new Schema({
    empId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    salary: { type: Number, required: true }
}, {
    timestamps: true
})

module.exports = mongoose.model('Employees', Employee);