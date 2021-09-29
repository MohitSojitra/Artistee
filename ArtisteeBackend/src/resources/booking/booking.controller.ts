import {sendResponseError} from '../../utils/auth.middleware'
import express from 'express'
import {createMailMessage, makeInsertQuery} from '../../utils/utility.function'
import {fireQuery} from '../../utils/db'
import nodemailer from 'nodemailer'
import aws from 'aws-sdk'
import {awsSESConfig} from '../../config'

export const bookArtist = async (
  req: express.Request,
  res: express.Response,
) => {
  const {country, state, capacity, email, date, artist_id, budget} = req.body

  if (
    email === '' ||
    capacity === '' ||
    country === '' ||
    state === '' ||
    date === '' ||
    artist_id === '' ||
    budget === ''
  ) {
    sendResponseError(
      500,
      {isOk: false, message: 'Please verify your inputes'},
      res,
    )
  }

  const query = makeInsertQuery('Booking', {
    country,
    state,
    capacity,
    email,
    date,
    artist_id,
    budget,
  })
  console.log('queryyy======>', query)

  try {
    await fireQuery(query)
    sendEmail(req.body)
    const result = await fireQuery(
      `SELECT * FROM Booking WHERE id= LAST_INSERT_ID()`,
    )
    console.log(JSON.stringify(result, null, 2))
    res.send({
      message: 'Your Request Send Successfully !',
      isOk: true,
    })
  } catch (e) {
    console.log('Error in Fire add artist query')
  }
}

let transport = nodemailer.createTransport({
  host: awsSESConfig.host,
  port: awsSESConfig.SES_PORT,
  auth: {
    user: awsSESConfig.username,
    pass: awsSESConfig.password,
  },
})

export const sendEmail = async body => {
  const message = createMailMessage(body)
  transport.sendMail(message, function (err, info) {
    if (err) {
      console.log('SEND message EROROR : ', err)
      return
    }
    console.log(info)
  })
}
