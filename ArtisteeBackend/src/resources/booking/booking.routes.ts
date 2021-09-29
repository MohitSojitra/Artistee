import {Router} from 'express'

import {bookArtist} from './booking.controller'
const router = Router()

router.route('/').post(bookArtist)

export default router
