const express = require('express')
const app = express()
const config = {
  port: 1337 // 3000
}
const data = {
  channels: [{
    id: '1',
    name: 'Channel 1',
  },{
    id: '2',
    name: 'Channel 2',
  },{
    id: '3',
    name: 'Channel 3',
  }]
}
app.set('port', config.port)

app.get('/', (req, res) => {
  // Project homepage
  // Return some HTML content inside `body` with:
  // * The page title
  // * A link to the `/channels` page
  // Don't bother with the `head` tag
  res.render('hello.ejs', {name: 'Unknown'})
})

app.get('/channels', (req, res) => {
  // List of channels
  // Return some HTML content inside `body` with:
  // * The page title
  // * A list of every channel with a link to the channel page
  // Notes:
  // * Channels are identified by channel ids.
  // * Make sure to find the appropriate HTML tag to respect the HTML semantic
  //   of a list

  res.render('channels')
})

app.get('/channel_body/:id', (req, res) => {
  // Channel information
  // Print the channel title
  res.render('channel_body', {id: req.params.id})
})


// app.listen(config.port, () => {
//   console.log(`Chat is waiting for you at http://localhost:${config.port}`)
// })

app.set('views', "./views")
app.set('view engine', 'ejs');

app.listen(
  app.get('port'),
  () => console.log(`port ${app.get('port')}`)
)

app.get(
  '/hello/:name',
  (req, res) => res.render('hello.ejs', {name: req.params.name})
)

app.get('/metrics.json', async (req, res) => {
  const data = await metrics.list()
  res.status(200).json(data)
})



const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
