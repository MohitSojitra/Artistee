import express from 'express'
import {sendResponseError} from '../../utils/auth.middleware'
import {fireQuery} from '../../utils/db'
import {makeFilterQuery} from '../../utils/utility.function'

export const getArtists = async (
  req: express.Request,
  res: express.Response,
) => {
  const limit = 10
  const skip = (parseInt(req.params.index) - 1) * limit
  let hasMore = true

  const {type, keyWord} = req.body

  const query = makeFilterQuery({type, keyWord, limit, skip})

  try {
    const results: any = await fireQuery(query)

    if (results.length === 0 || results.length < limit) {
      hasMore = false
    }

    res.send({result: results, hasMore, isOk: true})
  } catch (e) {
    console.log('eror : ', e)
    sendResponseError(500, `Error ${e}`, res)
  }
}

export const getArtistById = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const result: any = await fireQuery(
      `select * from Artists where id=${req.params.id}`,
    )

    res.send({result: JSON.parse(JSON.stringify(result)), isOk: true})
  } catch (e) {
    console.log('eror : ', e)
    sendResponseError(500, `Error ${e}`, res)
  }
}
