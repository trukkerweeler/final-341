require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

let _db;

const initDb = (callback) => {
    if (_db) {
        console.log('db is initialized');
        return callback(null, _db);
    }

    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDb = () => {
    if (!_db) {
        throw Error('db not initialized')
    }
    return _db;
};

module.exports = {
    initDb,
    getDb,
}