const express = require("express");
const app = express();
const MongoClient = require('mongodb').MongoClient;

let db;
//define variable for mongo db database
MongoClient.connect('mongodb+srv://MongoUser:Dg3w3l9mmpYB5jY3@clusterapp.frsqz.mongodb.net/<dbname>?retryWrites=true&w=majority', (err, client) => {
    db = client.db('MongoDatabase');
});

app.use(express.json());

app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName);
    return next();
});

app.get('/', (req, res, next) => {
    res.send('Select a collection, e.g., /collection/:collectionName');
});

app.get('/collection/:collectionName', (req, res, next) => {
    req.collection.find({}).toArray((e, results) => {
    if (e) return next(e)
    res.send(results)
    });
});
//e stands for error
//find results and to array actual gets those results

app.post('/collection/:collectionName', (req, res, next) => {
    req.collection.insert(req.body, (e, results) => {
    if (e) return next(e)
    res.send(results.ops)
    });
});
//insert results into body

const ObjectID = require('mongodb').ObjectID;
app.get('/collection/:collectionName/:id', (req, res, next) => {
    req.collection.findOne({ _id: new ObjectID(req.params.id) }, (e, result) => {
    if (e) return next(e)
    res.send(result)
    });
});
//find id

app.put('/collection/:collectionName/:id', (req, res, next) => {
    req.collection.update(
        {_id: new ObjectID(req.params.id)},
        {$set: req.body},
        {safe: true, multi: false},
        //above means wait for the execution before running callback function
        //multiple means only process first one
        (e, result) => {
            if (e) return next(e)
            res.send((result.result.n === 1) ? {msg: 'success'} : {msg: 'error'})
        //if then else above
        });
});
//update 1 piece of document

app.delete('/collection/:collectionName/:id', (req, res, next) => {
    req.collection.deleteOne(
    {_id: ObjectID(req.params.id)},
    (e, result) => {
        if (e) return next(e)
        res.send((result.result.n === 1) ? {msg: 'success'} : {msg: 'error'})
    });
});
//delete document with this id value
//same as put which adds except delete
//delete whole thing

app.listen(3000, function() {
    console.log("Express server on port 3000");
});