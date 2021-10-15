
const {v4: uuid} = require('uuid')
const {clone, merge} = require('mixme')

const store =  {
  channels: {
  "channel:1902": {
    name: "Channel 1"
  },

  "channel:9302": {
    name: "Channel 2"
  }
},
  users: {
    "user:3002": {
    username: "geoffrey",
    password: "rki903ir09io"
    },

    "user:3920": {
    username: "david",
    password: "32u0fjioer"
    },
},

  messages: {
    "channel:1902:message:1288329299": {
        author: "3920",
        content: "ping"
      },
    "channel:1902:message:1288339049": {
        author: "3002",
        content: "pong"
      },

  },
}
// const level = require('level')
// const db = level(__dirname + '/../db')

module.exports = {
  channels: {
    create: async (channel) => {
      if(!channel.name) throw Error('Invalid channel')
      const id = uuid()
      store.channels[id] = channel
      // await db.put(`channels:${id}`, JSON.stringify(channel))
      return merge(channel, {id: id})
    },
    list: async () => {
      return Object.keys(store.channels).map( (id) => {
        const channel = clone(store.channels[id])
        channel.id = id
        return channel
      })
      // return new Promise( (resolve, reject) => {
      //   const channels = []
      //   db.createReadStream({
      //     gt: "channels:",
      //     lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
      //   }).on( 'data', ({key, value}) => {
      //     channel = JSON.parse(value)
      //     channel.id = key.split(':')[1]
      //     channels.push(channel)
      //   }).on( 'error', (err) => {
      //     reject(err)
      //   }).on( 'end', () => {
      //     resolve(channels)
      //   })
      // })
    },
    update: (id, channel) => {
      const original = store.channels[id]
      if(!original) throw Error('Unregistered channel id')
      store.channels[id] = merge(original, channel)
    },
    delete: (id, channel) => {
      const original = store.channels[id]
      if(!original) throw Error('Unregistered channel id')
      delete store.channels[id]
    }
  },
  users: {
    create: async (user) => {
      if(!user.username) throw Error('Invalid user')
      const id = uuid()
      store.users[id] = user
      // await db.put(`channels:${id}`, JSON.stringify(channel))
      return merge(user, {id: id})
    },
    list: async () => {
      return Object.keys(store.users).map( (id) => {
        const user = clone(store.users[id])
        user.id = id
        return user
      })
      // return new Promise( (resolve, reject) => {
      //   const channels = []
      //   db.createReadStream({
      //     gt: "channels:",
      //     lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
      //   }).on( 'data', ({key, value}) => {
      //     channel = JSON.parse(value)
      //     channel.id = key.split(':')[1]
      //     channels.push(channel)
      //   }).on( 'error', (err) => {
      //     reject(err)
      //   }).on( 'end', () => {
      //     resolve(channels)
      //   })
      // })
    },
    update: (id, user) => {
      const original = store.users[id]
      if(!original) throw Error('Unregistered user id')
      store.users[id] = merge(original, user)
    },
    delete: (id, user) => {
      const original = store.users[id]
      if(!original) throw Error('Unregistered user id')
      delete store.users[id]
    }
  },
  messages: {},
  admin: {
    clear: async () => {
      store.channels = {}
      // await db.clear()
    }
  }
}
