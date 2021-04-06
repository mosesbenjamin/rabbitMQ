const amqp = require('amqplib')

const message = { number: process.argv[2] }

const connect = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost:5672')

    const channel = await connection.createChannel()
    await channel.assertQueue('jobs')
    channel.sendToQueue('jobs', Buffer.from(JSON.stringify(message)))

    console.log(`Job sent successfully ${message.number}`)
  } catch (error) {
    console.error(error)
  }
}

connect()
