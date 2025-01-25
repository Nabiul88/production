const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pfwphbc.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectToDB() {
    try {
        // Connect the client to the server
        await client.connect();
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

async function run() {
    try {
        await connectToDB();

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
                    { returnOriginal: false } // Return the updated document
                );

                if (!updatedOrder.value) {
                    return res.status(404).json({ success: false, message: "Order not found" });
                }

                res.status(200).json({ success: true, message: "Order status updated successfully", data: updatedOrder.value });
            } catch (error) {
                console.error("Error updating order status:", error.message);
                res.status(500).json({ success: false, message: "Internal server error", error: error.message });
            }
        });

        app.patch('/items/:itemId', async (req, res) => {
            try {
                const itemId = req.params.itemId;
                const newAvailability = req.body.isAvailable;

                const objectId = new ObjectId(itemId);
                const updatedMenu = await menuCollection.findOneAndUpdate(
                    { _id: objectId },
                    { $set: { isAvailable: newAvailability } },
                    { returnOriginal: false }
                );

                if (!updatedMenu.value) {
                    return res.status(404).json({ success: false, message: "Item not found" });
                }

                res.status(200).json({ success: true, message: "Item status updated successfully", data: updatedMenu.value });
            } catch (error) {
                console.error("Error updating item status:", error.message);
                res.status(500).json({ success: false, message: "Internal server error", error: error.message });
            }
        });

        app.delete('/menu/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await menuCollection.deleteOne(query);
            res.send(result);
        });

        app.post('/addMenuItem', async (req, res) => {
            const newItem = req.body;
            const createdItem = await menuCollection.insertOne(newItem);
            res.send(createdItem);
        });

        // Ping MongoDB to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. MongoDB connection verified!");
    } catch (error) {
        console.error("Error in server setup:", error);
    }
}

// Run the server setup
run().catch(console.dir);

// Root route
app.get('/', (req, res) => {
    res.send('NYB Restaurant server is running...');
});

// Start the server and bind to 0.0.0.0
app.listen(port, '0.0.0.0', () => {
    console.log(`NYB Restaurant server listening on port ${port}`);
});
