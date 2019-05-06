module.exports = io => {

  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('new-message', newMessage => {
      socket.broadcast.emit('new-message', newMessage)
    })

    socket.on('new-gig', newGig => {
      socket.broadcast.emit('new-gig', newGig)
    })

    socket.on('update-gig', gig => {
      socket.broadcast.emit('update-gig', gig)
    })

    socket.on('delete-gig', gig => {
      socket.broadcast.emit('delete-gig', gig)
    })

  })
}
