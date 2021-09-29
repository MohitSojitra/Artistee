import {Router} from 'express'

import {
  addArtist,
  deleteArtist,
  getUploadImageUrl,
  updateArtist,
  getAllBooking,
} from './artist.controller'
const router = Router()

router.route('/booking/:index').post(getAllBooking)

router.route('/add-artist').post(addArtist)

router.route('/:id').put(updateArtist).delete(deleteArtist)

router.route('/getPutUrl').post(getUploadImageUrl)

export default router
