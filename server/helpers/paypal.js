const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AaLergoLwfqKDH_0V_TZzZAO2DJee9g4G4Gtm5yLfA4DvYZXIoNTYUddyqNC2Vkfj9GBXqpauRZVC63U",
  client_secret:
    "EK5g3-A44PnWOEefSzWxDgpHypDYQa9TFcuDam6S5ixblRq2ARbVIXN2xk9uKP9hIATEvnZoIECt7asC",
});

module.exports = paypal;
