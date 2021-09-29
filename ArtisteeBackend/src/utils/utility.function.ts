import {Base64} from 'js-base64'
import envConfig, {awsSESConfig} from '../config'

export const isAuthenticated = (userName, password) => {
  const pass = Base64.atob(password)
  const uName = Base64.atob(userName)

  return (
    pass === envConfig.adminPannelPassword &&
    uName === envConfig.adminPannelUserName
  )
}

const getColumnNameAndValues = properties => {
  let columbName = '('
  let values = '('
  let k = 0
  Object.keys(properties).map(key => {
    if (!!properties[key]) {
      if (k === 0) {
        columbName = columbName + key
        values = values + "'" + properties[key] + "'"
      } else {
        columbName = columbName + ',' + key
        values = values + ", '" + properties[key] + "'"
      }
      k++
    }
    return
  })
  columbName = columbName + ')'
  values = values + ')'
  return {columbName, values}
}

export const makeInsertQuery = (tableName, properties) => {
  const {columbName, values} = getColumnNameAndValues(properties)
  return `INSERT INTO ${tableName} ${columbName} VALUES ${values};`
}

export const makeDeleteQuery = (tableName, id) => {
  return `DELETE FROM ${tableName} WHERE id=${id};`
}

export const makeUpdateQuery = (tableName, properties, id) => {
  let expression = ''
  let k = 0
  Object.keys(properties).map(key => {
    if (!!properties[key]) {
      if (k === 0) {
        expression = expression + key + " = '" + properties[key] + "'"
      } else {
        expression = expression + ' , ' + key + " = '" + properties[key] + "'"
      }
      k++
    }
    return
  })
  return `UPDATE ${tableName} SET ${expression} where id=${id};`
}

const filterType = {
  ALL: 'ALL',
  ALPHABET: 'ALPHABET',
  GENERE: 'GENERE',
  SEARCH: 'SEARCH',
}

export const makeFilterQuery = ({type, keyWord, limit, skip}) => {
  let query
  switch (type) {
    case filterType.ALL:
      query = `SELECT * from Artists order by id desc limit ${limit} offset ${skip}`
      break
    case filterType.ALPHABET:
      query = `SELECT * from Artists WHERE LOWER(stage_name) LIKE '${keyWord}%' order by id desc  limit ${limit} offset ${skip}`
      break
    case filterType.GENERE:
      query = `SELECT * from Artists WHERE genere='${keyWord}' order by id desc limit ${limit} offset ${skip}`
      break
    case filterType.SEARCH:
      query = `SELECT * from Artists WHERE LOWER(stage_name)  LIKE '%${keyWord}%' order by id desc limit ${limit} offset ${skip}`
      break

    default:
      break
  }

  return query
}

export const makeBookingQuery = ({keyWord, limit, skip}) => {
  return `SELECT Booking.id, Booking.email, Booking.budget, Booking.country, Booking.state, Booking.capacity, Booking.date, Artists.stage_name ,Artists.name, Artists.profile_pic, Artists.genere, Artists.address  from Booking inner join Artists on LOWER(Booking.email) LIKE '%${keyWord}%' and Booking.artist_id =Artists.id  order by id desc limit ${limit} offset ${skip}`
}

export const createMailMessage = ({email, country, state, capacity, date}) => {
  const message = {
    from: awsSESConfig.mialId,
    to: awsSESConfig.mialId,
    subject: `New Booking arrived from ${email}`,
    html: `<h1>Email : ${email}</h1>
    <h1>country : ${country}</h1>
    <h1>state : ${state}</h1>
    <h1>capacity : ${capacity}</h1>
    <h1>date : ${date}</h1>
            `,
  }
  return message
}
