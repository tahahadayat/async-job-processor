import { Router } from 'express'

import { jobRoutes } from './jobRoutes'

const appRouter = Router()

appRouter.use('/jobs', jobRoutes)

export { appRouter }
