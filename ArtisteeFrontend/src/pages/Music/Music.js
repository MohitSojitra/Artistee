import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {
  Box,
  makeStyles,
  Grid,
  CircularProgress,
  Paper,
  useMediaQuery,
  createTheme,
  Typography,
} from '@material-ui/core'
import {TextElement} from '../../components/TextElement'
import MusicBg from '../../assets/images/background.jpeg'
import colors from '../../Theme/ColorPalette'

import useUser from '../../hooks/useUser'
import InfiniteScroll from 'react-infinite-scroller'

import SearchBar from '../../components/SearchBar/SearchBar'
import {searchLetters} from '../../utils/helper'
import {Link} from 'react-router-dom'
import DropDown from '../../components/DropDown/DropDown'
import KeywordContainer from '../../components/KeywordContainer/KeywordContainer'
import {filterType} from '../../utils/config'
import Loader from "../../components/Loader/Loader";
const theme = createTheme()

let timeout = null

function Music() {
  const [gridHeight, setGridHeight] = React.useState(0);
  const [loading, setLoading] = React.useState(false)
  const ref = React.useRef(null)
  const isLessThenSm = useMediaQuery(theme.breakpoints.down('sm'))
  const isLessThenMd = useMediaQuery(theme.breakpoints.down('md'))
  const isBetweenLgAndMd = useMediaQuery(theme.breakpoints.between('lg', 'md'))
  const [filter, setFilter] = useState({
    type: filterType.ALL,
    keyWord: '',
  })
  const scroll = () => {}
  useEffect(() => {
    window.addEventListener('scroll', () => {
      const section = document.getElementById('section')

      let y = 1 + (window.scrollY || window.pageYOffset) / 150
      y = y < 1 ? 1 : y // ensure y is always >= 1 (due to Safari's elastic scroll)
      console.log({sdsdsds: y / (y + 10)})
      //section.style.backgroundColor = 'red'
      // `rgba(0, 0, 0 , ${y / (y + 200)})`
    })
    return window.removeEventListener('scroll', scroll)
  }, [])

  // const onScrollPage = useCallback(() => {
  //   if (
  //     ref &&
  //     ref.current &&
  //     ref.current.clientHeight &&
  //     ref.current.clientHeight !== null
  //   ) {
  //     setGridHeight(ref.current.clientHeight)
  //   } else {
  //     console.log('clientHeight is null')
  //   }
  // }, [])

  console.log('Grid Height ===>', Math.round(gridHeight))

  const styleProps = {
    gridHeight,
    isLessThenSm,
    isLessThenMd,
    isBetweenLgAndMd,
  }

  const classes = useStyles(styleProps)

  const {data, hasMore, loadMore} = useUser(filter.type, filter.keyWord)

  const _handleLoadMore = React.useCallback(() => {
    clearTimeout(timeout)

    // Make a new timeout set to go off in 1000ms (1 second)

    timeout = setTimeout(loadMore, 1000)
  }, [loadMore])


  console.log("data",data)
  return loading ? (
    <Loader isLoading={loading} />
  ) : (
    <section className={classes.mainContainer} id="section">
      <Box className={classes.container}>
        {/* <img style={styles.backgroundImage} src={MusicBg} alt="musicBg" /> */}
        <Box>
          <Box>
            <Box gridRow>
              <Typography
                variant="h2"
                className={classes.appDescription}
                gutterBottom
              >
               UTA Music is home to a diverse, global roster of some of the world’s premier musical talent, from emerging acts to superstars.
              </Typography>
            <Typography
                variant="h3"
                className={classes.appTitle}
                gutterBottom
              >
                Music App
              </Typography>

              <SearchBar />

              <Grid
                container
                md={12}
                sm={12}
                className={classes.genreContainer}
              >
                {/* grid for dropdown */}
                <Grid md={4} xs={12} sm={12}>
                  <DropDown filter={filter} setFilter={setFilter} />
                </Grid>

                {/* grid for alphabet */}
                <Grid
                  className={classes.letterSearch}
                  spacing={0}
                  xs={12}
                  sm={12}
                  md={8}
                >
                  <Box
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                    }}
                  >
                    {searchLetters.map(item => {
                      return (
                        <KeywordContainer
                          keyword={item}
                          filter={filter}
                          setFilter={setFilter}
                        />
                      )
                    })}
                  </Box>
                </Grid>
              </Grid>
              <InfiniteScroll
                pageStart={0}
                loadMore={_handleLoadMore}
                hasMore={hasMore}
                loader={
                  <Box style={styles.loaderContainer}>
                    {' '}
                    <CircularProgress />
                  </Box>
                }
                // useWindow={false}
              >
                <Grid
                  container
                  innerRef={ref}
                  spacing={0}
                  md={12}
                  sm={12}
                  xs={12}
                  //style={{backgroundColor:'red'}}
                >
                  {data.map((item, index) => (
                    <Grid
                      item
                      md={12}
                      lg={3}
                      sm={12}
                      xs={12}
                      className={classes.artistNameContainer}
                    >
                      <Link style={styles.artistInfo} to={`${item.id}`}>
                        <Paper className={classes.paper}>
                          {item.stage_name}
                        </Paper>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </InfiniteScroll>
            </Box>
          </Box>
        </Box>
      </Box>
    </section>
  )
}

export default Music

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    paddingTop: props => {
      if (props.isLessThenSm) {
        return theme.spacing(4)
      }
      if (props.isLessThenMd) {
        return theme.spacing(5)
      }
      return theme.spacing(6)
    },
    paddingBottom: props => {
      if (props.isLessThenSm) {
        return theme.spacing(4)
      }
      if (props.isLessThenMd) {
        return theme.spacing(5)
      }
      return theme.spacing(6)

    } ,
    paddingLeft: props => {
      if (props.isLessThenSm) {
        return theme.spacing(8)
      }
      if (props.isLessThenMd) {
        return theme.spacing(10)
      }
      return theme.spacing(10)
    },
    paddingRight: props => {
      if (props.isLessThenSm) {
        return theme.spacing(8)
      }
      if (props.isLessThenMd) {
        return theme.spacing(10)
      }
      return theme.spacing(10)
    },

    //borderRadius:theme.spacing(5),
    textAlign: 'center',
    fontSize: props => {
      if (props.isLessThenSm) {
        return '1rem'
      }
      if (props.isLessThenMd) {
        return '1.2rem'
      }

      return '1.4rem'
    },

    color: colors.white,
    background: 'linear-gradient(to right, #014c52 , #0f0c3b)',
'&:hover': {

  }
  
},
  mainContainer: {
    width: '100%',
    backgroundSize: 'cover',
    // backgroundPosition: '50%',
    height: '150vh',
    // flexGrow: 1,
    display: 'flex',
    backgroundImage: `url(${MusicBg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  container: {
    // margin: " 0 auto",
    margin: 0,
    width: '96%',
    // height: '100vh',
    alignItems: 'center',
    padding: '0 2rem',
    // alignSelf: 'center',
    paddingTop: '12%',
  },
  appDescription:{
    color: colors.white,
    marginBottom:'5%',
    fontSize: props => {
      if (props.isLessThenSm) {
        return '2rem'
      }
      if (props.isLessThenMd) {
        return '3rem'
      }

      return '3rem'
    },
    
  lineHeight:1.23,
    textTransform:'none',
    maxWidth:props => {
      if (props.isLessThenSm) {
        return '100%'
      }
      if (props.isLessThenMd) {
        return '85%'
      }

      return '65%'
    },
    lineHeight:1.23,
    letterSpacing:.2
  },
  appTitle: {
    color: colors.white,
    fontSize: props => {
      if (props.isLessThenSm) {
        return '1.2rem'
      }
      if (props.isLessThenMd) {
        return '1.5rem'
      }

      return '1.6rem'
    },
  },

  cardTitle: {
    color: colors.white,

    fontSize: '16px',
    lineHeight: '1.38',
    letterSpacing: '.4px',

    textTransform: 'uppercase',

    padding: '0px',
  },

  genreContainer: {
    margin: '15px 0px 25px 0px',
    alignItems: 'center',
  },
  letterSearch: {
    margin: 0,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  artistNameContainer: {
    padding: '15px',
  },
}))

const styles = {
  loaderContainer: {
    justifyContent: 'center',

    width: '100%',
    flexDirection: 'row',
    display: 'flex',
    marginTop: '20px',
  },
  artistInfo: {
    outline: 'none',
    textDecoration: 'none',
  },
}
