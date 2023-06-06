// This is your test secret API key.
const stripe = require('stripe')('sk_test_51NG7fwL81vsh2XmhVujRoomXf8gBJcyxixMiAA7EwKRJH4mBAfcsU3Rxo9qVwOPAHzE7uijLL56AuQDutF2xFJ0700RrwlscYH');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:80';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1NG99LL81vsh2XmhjpRIeC9D',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    automatic_tax: {enabled: true},
  });

  res.redirect(303, session.url);
});

app.listen(80, () => console.log('Running on port 80'));