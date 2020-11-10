const mysqlx = require('@mysql/xdevapi');
const fs = require('fs');

const csv = require('csvtojson');
const { mysqlConfig, dbName, tableName } = require('../dbConfig');

exports.getRecipients = async (req, res) => {
    var recipients = [];
    mysqlx.getSession(mysqlConfig)
        .then(function (session) {
            var db = session.getSchema(dbName);
            var recipientTable = db.getTable(tableName);
            return recipientTable
                .select('firstname', 'lastname', 'country', 'email')
                .execute()
        })
        .then(function (myResult) {
            const allRows = myResult.fetchAll();
            res.status(200).json(makeJson(allRows));
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json()
        })
}

exports.postRecipients = async (req, res) => {
    const recipient = req.body.recipient;
    mysqlx.getSession(mysqlConfig)
        .then(function (session) {
            var db = session.getSchema(dbName);
            var recipientTable = db.getTable(tableName);
            return recipientTable
                .insert(['firstname', 'lastname', 'country', 'email'])
                .values([recipient.firstName, recipient.lastName, recipient.country, recipient.email])
                .execute()
        })
        .then(function (myResult) {
            res.status(200).json()
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json()
        });
}

exports.uploadRecipientsFromFile = async (req, res) => {
    const myFile = req.files.file.data.toString('utf8');
    csv()
        .fromString(myFile)
        .then(async (json) => {
            await uploadRecipients(json);
        }).then(myResult => {
            res.status(200).json();
        }).catch((err) => {
            res.status(500).json();
        })
}

exports.deleteController = async (req, res) => {
    const recipients = req.body;
    var recipientTable;
    mysqlx.getSession(mysqlConfig)
        .then(function (session) {
            var db = session.getSchema(dbName);
            recipientTable = db.getTable(tableName);
            return (recipients.map(recipient => recipientTable
                .delete()
                .where(`email = "${recipient.email}"`)
                .execute()));
        }).then((result) => recipientTable.select('firstname', 'lastname', 'country', 'email')
            .execute()).then((result) => {
                const allRows = result.fetchAll();
                res.status(200).json(makeJson(allRows));
            })
        .catch(function (err) {
            console.log("*****************", err);
            res.status(500).json();
        });
}


function makeJson(result) {
    const recipients = [];
    result.forEach((row) => recipients.push({
        'firstName': row[0],
        'lastName': row[1],
        'country': row[2],
        'email': row[3],
    }));
    return recipients;
}

function uploadRecipients(recipients) {
    return new Promise((resolve, reject) => {
        mysqlx.getSession(mysqlConfig)
            .then(function (session) {
                var db = session.getSchema(dbName);
                var recipientTable = db.getTable(tableName);
                resolve(recipients.map(recipient => recipientTable
                    .insert(['firstname', 'lastname', 'country', 'email'])
                    .values([recipient.first_name, recipient.last_name, recipient.country, recipient.email])
                    .execute()));
            })
            .catch(function (err) {
                console.log("*****************", err);
                reject(err);
            });
    });
}
