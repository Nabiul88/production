const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  'http://localhost:5173',        // Local development
  'http://192.168.0.179:5173',    // Bluestacks IP
  'http://<your-tablet-ip>:5173', // Tablet IP (if needed)
];

const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));  // CORS configuration
app.use(express.json());     // Body parser middleware

// MongoDB connection string
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pfwphbc.mongodb.net/?retryWrites=true&w=majority`;

// MongoDB client setup
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB
async function run() {
  try {
    await client.connect();

    const menuCollection = client.db('NYB_Restaurant').collection('menu');
    const ordersCollection = client.db('NYB_Restaurant').collection('orders');

    // Get menu items
    app.get('/menu', async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });

    // Get all orders
    app.get('/orders', async (req, res) => {
      const result = await ordersCollection.find().toArray();
      res.send(result);
    });

    // Add new order
    app.post('/orders', async (req, res) => {
      const item = req.body;
      const result = await ordersCollection.insertOne(item);
      res.send(result);
    });

    // Update order status
    app.patch("/orders/:orderId", async (req, res) => {
      const orderId = req.params.orderId;
      const newStatus = req.body.status;
      const objectId = new ObjectId(orderId);
      const updatedOrder = await ordersCollection.findOneAndUpdate(
        { _id: objectId },
        { $set: { status: newStatus } },
        { new: true }
      );
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(updatedOrder);
    });

    // Update menu item availability
    app.patch("/items/:itemId", async (req, res) => {
      const itemId = req.params.itemId;
      const newAvailability = req.body.isAvailable;
      const objectId = new ObjectId(itemId);
      const updatedMenu = await menuCollection.findOneAndUpdate(
        { _id: objectId },
        { $set: { isAvailable: newAvailability } },
        { new: true }
      );
      if (!updatedMenu) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json(updatedMenu);
    });

    // Delete menu item
    app.delete('/menu/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await menuCollection.deleteOne(query);
      res.send(result);
    });

    // Add new menu item
    app.post('/addMenuItem', async (req, res) => {
      const newItem = req.body;
      const createdItem = await menuCollection.insertOne(newItem);
      res.send(createdItem);
    });

    // Test MongoDB connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.error);

// Root route
app.get('/', (req, res) => {
  res.send('NYB Restaurant server is running...');
});

// Start the backend server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});
