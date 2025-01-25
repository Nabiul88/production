const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
// const SSLCommerzPayment = require("sslcommerz-lts");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pfwphbc.mongodb.net/?retryWrites=true&w=majority`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const menuCollection = client.db('NYB_Restaurant').collection('menu');
        const ordersCollection = client.db('NYB_Restaurant').collection('orders');


        app.get('/menu', async (req, res) => {
            const result = await menuCollection.find().toArray();
            res.send(result);
        })

        app.get('/orders', async (req, res) => {
            const result = await ordersCollection.find().toArray();
            res.send(result);
        })
        app.post('/orders', async (req, res) => {
            const item = req.body;
            const result = await ordersCollection.insertOne(item);
            res.send(result);
        })

        app.patch("/orders/:orderId", async (req, res) => {
            try {
                const orderId = req.params.orderId;
                const newStatus = req.body.status;

                const objectId = new ObjectId(orderId);
                const updatedOrder = await ordersCollection.findOneAndUpdate(
                    { _id: objectId },
                    { $set: { status: newStatus } },
                    { new: true } // Return the updated document
                );
                if (!updatedOrder) {
                    return res.status(404).json({
                        success: false,
                        message: "Order not found",
                    });
                }

                res.status(200).json({
                    success: true,
                    message: "Order status updated successfully",
                    data: updatedOrder,
                });
            } catch (error) {
                console.error("Error updating order status:", error.message);
                res.status(500).json({
                    success: false,
                    message: "Internal server error",
                    error: error.message,
                });
            }
        });
        app.patch("/items/:itemId", async (req, res) => {
            try {
                const itemId = req.params.itemId;
                const newAvailability = req.body.isAvailable;

                const objectId = new ObjectId(itemId);
                const updatedMenu = await menuCollection.findOneAndUpdate(
                    { _id: objectId },
                    { $set: { isAvailable: newAvailability } },
                    { new: true } // Return the updated document
                );
                if (!updatedMenu) {
                    return res.status(404).json({
                        success: false,
                        message: "Item not found",
                    });
                }

                res.status(200).json({
                    success: true,
                    message: "Item status updated successfully",
                    data: updatedOrder,
                });
            } catch (error) {
                console.error("Error updating item status:", error.message);
                res.status(500).json({
                    success: false,
                    message: "Internal server error",
                    error: error.message,
                });
            }
        });

        app.delete('/menu/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            console.log(query);
            const result = await menuCollection.deleteOne(query);
            res.send(result);
        });

        app.post('/addMenuItem', async (req, res) => {

            const newItem = req.body;
            const createdItem = await menuCollection.insertOne(newItem);

            res.send(createdItem);

        });


        // app.post("/orders", async (req, res) => {
        //     const store_id = process.env.STORE_ID;
        //     const store_password = process.env.STORE_PASSWORD;
        //     const is_live = false;
        //     const tranId = new ObjectId().toString();
        //     const orderData = req.body;

        //     const data = {
        //         total_amount: orderData.totalPrice,
        //         currency: "BDT",
        //         tran_id: tranId, // use unique tran_id for each api call
        //         success_url: `${process.env.SERVER_URL}payment/success/${tranId}`, //this is the reason why we need cant payment successfully from live site.....
        //         fail_url: `${process.env.SERVER_URL}payment/fail/${tranId}`,
        //         cancel_url: `${process.env.SERVER_URL}cancel/${tranId}`,
        //         ipn_url: "http://localhost:3030/ipn",
        //         shipping_method: "Courier",
        //         product_name: "Computer.",
        //         product_category: "Electronic",
        //         product_profile: "general",
        //         cus_name: orderData?.customerData?.name,
        //         cus_email: orderData?.customerData?.email,
        //         cus_add1: orderData?.homeAddress?.area,
        //         cus_add2: orderData?.homeAddress?.upazila,
        //         cus_city: orderData?.homeAddress?.district,
        //         cus_state: orderData?.homeAddress?.district,
        //         cus_postcode: "1000",
        //         cus_country: "Bangladesh",
        //         cus_phone: orderData?.customerData?.phone,
        //         cus_fax: "01711111111",
        //         ship_name: "Customer Name",
        //         ship_add1: "Dhaka",
        //         ship_add2: "Dhaka",
        //         ship_city: "Dhaka",
        //         ship_state: "Dhaka",
        //         ship_postcode: 1000,
        //         ship_country: "Bangladesh",
        //     };

        //     const sslcz = new SSLCommerzPayment(store_id, store_password, is_live);
        //     sslcz.init(data).then(async (apiResponse) => {
        //         orderData.paymentStatus = false;
        //         orderData.transactionId = tranId;
        //         const insertResult = await ordersCollection.insertOne(orderData);
        //         if (insertResult.acknowledged) {
        //             let gatewayPageURL = apiResponse.GatewayPageURL;
        //             res.send({ url: gatewayPageURL });
        //         } else {
        //             res.status(500).json({ message: "Failed to insert order" });
        //         }
        //     });

        //     app.post("/cancel/:tranId", async (req, res) => {
        //         const tranId = req.params.tranId;
        //         const filter = { transactionId: tranId };
        //         const result = await ordersCollection.deleteOne(filter);
        //         if (result.deletedCount === 1) {
        //             res.redirect(`${process.env.LIVE_URL}`);
        //         }
        //     });

        //     app.post("/payment/success/:tranId", async (req, res) => {
        //         const tranId = req.params.tranId;
        //         const newPaymentStatus = true;

        //         const result = await ordersCollection.updateOne(
        //             {
        //                 transactionId: tranId,
        //             },
        //             {
        //                 $set: {
        //                     delivery: "pending",
        //                     paymentStatus: newPaymentStatus,
        //                 },
        //             }
        //         );
        //         if (result && result.modifiedCount > 0) {
        //             res.redirect(`${process.env.LIVE_URL}payment/success/${tranId}`);
        //         }
        //     });

        //     app.post("/payment/fail/:tranId", async (req, res) => {
        //         const tranId = req.params.tranId;
        //         const filter = { transactionId: tranId };
        //         const result = await ordersCollection.deleteOne(filter);
        //         if (result.deletedCount === 1) {
        //             res.redirect(`${process.env.LIVE_URL}payment/fail`);
        //         }
        //     });

        // });

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('nyb restaurant server is running.....');
})

app.listen(port, () => {
    console.log(`nyb restaurant server listening on port ${port}`);
})