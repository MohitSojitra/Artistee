import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material'
import React, {memo} from 'react'
import {colors} from '../Theme/ColorPalette'
// import { InputAdornment } from "@mui/material";
// import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@mui/icons-material/Search'

function Header(props) {
  const {value, setValue, handleOpenDetail, setIsEdit, setEditData, booking} =
    props
  return (
    <Grid
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
        marginTop: '20px',
        alignItems: 'center',
        padding: '0px 20px',
      }}
    >
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        value={value}
        style={{display: 'flex', minWidth: '80%'}}
        onChange={e => setValue(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {!booking ? (
        <Button
          onClick={() => {
            handleOpenDetail()
            setIsEdit()
            setEditData()
          }}
          variant="contained"
          style={{background: colors.primary}}
        >
          Add Artist
        </Button>
      ) : null}
    </Grid>
  )
}

export default memo(Header)
