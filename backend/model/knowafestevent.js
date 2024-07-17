const mongoose = require("mongoose");

const knowafestSchema = new mongoose.Schema({
    "_id": {
        "type": "ObjectId"
    },
    "Event Type": {
        "type": [
            "String"
        ]
    },
    "Organizer": {
        "type": "String"
    },
    "Event_Name": {
        "type": "String"
    },
    "End Date": {
        "type": "String"
    },
    "College_Name": {
        "type": "String"
    },
    "Event_URL": {
        "type": "String"
    },
    "updated_at": {
        "type": "Date"
    },
    "How_to_reach": {
        "type": "String"
    },
    "Category": {
        "type": [
            "String"
        ]
    },
    "Event_Image": {
        "type": "String"
    },
    "Event Caption": {
        "type": "String"
    },
    "Departments:": {
        "type": [
            "String"
        ]
    },
    "About Event": {
        "type": "String"
    },
    "Start Date": {
        "type": "String"
    },
    "Events": {
        "type": "String"
    },
    "Featured Events": {
        "type": "String"
    },
    "Location": {
        "type": [
            "String"
        ]
    },
    "Related Links:": {
        "type": [
            "String"
        ]
    },
    "Event_Organizer_Link": {
        "type": "String"
    },
    "Website_Link": {
        "type": "String"
    },
    "Facebook_Link": {
        "type": "String"
    }
}, {collection: 'events_info'});

module.exports = mongoose.model("KnowAFest", knowafestSchema);
