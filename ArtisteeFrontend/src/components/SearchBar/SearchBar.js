import { Box, createTheme, Grid, makeStyles, useMediaQuery } from "@material-ui/core";
import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import colors from "../../Theme/ColorPalette";
import { Api } from "../../utils/API";
import { filterType } from "../../utils/config";
import { TextElement } from "../TextElement";
const styles = {
  searchInputContainer: {
    width: "100%",
    position: "relative",
    marginBottom: "13px",
    zIndex: 1,
  },

  dropdownStyle: {
    width: "100%",
    position: "relative",
    zIndex:2333
    // backgroundColor: colors.black,
  },
};
const theme = createTheme()
const SearchBar = () => {
  const [value, setValue] = useState("");

  const [data, setData] = useState([]);

  const getData = async (value) => {
    const { statusCode, data } = await Api.postRequest("/get-artist/1", {
      type: filterType.SEARCH,
      keyWord: value,
    });
    console.log({ data });
    const { result, isOk } = JSON.parse(data);
    if (!isOk) {
      console.log("Something wrong in get result ....");
    }
    console.log({ result });
    setData(result);
  };
  const _handleValueChange = (e) => {
    setValue(e.target.value);
    getData(e.target.value);
  };

  const isLessThenSm = useMediaQuery(theme.breakpoints.down('sm'))
  const isLessThenMd = useMediaQuery(theme.breakpoints.down('md'))
  const styleProps = {
    value,
    isLessThenSm,
    isLessThenMd
  };
  const classes = useStyles(styleProps);
  return (
    <Grid container xs={12} sm={12} style={styles.searchInputContainer}>
      <input
        type="text"
        placeholder="Search Music"
        value={value}
        className={classes.searchField}
        style={{
          ...styles.searchField,
          background: value.length > 0 ? "linear-gradient(to right, #014c52 , #0f0c3b)" : "rgba(128, 128, 128, 0.25)",
          transition: "0.5s ease",
        }}
        aria-label="Search"
        data-focus-visible-added=""
        onChange={_handleValueChange}
      />

      <Box style={styles.dropdownStyle}>
        <Box style={{ position: "absolute", width: "100%" }}>
          {data.length > 0 &&
            data.map((d) => {
              return (
                <Link to={`/${d.id}`} style={{ textDecoration: "none" }}>
                <Box
                className={classes.searchFieldContainer}
                  
                >
                  <Box style={{ borderBottom: "1px solid rgb(128,128,128)" }}>
                    <TextElement textStyle={{ color: "rgb(128,128,128)" }}>{d.stage_name}</TextElement>
                  </Box>
                </Box>
                </Link>
              );
            })}
        </Box>
      </Box>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  searchField: {
    width: "100%",

    backgroundColor: "rgba(128, 128, 128, 0.25)",
    // borderRadius: '5px',

    borderWidth: 0,
    boxSizing: "border-box",
    color: "#ffffff",
    cursor: "text",

    fontSize: props => {
      if (props.isLessThenSm) {
        return '1rem'
      }
      if (props.isLessThenMd) {
        return '1.2rem'
      }

      return '1.4rem'
    },
    fontWeight: 500,
    height: "58px",
    letterSpacing: ".4px",
    lineHeight: 1.43,
    margin: 0,
    outline: 0,
    overflow: "visible",
    padding: "21px 16px",
    textAlign: "left",
    transition: "background .5s",
  },
  
  searchFieldContainer: {
    padding: "10px 20px",
    backgroundColor: "rgb(21,21,21)",
    transition: (props) => (props.value.length > 0 ? "0.5s ease" : ""),
    display: (props) => (props.value.length > 0 ? "block" : "none"),

   cursor:"pointer"
  },
}));


export default memo(SearchBar);
