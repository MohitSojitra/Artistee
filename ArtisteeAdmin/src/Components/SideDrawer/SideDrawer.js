import * as React from 'react'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import {
  Drawer,
  List,
  Button,
  SwipeableDrawer,
  ListItem,
  Divider,
  Box,
} from '@mui/material'

// const MyEditor = dynamic(() => import("../Editor/Editor"), { ssr: false });

function SideDrawer({toggleDrawer, isDrawerOpen}) {
  const ListOfItem = () => (
    <Box
      sx={{width: '100%'}}
      role="presentation"
      //   onClick={toggleDrawer}
      //   onKeyDown={toggleDrawer}
      style={{width: '100%'}}
    >
      {/* <MyEditor /> */}
    </Box>
  )

  return (
    <Box style={{width: '100%'}}>
      <Drawer
        anchor={'right'}
        open={isDrawerOpen}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
        sx={{
          display: {xs: 'block'},
          '& .MuiDrawer-paper': {boxSizing: 'border-box', width: '50%'},
        }}
      >
        <ListOfItem />
      </Drawer>
    </Box>
  )
}

export default React.memo(SideDrawer)
