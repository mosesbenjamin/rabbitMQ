const amqp = require('amqplib')

const connect = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost:5672')

    const channel = await connection.createChannel()
    await channel.assertQueue('jobs')

    channel.consume('jobs', (message) => {
      const input = JSON.parse(message.content.toString())
      console.log(`Recieved message: ${input}`)
      if (input.number == 28) {
        channel.ack(message)
      }
    })

    console.log('Waiting for messages...')
  } catch (error) {
    console.error(error)
  }
}

connect()
