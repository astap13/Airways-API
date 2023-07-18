import { client } from "./dbconnect.js";

export const getPlain = (req, res) => {
    client.connect((err) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        const collection = client.db('test').collection('plain');
        collection.find().toArray((err, result) => {
            if (err) res.status(500).send(err);
            if(result) res.json(result);
            client.close();
        })
    })
}

export const addPlain = (req, res) => {
    client.connect((err) => {
        if(err) {
            res.status(500).send(err);
            return;
        }
        const car = req.body;
        const collection = client.db('test').collection('plain');
        collection.insertOne(car, (err, result) => {
            if(err) res.status(500).send(err);
            if(result) res.json(result);
            client.close();
        });
    });
    
};