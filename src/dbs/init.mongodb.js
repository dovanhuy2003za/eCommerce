const mongoose = require('mongoose');
const { db: { host, name, port } } = require('../configs/config.mongodb');
const connectString = `mongodb://${host}:${port}/${name}`;
const { countConnect } = require('../helpers/check.connect');

class Database {
    constructor() {
        return this.connect();
    }

    connect() {
        mongoose.set('debug', true);
        mongoose.set('debug', { color: true });

        mongoose.connect(connectString, {
            maxPoolSize: 15,
        }).then(() => {
            console.log('Connected MongoDB Success', countConnect());
        }).catch(err => {
            console.error('Error connecting to MongoDB:', err);
        });
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;