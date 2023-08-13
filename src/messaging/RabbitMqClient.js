const amqp = require('amqplib')
const rabbitmq_config = require('./rabbitmq_config')
const productCreatedHandler = require('./productCreatedHandler')

class RabbitMqClient {
  channel
  connection

  async connectAndStartListening() {
    this.connection = await amqp.connect(rabbitmq_config.rabbitmq.url)

    this.channel = await this.connection.createChannel()

    await this.channel.assertExchange(
      rabbitmq_config.rabbitmq.productExchange,
      'direct'
    )

    const q = await this.channel.assertQueue('products')

    await this.channel.bindQueue(
      q.queue,
      rabbitmq_config.rabbitmq.productExchange,
      'Product_Created'
    )
    this.channel.consume(q.queue, (msg) => {
      const data = JSON.parse(msg.content)
      productCreatedHandler(data.message)
      console.log(data.message)
      this.channel.ack(msg)
    })
  }

  async publishMessage(routingKey, message) {
    if (!this.channel) {
      await this.connectAndStartListening()
    }

    const { orderExchange } = rabbitmq_config.rabbitmq
    await this.channel.assertExchange(orderExchange, 'direct')
    await this.channel.publish(
      orderExchange,
      routingKey,
      Buffer.from(
        JSON.stringify({
          routingKey,
          message,
        })
      )
    )

    console.log('Message was published')
  }
}

module.exports = new RabbitMqClient()
