import {
  Box,
  makeStyles,
  Container,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Input,
  Button,
  useMediaQuery,
  createTheme,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core'
import React from 'react'
import {useHistory} from 'react-router-dom'
import {TextElement} from '../../components/TextElement'
import colors from '../../Theme/ColorPalette'
import {filterType} from '../../utils/config'
import {MuiPickersUtilsProvider, DatePicker} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import ButtonContainer from '../../components/ButtonContainer'
import DropDown from '../../components/DropDown/DropDown'
import {toast} from 'react-toastify'

import Loader from '../../components/Loader/Loader'
import {Api} from '../../utils/API'
import dayjs from 'dayjs'
import {validateEmailValue} from '../../utils/helper'

import StateContryDropDown from '../../components/StateContryDropDown/StateContryDropDown'
import ErrorText from '../../components/ErrorText'

const theme = createTheme()

const datePickertheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        background: 'linear-gradient(to right, #014c52 , #0f0c3b)',
      },
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: '#33abb6',
        '&:hover': {
          backgroundColor: '#1a4a52',
        },
      },
      dayDisabled: {
        color: '#ccc',
      },
      current: {
        color: 'green',
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: '#33abb6',
        backgroundColor: 'green',
      },
    },
  },
})

function MusicDetail({match}) {
  const [selectedDate, handleDateChange] = React.useState(new Date())
  const [artistDetail, setArtistDetail] = React.useState({})
  const [loading, setLoading] = React.useState(false)
  const [emailError, setEmailError] = React.useState('')
  const [budgetError, setBudgetError] = React.useState('')
  const [buttonDisabled, setButtonDisabled] = React.useState(true)
  const [formData, setFormData] = React.useState({
    email: '',
    budget: '',
    capacity: '',
    artist_id: artistDetail?.id,
    state: 'Usa',
    country: 'london',
  })
  const [contryState, setContryState] = React.useState({
    country: null,
    state: null,
  })

  console.log('selected date ====>', selectedDate)

  const history = useHistory()

  const isLessThenSm = useMediaQuery(theme.breakpoints.down('sm'))
  const isLessThenMd = useMediaQuery(theme.breakpoints.down('md'))
  const isBetweenLgAndMd = useMediaQuery(theme.breakpoints.between('lg', 'md'))

  const styleProps = {
    isLessThenSm,
    isLessThenMd,
    isBetweenLgAndMd,
  }
  const classes = useStyles(styleProps)

  const [filter, setFilter] = React.useState({
    type: filterType.ALL,
    keyWord: '',
  })
  // const classes = useStyles();

  React.useEffect(() => {
    getArtistDetail()
  }, [])

  const getArtistDetail = async () => {
    try {
      setLoading(true)
      const {statusCode, data} = await Api.getRequest(
        `/get-artist/artist/${match.params.id}`,
      )

      const {result, isOk} = JSON.parse(data)
      setLoading(false)
      if (statusCode === 200 && isOk) {
        setArtistDetail(result[0])
      }
    } catch (error) {
      setLoading(false)
      console.log('Get artist Error=====>', error)
    }
  }

  const submitBookingForm = async () => {
    try {
      setLoading(true)

      const {statusCode, data} = await Api.postRequest('/booking', {
        ...formData,
        date: dayjs(selectedDate).format('YYYY-MM-DD'),
        country: contryState.country,
        state: contryState.state,
        artist_id: parseInt(match.params.id),
      })

      const {message, isOk} = JSON.parse(data)
      setLoading(false)
      if (statusCode === 200 && isOk) {
        setFormData({
          ...formData,
          email: '',
          budget: '',
          capacity: '',
          state: '',
          country: '',
        })
        toast.success(message)
      }
      if (statusCode === 400 || statusCode === 500 || !isOk) {
        toast.error(message)
        return
      }
    } catch (error) {
      setLoading(false)
      console.log('Submit Form Error')
    }
  }

  const handleEmailInput = e => {
    setFormData({...formData, email: e.target.value})
  }
  const handCapacityInput = e => {
    setFormData({...formData, capacity: e.target.value})
  }
  const handleBudgetInput = e => {
    setFormData({...formData, budget: e.target.value})
  }

  const emailValidate = () => {
    const validateStr = validateEmailValue(formData?.email)
    if (validateStr === '') {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
    setEmailError(validateStr)
  }

  const budgetValidate = () => {
    if (formData?.budget === '') {
      setButtonDisabled(true)
      setBudgetError('Enter Valid Budget')
    } else {
      setButtonDisabled(false)
    }
  }

  const capacityValidate = () => {}

  const loaderStart = () => {
    setLoading(true)
  }

  const ArtistDetails = () => {
    return (
      <Box style={{padding: 10}} md={4}>
        <TextElement
          font="regular"
          fontType="h6"
          className={classes.musicTitle}
        >
          {artistDetail?.name}
        </TextElement>
        <TextElement
          font="regular"
          fontType="h6"
          textStyle={{color: colors.lightGrey}}
          className={classes.musicTitle}
        >
          {artistDetail?.address}
        </TextElement>
        <TextElement
          font="regular"
          fontType="h6"
          textStyle={{color: colors.lightGrey}}
          className={classes.musicTitle}
        >
          {artistDetail?.mobile_no}
        </TextElement>
      </Box>
    )
  }
  return loading ? (
    <Loader isLoading={loading} />
  ) : (
    <Box className={classes.mainContainer}>
      <Grid xs={12} sm={6}>
        <img
          src={artistDetail?.profile_pic}
          style={{
            maxHeight: '30rem',
            maxWidth: '100%',
            marginBottom: '20px',
          }}
        />
      </Grid>

      <Grid>
        <TextElement font="bold" fontType="h1" className={classes.musicTitle}>
          {artistDetail?.stage_name}
        </TextElement>
        <Grid style={{marginTop: '4%'}}>
          <TextElement font="bold" fontType="h3" className={classes.musicTitle}>
            {'TERRITORIES OF REPRESENTATION'}
          </TextElement>
          <TextElement font="bold" fontType="h5" className={classes.musicTitle}>
            {artistDetail?.terriotary_of_representation}
          </TextElement>
        </Grid>
        <Grid
          style={{
            marginTop: '2%',
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
          }}
          md={8}
        >
          <ArtistDetails />
        </Grid>
        <Box
          style={{
            borderTop: '2px solid #4d4d4d',
            marginTop: '60px',
            marginBottom: '30px',
          }}
        ></Box>
        <Grid md={6}>
          <TextElement font="bold" fontType="h3" className={classes.musicTitle}>
            {'BOOK THIS ARTIST'}
          </TextElement>
          <TextElement font="bold" fontType="h5" className={classes.musicTitle}>
            {
              'Outside of North America, contact the agent(s) listed above.In North America, contact your territorial agent below.'
            }
          </TextElement>
        </Grid>
        <Grid
          container
          md={8}
          sm={12}
          direction="row"
          xs={12}
          style={{marginTop: '30px'}}
        >
          <Grid
            container
            //   md={8}
            direction="row"
            alignItems="center"
            spacing={2}
            md={12}
            sm={12}
            xs={12}
            style={{justifyContent: 'space-between', margin: 0}}
          >
            <StateContryDropDown
              contryState={contryState}
              setContryState={setContryState}
            />
          </Grid>
          <Grid container direction="row" xs={12} md={12}>
            <Grid
              container
              spacing={0}
              direction="row"
              xs={12}
              md={6}
              justifyContent="space-between"
            >
              <Grid item md={6} xs={12}>
                <FormControl className={classes.formContainer}>
                  <Input
                    value={formData.email}
                    type="email"
                    placeholder="Enter Your Email"
                    className={classes.emailInput}
                    onChange={handleEmailInput}
                    onBlur={emailValidate}
                    errorMessage={<ErrorText errorMessage={emailError} />}
                    error={emailError === '' ? false : true}
                  />
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl className={classes.formContainer}>
                  <Input
                    value={formData.budget}
                    type="number"
                    placeholder="Approx Budget"
                    className={classes.emailInput}
                    onChange={handleBudgetInput}
                    onBlur={budgetValidate}
                    errorMessage={<ErrorText errorMessage={budgetError} />}
                    error={budgetError === '' ? false : true}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={0} direction="row" md={6} xs={12}>
              <Grid item md={6} xs={12}>
                <FormControl className={classes.formContainer}>
                  <Input
                    value={formData.capacity}
                    type="number"
                    placeholder="Capacity"
                    className={classes.emailInput}
                    onChange={handCapacityInput}
                  />
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                <MuiThemeProvider theme={datePickertheme}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      value={selectedDate}
                      onChange={handleDateChange}
                      className={classes.dates}
                      minDate={new Date()}
                      InputProps={{className: classes.datePicker}}
                      placeholder="MM/DD/YYYY"
                      format="dd/MM/yyyy"
                    />
                  </MuiPickersUtilsProvider>
                </MuiThemeProvider>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid md={4} xs={12}>
          <ButtonContainer
            disabled={buttonDisabled}
            title="Submit"
            className={classes.submitButton}
            onClick={submitBookingForm}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

const useStyles = makeStyles(theme => ({
  mainContainer: {
    //display: "flex",
    //marginTop: "1%",
    padding: '2% 5%',
  },
  musicTitle: {
    color: colors.white,
  },
  dropdownStyle: {
    backgroundColor: '#151515',
    color: colors.white,
    padding: '0 10px 0 10px',
    // marginTop: "55px",
  },
  select: {
    backgroundColor: '#151515',
    color: colors.white,
    outline: 'none',
  },
  dropdownIcon: {
    color: colors.white,
    justifyContent: 'center',
    alignSelf: 'center',
    textDecoration: 'none',
  },
  formContainer: {
    width: '100%',
    margin: '10px',
    textDecoration: 'none',
    display: 'flex',
  },
  dropdownItem: {
    borderBottom: '1px solid #4d4d4d',
  },
  formContainer: {
    width: props =>
      props.isLessThenSm ? '100%' : props.isLessThenMd ? '95%' : '95%',
  },
  emailInput: {
    backgroundColor: '#151515',
    padding: '10px 0px 10px 20px',
    color: colors.white,
    marginTop: '10px',
    borderRadius: '3px',
    //width: props => props.isLessThenSm  ? "100%" : props.isLessThenMd ? "85%" : "90%", //dynamic width: ;
    //alignSelf: "center",
  },
  dates: {
    backgroundColor: '#151515',
    padding: '10px 0px',
    width: props =>
      props.isLessThenSm
        ? '100%'
        : props.isLessThenMd
        ? '95%'
        : props.isBetweenLgAndXl
        ? '95%'
        : '95%',
    color: colors.white,
    marginTop: '10px',
    borderRadius: '3px',

    //width: props => props.isLessThenSm  ? "100%" : props.isLessThenMd ? "85%" : "90%", //dynamic width: ;
    //alignSelf: "center",
  },
  datePicker: {
    color: colors.white,
    paddingLeft: '20px',
  },
  submitButton: {
    backgroundColor: '#151515',
    marginTop: '20px',
    padding: '10px 0px',
    color: colors.white,
    //alignSelf: "center",
    width: props =>
      props.isLessThenSm ? '100%' : props.isLessThenMd ? '98%' : '98%', //dynamic width: ;
  },
}))

export default MusicDetail
