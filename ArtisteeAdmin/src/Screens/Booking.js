import React from 'react'
import BookingTable from '../Components/BookingTable'
import DashBoardLayout from '../Components/DashBoardLayout/DashBoardLayout'
import Search from '../Components/Header'
import UserTable from '../Components/UserTable'

const Booking = () => {
  return (
    <DashBoardLayout title={'Booking'}>
      <BookingTable />
    </DashBoardLayout>
  )
}

export default Booking
