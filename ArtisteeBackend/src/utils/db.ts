import {reject} from 'lodash'
import mysql from 'mysql'
import random from 'random-name'
import config, {awsS3Bucket} from '../config/index'
import {makeInsertQuery} from './utility.function'
export const connection = mysql.createConnection({
  host: config.dbUrl,
  user: config.dbUser,
  password: config.dbPassword,
  port: config.dbPort,
  database: config.database,
})

export const connect = () => {
  connection.connect(function (err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack)
      return
    }
    console.log('Connected to database.')
  })
}

export const createArtistTable = async () => {
  try {
    const query = `CREATE TABLE Artists (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      stage_name VARCHAR(100),
      name VARCHAR(100),
      profile_pic VARCHAR(100),
      genere VARCHAR(100),
      address VARCHAR(100),
      mobile_no VARCHAR(100),
      terriotary_of_representation VARCHAR(100)
    )
     `
    await fireQuery(query)
  } catch (e) {
    console.log('Catch block error : = ', e)
  }
}

export const createBookingTable = async () => {
  try {
    const query = `CREATE TABLE Booking (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      country VARCHAR(100),
      budget VARCHAR(100),
      state VARCHAR(100),
      capacity VARCHAR(100),
      email VARCHAR(100),
      date DATE,
      artist_id INT,
      FOREIGN KEY (artist_id) REFERENCES Artists(id)
    )`
    await fireQuery(query)
  } catch (e) {
    console.log('Catch block error : = ', e)
  }
}

export const createAdminTable = async () => {
  try {
    const query = `
    CREATE TABLE Admin (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      userName VARCHAR(100),
      password VARCHAR(100)
    )
    `
    await fireQuery(query)
  } catch (e) {
    console.log('Error :- ', e)
  }
}

export const showTable = async () => {
  try {
    const query = `show tables`
    // const query = `select * from Artists`
    const result = await fireQuery(query)
    console.log(result)
  } catch (e) {
    console.log('Catch block error : = ', e)
  }
}

export const fireQuery = async (query: string, fields?: any) => {
  try {
    // const query = `show tables`
    const p = await new Promise((resolve, reject) => {
      connection.query(query, function (error, r, fields) {
        if (error) {
          reject(error)
        } else {
          const res = JSON.stringify(r)
          const result = JSON.parse(res)
          // console.log(result)
          resolve(result)
        }
      })
    })
    return p
  } catch (e) {
    console.log('Catch block error : = ', e)
  }
}

export const addAdmin = async () => {
  try {
    const query = `INSERT INTO Admin (userName, password)
    VALUES ('${config.adminPannelUserName}' , '${config.adminPannelPassword}');`
    await fireQuery(query)
  } catch (e) {
    console.log('Add admin error')
  }
}

const images = [
  'https://aws-artist-bucket.s3.ap-south-1.amazonaws.com/f0f78f00a86577020b32a43ffed65a32',

  'https://aws-artist-bucket.s3.ap-south-1.amazonaws.com/4b10a268f18915ac8b79915ea2b80775',
]

const genere = [
  'Rock',
  'Musical theatre',
  'Heavy Metal',
  'Electronic',
  'Funk',
  'Gospel',
  'Jazz fusion',
  'Opera',
  'Christian',
  'Medieval',
]

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const addDataInDataBase = async () => {
  try {
    for (let i = 0; i < 2000; i++) {
      const query = makeInsertQuery('Artists', {
        stage_name: random.first().replace("'", ''),
        name: random.last().replace("'", ''),
        genere: genere[getRandomInt(0, 9)],
        address: random.place().replace("'", ''),
        profile_pic: images[getRandomInt(0, 1)],
        mobile_no: '012345654',
        terriotary_of_representation: 'World Wide',
      })
      await fireQuery(query)
    }
  } catch (e) {
    console.log('Add admin error :- ', e)
  }
}

export const addBudgetField = async () => {
  try {
    const query = `ALTER TABLE Booking ADD budget varchar(255);`
    await fireQuery(query)
  } catch (e) {
    console.log('Add admin error')
  }
}

export const dropTableArtist = async () => {
  try {
    const query = `drop table Artists`
    await fireQuery(query)
  } catch (e) {
    console.log('Add admin error')
  }
}
export const dropTableBooking = async () => {
  try {
    const query = `drop table Booking`
    await fireQuery(query)
  } catch (e) {
    console.log('Add admin error')
  }
}
