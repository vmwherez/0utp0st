// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51NG7fwL81vsh2XmhVujRoomXf8gBJcyxixMiAA7EwKRJH4mBAfcsU3Rxo9qVwOPAHzE7uijLL56AuQDutF2xFJ0700RrwlscYH"
);
const express = require("express");
const app = express();
app.use(express.static("public"));
import Redis from "ioredis";

// Connect to your internal Redis instance using the REDIS_URL environment variable
// The REDIS_URL is set to the internal Redis URL e.g. redis://red-343245ndffg023:6379
const redis = new Redis(process.env.REDIS_URL);

// Set and retrieve some values
redis.set("key", "ioredis");

redis.get("key", function (err, result) {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});

const YOUR_DOMAIN = "http://localhost:80";

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1NG99LL81vsh2XmhjpRIeC9D",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/index.html`,
    automatic_tax: { enabled: true },
  });

  res.redirect(303, session.url);
});

// custom middleware ahead of express static url eg. /checkout
app.use((req, res, next) => {
  console.log(req.url);
  console.log(req.method);
  console.log(req.query);
});

app.get("/hook", (req, res) => {
  const event = req.body;
  const params = req.query;
  console.log(event, params);
  res.send();
});

app.listen(80, () => console.log("Running on port 80"));
