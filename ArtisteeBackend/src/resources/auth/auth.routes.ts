import {Router} from 'express'
import {validateAuthInput} from '../../utils/auth.middleware'

import {signin} from './auth.controller'

const router = Router()

router.route('/signin').post([validateAuthInput], signin)
export default router
