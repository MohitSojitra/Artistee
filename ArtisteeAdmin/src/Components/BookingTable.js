import * as React from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  CircularProgress,
  Avatar,
  Grid,
  Button,
  TextField,
  FormHelperText,
} from '@mui/material'
import SideDrawer from './SideDrawer/SideDrawer'
import useUser from '../hooks/useUser'
import InfiniteScroll from 'react-infinite-scroller'

import Header from './Header'
// import DeleteIcon from "./DeleteIcon";
import {Api} from '../utils/API'
import useBookingData from '../hooks/useBookingData'

const columns = [
  {id: 'email', label: 'Email', minWidth: 60},
  {id: 'country', label: 'Country', minWidth: 100},
  {id: 'state', label: 'State', minWidth: 100},
  {
    id: 'capacity',
    label: 'capacity',
    minWidth: 100,
    align: 'right',
    format: value => value.toLocaleString('en-US'),
  },
  {
    id: 'budget',
    label: 'budget',
    minWidth: 100,
    align: 'right',
    format: value => value.toLocaleString('en-US'),
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 120,
    align: 'right',
    format: value => value.toLocaleString('en-US'),
  },
  {id: 'name', label: 'Artist\u00a0Name', minWidth: 100},
  {id: 'stage_name', label: 'Stage\u00a0name', minWidth: 100},
]

export default function BookingTable() {
  const [value, setValue] = React.useState('')
  const [bookingData, setBookingData] = React.useState([])

  const {data, hasMore, loadMore} = useBookingData(value)

  React.useEffect(() => {
    setBookingData(data)
  }, [data])
  console.log('data=====>', bookingData)

  return (
    <Paper sx={{width: '100%', overflow: 'hidden'}}>
      <TableContainer sx={{maxHeight: '80%'}}>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasMore}
          loader={
            <Box style={{}}>
              {' '}
              <CircularProgress />
            </Box>
          }
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{minWidth: column.minWidth}}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {bookingData.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column, i) => {
                      const value = row[column.id]
                      return (
                        <TableCell
                          key={column.id + row.id}
                          align={column.align}
                        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </InfiniteScroll>
      </TableContainer>
    </Paper>
  )
}
