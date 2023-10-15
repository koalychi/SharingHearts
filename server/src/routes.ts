import Router from 'express'
import { authController } from './controllers';

const routes = Router()

routes.use('/auth', authController);

routes.get('/', (req, res) => {
  res.send('Server is running')
})

export { routes }