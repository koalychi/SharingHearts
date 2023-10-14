import Router from 'express'

const routes = Router()

routes.get('/', (req, res) => {
  res.send('Server is running')
})

export { routes }