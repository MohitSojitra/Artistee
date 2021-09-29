import {
  FormControl,
  MenuItem,
  makeStyles,
  Select,
  Box,
  useMediaQuery,
  createTheme,
  Typography,
} from '@material-ui/core'
import React, {useState} from 'react'
import colors from '../../Theme/ColorPalette'
import PlaceHolderContainer from '../PlaceHolderContainer/PlaceHolderContainer'
import {TextElement} from '../TextElement'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import {filterType} from '../../utils/config'
const theme = createTheme()
function DropDownState({contryState, setContryState, data, isContry}) {
  const isLessThenSm = useMediaQuery(theme.breakpoints.down('sm'))
  const isLessThenMd = useMediaQuery(theme.breakpoints.down('md'))
  const isBetweenSmAndMd = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const isBetweenMdAndLg = useMediaQuery(theme.breakpoints.between('md', 'lg'))
  const isBetweenLgAndXl = useMediaQuery(theme.breakpoints.between('lg', 'xl'))
  const isBetweenXsAndSm = useMediaQuery(theme.breakpoints.between('xs', 'sm'))
  const isUpSm = useMediaQuery(theme.breakpoints.up('sm'))
  const isLessThenXs = useMediaQuery(theme.breakpoints.down('xs'))

  // const [value, setValue] = useState('')
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

  const styleProps = {
    isLessThenSm,
    isLessThenMd,
    isBetweenSmAndMd,
    isBetweenMdAndLg,
    isBetweenLgAndXl,
    isBetweenXsAndSm,
  }
  const classes = useStyles(styleProps)
  return (
    <Box
      style={{
        color: colors.white,
        width: '100%',

        marginBottom: isUpSm || isLessThenXs ? '20px' : 0,

        // marginRight: isLessThenMd ? '0px' : '20px',
        // marginRight: '20px',
      }}
    >
      <Box className={classes.dropDownTitle}>
        <Typography variant="h3" className={classes.filterBygenre} gutterBottom>
          {isContry
            ? contryState.country
              ? contryState.country
              : 'SELECT COUNTRY'
            : contryState.state
            ? contryState.state
            : 'SELECT STATE'}
        </Typography>
        <ArrowForwardIosIcon
          style={{
            transform: `rotate(${!isDropDownOpen ? 90 : -90}deg)`,
            transition: '0.3s ease',
            cursor: 'pointer',
            marginRight: '20px',
          }}
          onClick={() => {
            if (isContry) {
              setIsDropDownOpen(!isDropDownOpen)
            } else {
              if (data.length > 0) {
                setIsDropDownOpen(!isDropDownOpen)
              }
            }
          }}
        />
      </Box>
      <Box
        style={{
          position: 'relative',
        }}
      >
        <Box
          style={{
            position: 'absolute',

            width: '100%',
            // padding: '20px 20px',
            zIndex: 9,
            display: isDropDownOpen ? 'block' : 'none',
            transition: '0.3s ease',
          }}
        >
          <Box className={classes.dropDownContent}>
            {data.map((d, index) => {
              return (
                <Box
                  className={classes.dropDownItem}
                  onClick={() => {
                    console.log({d})
                    if (isContry) {
                      setContryState({...contryState, country: d, state: null})
                      setIsDropDownOpen(!isDropDownOpen)
                    } else {
                      setContryState({...contryState, state: d})
                      setIsDropDownOpen(!isDropDownOpen)
                    }
                  }}
                >
                  <Typography
                    variant="h3"
                    className={classes.filterBygenre}
                    gutterBottom
                  >
                    {d}
                  </Typography>
                </Box>
              )
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(theme => ({
  filterBygenre: {
    fontSize: props => {
      if (props.isLessThenSm) {
        return '1rem'
      }
      if (props.isLessThenMd) {
        return '1.2rem'
      }

      return '1.4rem'
    },
    marginLeft: '20px',
  },

  dropDownTitle: {
    marginRight: props => (!props.isBetweenSmAndMd ? ' 80px' : '0px'),

    // marginRight: isUpSm || isLessThenXs ? ' 80px' : '0px',

    padding: '20px 0px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    //background: 'linear-gradient(to right, #014c52 , #0f0c3b)',
    background: 'linear-gradient(to right, #014c52 , #0f0c3b)',
    transition: '0.3s ease',
    width: props =>
      props.isLessThenSm
        ? '100%'
        : props.isLessThenMd
        ? '98%'
        : props.isBetweenLgAndXl
        ? '98%'
        : '96%',
  },

  dropDownContent: {
    marginRight: props => (!props.isBetweenSmAndMd ? ' 80px' : '0px'),

    padding: '20px 0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',

    background: 'linear-gradient(to right, #014c52 , #0f0c3b)',
    width: props =>
      props.isLessThenSm
        ? '100%'
        : props.isLessThenMd
        ? '98%'
        : props.isBetweenLgAndXl
        ? '98%'
        : '96%',
  },

  dropDownItem: {
    //width: '100%',
    width: props =>
      props.isLessThenSm
        ? '100%'
        : props.isLessThenMd
        ? '98%'
        : props.isBetweenLgAndXl
        ? '98%'
        : '96%',
    padding: '10px 20px',
    cursor: 'pointer',
    '&:hover': {
      margin:'0px 20px',
      background: 'linear-gradient(to right, #388c94, #0a081f) ',
    },
  },
}))

export default DropDownState
