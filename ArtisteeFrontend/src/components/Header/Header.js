import React, {useEffect, useState} from 'react'
import {
  Box,
  createTheme,
  Divider,
  makeStyles,
  Typography,
  useMediaQuery,
} from '@material-ui/core'

import {Link} from 'react-router-dom'
import logo from '../../assets/images/Logo_Mockup.jpg'
import colors from '../../Theme/ColorPalette'
import {headerConfig} from '../../utils/headerRouteConfig'
import {TextElement} from '../TextElement'
const theme = createTheme()

const AppHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen)
  }

  const handleLinkClick = () => {
    setMenuOpen(false)
  }
  const styles = {
    container: {
      // position: 'fixed',
      // top: 0,
      // left: 0,
      zIndex: 99,
      height: '9vh',
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',

      flexDirection: 'row',
      justifyContent: 'space-between',

      background: 'linear-gradient(to right, #014c52 , #0f0c3b)',
      //padding: "0 2rem",
      // width: '100%',
      color: 'white',
      // maxWidth: '100%',
      overflowX: 'hidden',

      //   fontFamily:'Lobster',
    },
    logo: {
      margin: '0 auto',
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
      filter: menuOpen ? 'blur(2px)' : null,
      transition: 'filter 0.5s ease',
    },
    menuLink: {
      textDecoration: 'none',
      outline: 'none',
    },
  }

  const isLessThenSm = useMediaQuery(theme.breakpoints.down('sm'))
  const isLessThenMd = useMediaQuery(theme.breakpoints.down('md'))
  const styleProps = {
    isLessThenSm,
    isLessThenMd,
  }

  const classes = useStyles(styleProps)
  //const menu = ["Home", "Contacts", "About"];
  const menu = ['Home', 'About Us', 'Contact Us']
  const menuItems = menu.map((val, index) => {
    return (
      <MenuItem
        key={index}
        delay={`${index * 0.1}s`}
        onClick={() => {
          handleLinkClick()
        }}
      >
        <Link style={styles.menuLink} to={headerConfig(val)}>
          <Typography variant="h3" className={classes.navBarItem} gutterBottom>
            {val}
          </Typography>
        </Link>
        {/* {val} */}
      </MenuItem>
    )
  })

  return (
    <Box>
      <Box style={styles.container}>
        <Box
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            display: 'flex',
          }}
        >
          {/* logo
          text */}
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: colors.white,
              fontWeight: 'bold',
            }}
          >
            <Box style={{padding: ' 2rem', width: '7rem', height: '4rem'}}>
              <TextElement>ARTISTEE</TextElement>
            </Box>
          </Link>
        </Box>

        {/* <Box>Logo</Box> */}
        <MenuButton
          openBar={menuOpen}
          onClick={() => handleMenuClick()}
          IconColor="#ffffff"
        />
      </Box>
      <Menu openBar={menuOpen}>{menuItems}</Menu>
    </Box>
  )
}

const MenuItem = props => {
  const [hover, setHover] = useState(false)
  const handleHover = () => {
    setHover(!hover)
  }

  const styles = {
    container: {
      animation: '1s appear forwards',
      marginTop: '0.8rem',
      animationDelay: props.delay,
    },
    menuItem: {
      // fontFamily: `'Open Sans', sans-serif`,
      fontSize: '1.2rem',
      padding: '1rem 0',
      margin: '0 5%',
      cursor: 'pointer',
      color: hover ? 'gray' : '#111111',
      transition: 'color 0.2s ease-in-out',

      // animation: "0.5s slideIn forwards",
      animationDelay: props.delay,
      textdecoration: 'none',
      outline: 'none',
    },
    line: {
      width: '90%',
      height: '1px',
      background: 'gray',
      margin: '0 auto',
      animation: '0.5s shrink forwards',
      animationDelay: props.delay,
    },
  }
  return (
    <Box style={styles.container}>
      <Box
        style={styles.menuItem}
        onMouseEnter={() => {
          handleHover()
        }}
        onMouseLeave={() => {
          handleHover()
        }}
        onClick={props.onClick}
      >
        {props.children}
      </Box>
      {/* <Box style={styles.line} /> */}
    </Box>
  )
}
/* Menu.jsx */
const Menu = props => {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (props.openBar !== open) {
      setOpen(props.openBar)
    }
  }, [props.openBar])

  const styles = {
    container: {
      position: 'absolute',
      // height: open ? '100%'  : 0,
      width: '100vw',
      display: open ? 'flex' : 'none',
      flexDirection: 'column',
      background: 'linear-gradient(to right, #014c52 , #0f0c3b)',

      opacity: 0.95,
      color: '#fafafa',
      transition: '3s fade-in',
      zIndex: 99,
    },
    menuList: {
      paddingTop: '2.5rem',
    },
  }
  return (
    <Box style={styles.container}>
      <Divider variant="fullWidth" />
      <Box style={styles.menuList}>{props.children}</Box>
    </Box>
  )
}

/* MenuButton.jsx */
const MenuButton = ({openBar, IconColor, onClick}) => {
  const [open, setOpen] = useState(openBar ? openBar : false)
  console.log('Open', open)
  const [color, setColor] = useState(IconColor ? IconColor : 'black')

  useEffect(() => {
    if (openBar !== open) {
      setOpen(openBar)
    }
  }, [openBar])

  const handleClick = () => {
    setOpen(!open)
  }

  const styles = {
    container: {
      height: '32px',
      width: '32px',
      display: 'flex',
      zIndex: 99,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      padding: '4px',
      paddingRight: '2rem',
    },
    line: {
      height: '2px',
      width: '20px',
      background: color,
      transition: 'all 0.2s ease',
    },
    lineTop: {
      transform: open ? 'rotate(45deg)' : 'none',
      transformOrigin: 'top left',
      marginBottom: '5px',
    },
    lineMiddle: {
      opacity: open ? 0 : 1,
      transform: open ? 'translateX(-16px)' : 'none',
    },
    lineBottom: {
      transform: open ? 'translateX(-1px) rotate(-45deg)' : 'none',
      transformOrigin: 'top left',
      marginTop: '5px',
    },
  }
  return (
    <Box
      style={styles.container}
      onClick={
        onClick
          ? onClick
          : () => {
              handleClick()
            }
      }
    >
      <Box style={{...styles.line, ...styles.lineTop}} />
      <Box style={{...styles.line, ...styles.lineMiddle}} />
      <Box style={{...styles.line, ...styles.lineBottom}} />
    </Box>
  )
}

const useStyles = makeStyles(theme => ({
  navBarItem: {
    color: colors.white,
    fontSize: props => {
      if (props.isLessThenSm) {
        return '1rem'
      }
      if (props.isLessThenMd) {
        return '1.2rem'
      }

      return '1.4rem'
    },
  },
}))

function Header(props) {
  return (
    <Box style={{display: 'flex', flexDirection: 'column'}}>
      <AppHeader />
    </Box>
  )
}

export default Header
