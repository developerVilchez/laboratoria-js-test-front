import test from 'ava'
import { Nuxt, Builder } from 'nuxt'
import { resolve } from 'path'

// We keep a reference to Nuxt so we can close
// the server at the end of the test
let nuxt = null

// Init Nuxt.js and start listening on localhost:4000
test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname, '..')
  let config = {}
  try { config = require(resolve(rootDir, 'nuxt.config.js')) } catch (e) {}
  config.rootDir = rootDir // project folder
  config.dev = false // production build
  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  nuxt.listen(3000, 'localhost')
})

// Example of testing only generated html
test('Route /login exits and render HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/login', context)
  t.true(html.includes('<i class="fa fa-at" aria-hidden="true"></i>'))
})

// Example of testing via DOM checking
test('Route /login exits and render HTML with CSS class applied', async t => {
  const window = await nuxt.renderAndGetWindow('localhost:3000/login')
  const element = window.document.querySelector('.hello')
  t.not(element, null)
  t.is(element.className, 'hello')
})

// Close the Nuxt server
test.after('Closing server', t => {
  nuxt.close()
})
