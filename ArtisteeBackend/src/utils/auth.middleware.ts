import express from 'express'
import {isAuthenticated} from './utility.function'

export const sendResponseError = (
  statusCode: number,
  msg: any,
  res: express.Response,
) => {
  res.status(statusCode || 400).send(!!msg ? msg : 'Invalid !!')
}

export const validateAuthInput = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const {userName, password} = req.body

  if (!!!userName || !!!password) {
    sendResponseError(400, {message: 'Invalid Input !!', isOk: false}, res)
    return
  }

  next()
}

export const protect = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const {userName, password} = req.body

  try {
    if (isAuthenticated(userName, password)) {
      next()
    } else {
      sendResponseError(
        400,
        {message: `you are not authorizeed`, isOk: false},
        res,
      )
    }
  } catch (err) {
    console.log('Error ', err)
    sendResponseError(400, `Error ${err}`, res)
  }
}
