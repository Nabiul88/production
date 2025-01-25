const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000; // Use Render's dynamic port or fallback to 5000

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pfwphbc.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server
        await client.connect();

        const menuCollection = client.db('NYB_Restaurant').collection('menu');
        const ordersCollection = client.db('NYB_Restaurant').collection('orders');

        // Routes
        app.get('/menu', async (req, res) => {
            const result = await menuCollection.find().toArray();
            res.send(result);
        });

        app.get('/orders', async (req, res) => {
            const result = await ordersCollection.find().toArray();
            res.send(result);
        });

        app.post('/orders', async (req, res) => {
            const item = req.body;
            const result = await ordersCollection.insertOne(item);
            res.send(result);
        });

        app.patch('/orders/:orderId', async (req, res) => {
            try {
                const orderId = req.params.orderId;
                const newStatus = req.body.status;
                const objectId = new ObjectId(orderId);

                const updatedOrder = await ordersCollection.findOneAndUpdate(
                    { _id: objectId },
                    { $set: { status: newStatus } },
                    { returnDocument: 'after' }
                );

                if (!updatedOrder.value) {
                    return res.status(404).json({ success: false, message: "Order not found" });
                }

                res.status(200).json({ success: true, message: "Order status updated", data: updatedOrder.value });
            } catch (error) {
                res.status(500).json({ success: false, message: error.message });
            }
        });

        app.delete('/menu/:id', async (req, res) => {
            const id = req.params.id;
            const result = await menuCollection.deleteOne({ _id: new ObjectId(id) });
            res.send(result);
        });

        app.post('/addMenuItem', async (req, res) => {
            const newItem = req.body;
            const result = await menuCollection.insertOne(newItem);
            res.send(result);
        });

        // Ensure successful connection to MongoDB
        await client.db('admin').command({ ping: 1 });
        console.log('Connected to MongoDB!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

run().catch(console.dir);

// Base route
app.get('/', (req, res) => {
    res.send('NYB Restaurant server is running...');
});

// Listen on the dynamically assigned port or default to 5000
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
