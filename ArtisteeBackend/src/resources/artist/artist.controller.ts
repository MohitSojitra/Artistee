import {sendResponseError} from './../../utils/auth.middleware'
import express from 'express'
import {
  makeDeleteQuery,
  makeInsertQuery,
  makeUpdateQuery,
  makeBookingQuery,
} from '../../utils/utility.function'
import {fireQuery} from '../../utils/db'
import {awsS3Bucket} from '../../config'
import aws from 'aws-sdk'
import {v4 as uuidv4} from 'uuid'
import crypto from 'crypto'
import {promisify} from 'util'
const randomBytes = promisify(crypto.randomBytes)

export const addArtist = async (
  req: express.Request,
  res: express.Response,
) => {
  const {
    stage_name,
    address,
    genere,
    name,
    profile_pic,
    mobile_no,
    terriotary_of_representation,
  } = req.body

  if (stage_name === '') {
    sendResponseError(
      500,
      {isOk: false, message: 'Artist must have stage name'},
      res,
    )
  }

  const query = makeInsertQuery('Artists', {
    stage_name,
    address,
    genere,
    name,
    profile_pic,
    mobile_no,
    terriotary_of_representation,
  })
  try {
    await fireQuery(query)
    const result = await fireQuery(
      `SELECT * FROM Artists WHERE id= LAST_INSERT_ID()`,
    )
    // console.log(result)
    res.send({
      message: 'Artist add Successfully',
      isOk: true,
      item: JSON.parse(JSON.stringify(result)),
    })
  } catch (e) {
    console.log('Error in Fire add artist query')
  }
}

export const deleteArtist = async (
  req: express.Request,
  res: express.Response,
) => {
  const query = makeDeleteQuery('Artists', req.params.id)
  try {
    const results = await fireQuery(query)
    // console.log(results)
    res.send({message: 'Artist delete Successfully', isOk: true})
  } catch (e) {
    console.log('Error in Fire delete artist query')
  }
}

export const updateArtist = async (
  req: express.Request,
  res: express.Response,
) => {
  const {
    stage_name,
    address,
    genere,
    name,
    profile_pic,
    mobile_no,
    terriotary_of_representation,
  } = req.body

  const query = makeUpdateQuery(
    'Artists',
    {
      stage_name,
      address,
      genere,
      name,
      profile_pic,
      mobile_no,
      terriotary_of_representation,
    },
    req.params.id,
  )
  try {
    await fireQuery(query)
    res.send({message: 'Successfully update artist', isOk: true})
  } catch (e) {
    console.log('Error in Fire update artist query')
  }
}

const s3 = new aws.S3({
  region: awsS3Bucket.region,
  accessKeyId: awsS3Bucket.accessKeyId,
  secretAccessKey: awsS3Bucket.secretAccessKey,
  signatureVersion: 'v4',
})

const generateUploadUrl = async () => {
  const rawByte = await randomBytes(16)

  const imageName = rawByte.toString('hex')
  const params = {
    Bucket: awsS3Bucket.bucketName,
    Key: imageName,
    Expires: 120,
  }

  const uploadUrl = await s3.getSignedUrlPromise('putObject', params)
  return uploadUrl
}

export const getUploadImageUrl = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const url = await generateUploadUrl()
    res.send({message: 'url generated Successfully', isOk: true, url})
  } catch (e) {
    console.log('Error in get sign image url ', e)
  }
}

export const getAllBooking = async (
  req: express.Request,
  res: express.Response,
) => {
  const limit = 10
  const skip = (parseInt(req.params.index) - 1) * limit
  let hasMore = true

  const {keyWord} = req.body

  const query = makeBookingQuery({keyWord, limit, skip})

  try {
    const results: any = await fireQuery(query)

    if (results.length === 0 || results.length < limit) {
      hasMore = false
    }
    console.log('Resultsss====>', JSON.stringify(results, null, 2))

    res.send({result: results, hasMore, isOk: true})
  } catch (e) {
    console.log('eror : ', e)
    sendResponseError(500, `Error ${e}`, res)
  }
}
