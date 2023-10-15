import Router from 'express'
import { authController, taskController, userController } from './controllers';

const routes = Router()

routes.use('/auth', authController);
routes.use('/user', userController);
routes.use('/task', taskController)

routes.get('/', (req, res) => {
  res.send('Server is running')
})

export { routes }