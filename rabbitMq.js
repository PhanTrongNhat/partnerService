let amqp = require("amqplib/callback_api");
let channelResult;

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = "hello";
    var msg = "Hello nha may 1 world";

    channel.assertQueue(queue, {
      durable: false,
    });

    channelResult = channel;
    channel.sendToQueue(queue, Buffer.from("hello"));
  
    console.log(" [x] Sent %s", msg);

    channel.assertQueue("product", {
      durable: false,
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });
});

module.exports = {
  amqp,
  channelResult,
};
