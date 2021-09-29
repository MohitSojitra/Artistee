import React, {memo, useState} from 'react'
import {Button, makeStyles} from '@material-ui/core'

import {
  Box,
  Container,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Input,
  useMediaQuery,
  createTheme,
} from '@material-ui/core'
import DropDown from './DropDownState'
import {country} from '../../utils/tempState'
const StateContryDropDown = ({contryState, setContryState}) => {
  return (
    <>
      <Grid xs={12} md={6}>
        <DropDown
          contryState={contryState}
          setContryState={setContryState}
          isContry={true}
          data={Object.keys(country)}
        />
      </Grid>
      <Grid xs={12} md={6}>
        <DropDown
          contryState={contryState}
          setContryState={setContryState}
          isContry={false}
          data={contryState.country ? country[contryState.country] : []}
        />
      </Grid>
    </>
  )
}
export default memo(StateContryDropDown)
