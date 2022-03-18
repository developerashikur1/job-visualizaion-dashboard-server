const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


// middleware
app.use(cors());
app.use(express.json());


// database connection and management
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qrfwk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){
    try{
        await client.connect();
        const database = client.db('jobVisualization');
        const visualizationDataCollection = database.collection('visualizationData');
        

        // get visualization data
        app.get('/visualizationData', async(req, res)=>{
            const visualData = visualizationDataCollection.find();
            const result = await visualData.toArray();
            res.send(result);
            console.log(result)
        })

    }
    finally{
        // await client.close();
    }
}

run().catch(console.dir);



// running localhost server side
app.get('/', (req, res)=>{
    res.send('Running my crud server')
})

app.listen(port, ()=>{
    console.log('running server side on port')
})