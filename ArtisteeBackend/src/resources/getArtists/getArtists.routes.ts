import {Router} from 'express'
import {getArtists, getArtistById} from './getArtists.controller'

const router = Router()

router.route('/:index').post(getArtists)
router.route('/artist/:id').get(getArtistById)
export default router
