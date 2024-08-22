const mongoose = require('mongoose');

const cbcEventSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state_id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    strength: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
        required: true
    },
    festivals_name: {
        type: String,
        required: true
    },
    festivals_type: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    states: {
        type: String,
        required: true
    },
    footfall: {
        type: String,
        required: true
    },
    favourite: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    }
}, {collection: 'cbc_events_info'});

module.exports = mongoose.model('CbcEvent', cbcEventSchema);
