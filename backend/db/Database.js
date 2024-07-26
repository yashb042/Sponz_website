const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose
        .connect('mongodb+srv://yashbansal042:3yoRRPzyRpYrX6cq@sponz.yneqf2r.mongodb.net/events_info', {
            // .connect('mongodb://localhost:27017/events_info', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((data) => {
            console.log(`mongod connected with server: ${data.connection.host}`);
        });
};

module.exports = connectDatabase;
