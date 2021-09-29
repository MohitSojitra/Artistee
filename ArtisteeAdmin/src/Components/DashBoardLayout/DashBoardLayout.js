import * as React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import {colors} from '../../Theme/ColorPalette'
import {useHistory} from 'react-router-dom'
import BookmarkAddedTwoToneIcon from '@mui/icons-material/BookmarkAddedTwoTone'
import SupervisorAccountTwoToneIcon from '@mui/icons-material/SupervisorAccountTwoTone'
import {logout} from '../../utils/localstorage'
import LogoutIcon from '@mui/icons-material/Logout'
import logo from '../../assets/images/logo.png'
import {TextElement} from '../TextElement'

const drawerWidth = 240

function DashBoardLayout(props) {
  const {window} = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  let history = useHistory()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <Toolbar
        style={{
          padding: '0 2rem',
          background: 'linear-gradient(to right, #014c52 , #0f0c3b)',
        }}
      >
        <TextElement style={{color: colors.white}}>ARTISTEE</TextElement>
      </Toolbar>
      <Divider />
      <List>
        {['artist', 'booking', 'logout'].map((text, index) => (
          <ListItem
            button
            key={text}
            style={{
              background:
                props.title.toLowerCase() === text.toLowerCase()
                  ? colors.primary
                  : '',
              color:
                props.title.toLowerCase() === text.toLowerCase()
                  ? colors.daisyWhite
                  : '',
            }}
            onClick={() => {
              if (text === 'logout') {
                logout()
                history.push('/')
              } else {
                history.push(`/${text}`)
              }
            }}
          >
            <ListItemIcon>
              {index % 2 === 0 ? (
                <>
                  {text === 'logout' ? (
                    <LogoutIcon
                      style={{
                        fill:
                          props.title.toLowerCase() === text.toLowerCase()
                            ? colors.white
                            : '',
                      }}
                    />
                  ) : (
                    <SupervisorAccountTwoToneIcon
                      style={{
                        fill:
                          props.title.toLowerCase() === text.toLowerCase()
                            ? colors.white
                            : '',
                      }}
                    />
                  )}
                </>
              ) : (
                <BookmarkAddedTwoToneIcon
                  style={{
                    fill:
                      props.title.toLowerCase() === text.toLowerCase()
                        ? colors.white
                        : '',
                  }}
                />
              )}
            </ListItemIcon>
            <ListItemText primary={text.toUpperCase()} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: {sm: `calc(100% - ${drawerWidth}px)`},
          ml: {sm: `${drawerWidth}px`},
        }}
        style={{background: colors.primary}}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{mr: 2, display: {sm: 'none'}}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: {xs: 'block', sm: 'none'},
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: {xs: 'none', sm: 'block'},
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{flexGrow: 1, p: 3}}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  )
}

DashBoardLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default DashBoardLayout
