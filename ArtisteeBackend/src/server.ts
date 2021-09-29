import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
require('dotenv').config()

import config from './config'
import {
  connect,
  createArtistTable,
  createBookingTable,
  showTable,
  createAdminTable,
  addAdmin,
  addBudgetField,
  addDataInDataBase,
  dropTableBooking,
  dropTableArtist,
} from './utils/db'
import authRouter from './resources/auth/auth.routes'
import artistRouter from './resources/artist/artist.routes'
import bookingRouter from './resources/booking/booking.routes'
import getArtistRouter from './resources/getArtists/getArtists.routes'
import {protect} from './utils/auth.middleware'

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send(`List of users`)
})

app.use('/auth', authRouter)
app.use('/get-artist', getArtistRouter)
app.use('/booking', bookingRouter)
app.use(protect)
app.use('/artist', artistRouter)

export const start = async () => {
  try {
    await connect()
    // await createArtistTable()
    // await createBookingTable()
    // await createAdminTable()
    // await addAdmin()
    // await addDataInDataBase()

    await showTable()
    app.listen(config.port, () => {
      console.log(`server listen at ${config.port} 🔥 😻 `)
    })
  } catch (err) {
    console.log('Eror in conecting.... ', err)
  }
}
