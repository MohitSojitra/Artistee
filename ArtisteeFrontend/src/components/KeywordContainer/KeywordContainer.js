import {
  createTheme,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
} from '@material-ui/core'
import React, {memo, useState} from 'react'
import colors from '../../Theme/ColorPalette'
import {filterType} from '../../utils/config'
import {TextElement} from '../TextElement'

const theme = createTheme()
function KeywordContainer({children, keyword, setFilter, filter, ...props}) {
  const isLessThenSm = useMediaQuery(theme.breakpoints.down('sm'))
  const isLessThenMd = useMediaQuery(theme.breakpoints.down('md'))
  const isBetweenLgAndMd = useMediaQuery(theme.breakpoints.between('lg', 'md'))
  const styleProps = {
    isLessThenSm,
    isLessThenMd,
    isBetweenLgAndMd,
  }
  const classes = useStyles(styleProps)
  const _handleClick = () => {
    setFilter({
      type: filterType.ALPHABET,
      keyWord: keyword,
    })
  }
  return (
    <Typography
      variant="h3"
      className={classes.searchKeyword}
      gutterBottom
      style={{
        color: filter.keyWord === keyword ? "lightgreen"  :colors.white ,
      }}
      onClick={_handleClick}
    >
      {keyword}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  searchKeyword: {
    margin: '0px 0.4rem',
    overflow: 'hidden',
    //color: "#1b4c51",
    cursor: 'pointer',
    fontSize: props => {
      if (props.isLessThenSm) {
        return '1rem'
      }
      if (props.isLessThenMd) {
        return '1.2rem'
      }

      return '1.4rem'
    },

    lineHeight: '1.38',
    letterSpacing: '.4px',

    textTransform: 'uppercase',

    padding: '0px',
  },
}))

export default memo(KeywordContainer)
