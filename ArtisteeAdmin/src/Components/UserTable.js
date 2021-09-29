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
import EditIcon from '@mui/icons-material/Edit'
import SideDrawer from './SideDrawer/SideDrawer'
import useUser from '../hooks/useUser'
import InfiniteScroll from 'react-infinite-scroller'
import DetailModal from './DetailModal'

import Header from './Header'
import DeleteIcon from './DeleteIcon'
import {Api} from '../utils/API'
import {toast} from 'react-toastify'

const columns = [
  {id: 'profile_pic', label: 'Profile', minWidth: 60},
  {id: 'name', label: 'Artist Name', minWidth: 100},
  {id: 'stage_name', label: 'Stage\u00a0Name', minWidth: 100},
  {
    id: 'genere',
    label: 'Genere',
    minWidth: 100,
    align: 'right',
    format: value => value.toLocaleString('en-US'),
  },
  {
    id: 'mobile_no',
    label: 'Mobile',
    minWidth: 120,
    align: 'right',
    format: value => value.toLocaleString('en-US'),
  },
  {
    id: 'terriotary_of_representation',
    label: 'TERRITORIES OF REPRESENTATION',
    minWidth: 120,
    align: 'right',
    format: value => value.toLocaleString('en-US'),
  },
  {
    id: 'address',
    label: 'Address',
    minWidth: 120,
    align: 'right',
    format: value => value.toLocaleString('en-US'),
  },

  {id: 'edit', label: 'Edit', minWidth: 100},
  {id: 'delete', label: 'Delete', minWidth: 100},
]

let timeout = null

export default function UserTable() {
  const [open, setOpen] = React.useState(false)
  const [isDrawerOpen, setisDrawerOpen] = React.useState(false)
  const [editData, setEditData] = React.useState(null)
  const [value, setValue] = React.useState('')
  const [artistData, setArtistData] = React.useState([])
  const [isEdit, setIsEdit] = React.useState(false)

  const {data, hasMore, loadMore} = useUser(value)

  React.useEffect(() => {
    setArtistData(data)
  }, [data])

  const toggleDrawer = () => {
    setisDrawerOpen(!isDrawerOpen)
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const onDeleteArtist = async artistId => {
    try {
      const {statusCode, data} = await Api.DeleteRequest(`/artist/${artistId}`)
      const {isOk, message} = JSON.parse(data)

      if (statusCode === 400 || statusCode === 500 || !isOk) {
        toast.error(message)
        return
      }

      const newData = [...artistData]
      const filteredData = newData.filter(item => item.id !== artistId)
      setArtistData(filteredData)
      toast.success(message)
    } catch (error) {
      console.log('Error of delete Artist', error)
      toast.error(error)
    }
  }

  const _setIsEditHeader = React.useCallback(() => {
    setIsEdit(false)
  }, [])

  const _setIsEditDataHeader = React.useCallback(() => {
    setEditData(null)
  }, [])

  const _handleLoadMore = React.useCallback(() => {
    clearTimeout(timeout)

    // Make a new timeout set to go off in 1000ms (1 second)

    timeout = setTimeout(loadMore, 1000)
  }, [loadMore])
  return (
    <Paper sx={{width: '100%', overflow: 'hidden'}}>
      <Header
        value={value}
        setValue={setValue}
        handleOpenDetail={handleOpen}
        setIsEdit={_setIsEditHeader}
        setEditData={_setIsEditDataHeader}
      />
      <TableContainer sx={{maxHeight: '80%', overflow: 'hidden'}}>
        <InfiniteScroll
          pageStart={0}
          loadMore={_handleLoadMore}
          hasMore={hasMore}
          loader={
            <Box
              style={{width: '100%', display: 'flex', justifyContent: 'center'}}
            >
              {' '}
              <CircularProgress />
            </Box>
          }
          // useWindow={false}
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
              {artistData.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column, i) => {
                      const value = row[column.id]
                      if (column.id === 'profile_pic') {
                        return (
                          <TableCell
                            key={column.id + row.id}
                            align={column.align}
                          >
                            <Avatar
                              src={value}
                              height={'30px'}
                              width={'30px'}
                              style={{borderRadius: '15px'}}
                              alt={row[column.stage_name]}
                            />
                          </TableCell>
                        )
                      }
                      if (column.id !== 'edit' && column.id !== 'delete') {
                        return (
                          <TableCell
                            key={column.id + row.id}
                            align={column.align}
                          >
                            {(column.format && typeof value === 'number'
                              ? column.format(value)
                              : value) || ''}
                          </TableCell>
                        )
                      }
                      return (
                        <TableCell
                          key={column.id + row.id}
                          align={column.align}
                        >
                          {column.id === 'edit' ? (
                            <EditIcon
                              onClick={() => {
                                setEditData(row)
                                handleOpen()
                                setIsEdit(true)
                              }}
                              style={{cursor: 'pointer'}}
                            />
                          ) : (
                            <DeleteIcon
                              onClick={() => onDeleteArtist(row.id)}
                            />
                          )}
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
      {open ? (
        <DetailModal
          artistData={artistData}
          setArtistData={setArtistData}
          handleClose={handleClose}
          open={open}
          edit={isEdit}
          editData={editData}
        />
      ) : null}
      <SideDrawer toggleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} />
    </Paper>
  )
}
