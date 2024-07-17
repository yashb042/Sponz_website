const { MongoClient } = require('mongodb');

async function getSchema() {
    const url = 'mongodb://localhost:27017';
    const dbName = 'events_info';
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection('events_info');

        const cursor = collection.find();
        const fieldInfo = {};

        await cursor.forEach(document => {
            for (const key in document) {
                if (!fieldInfo[key]) {
                    fieldInfo[key] = {};
                }
                const type = typeof document[key];
                fieldInfo[key][type] = (fieldInfo[key][type] || 0) + 1;
            }
        });

        const fieldsToKeep = Object.keys(fieldInfo).filter(key => {
            const totalCount = Object.values(fieldInfo[key]).reduce((acc, val) => acc + val, 0);
            return totalCount > 10;
        });

        fieldsToKeep.forEach(field => {
            console.log(`${field}: {
    type: String,
  },`);
        });

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

getSchema();
