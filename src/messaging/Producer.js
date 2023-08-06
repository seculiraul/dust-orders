const amqp = require('amqplib')
const rabbitmq_config = require('./rabbitmq_config')

class Producer {
  channel

  async createChannel() {
    const connection = await amqp.connect(rabbitmq_config.rabbitmq.url)

    this.channel = await connection.createChannel()
  }

  async publishMessage(routingKey, message) {
    if (!this.channel) {
      await this.createChannel()
    }

    const { exchange } = rabbitmq_config.rabbitmq
    await this.channel.assertExchange(exchange, 'direct')

    await this.channel.publish(
      exchange,
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

module.exports = Producer
