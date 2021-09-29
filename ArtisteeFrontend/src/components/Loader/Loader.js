import { Box, createTheme, Grid, makeStyles, useMediaQuery } from "@material-ui/core";
import React from "react";
import HashLoader from "react-spinners/HashLoader";
const theme = createTheme();
function Loader({ isLoading }) {
  const isLessThenSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isLessThenMd = useMediaQuery(theme.breakpoints.down("md"));
  const isBetweenLgAndMd = useMediaQuery(theme.breakpoints.between("lg", "md"));
  const styleProps = {
    isLessThenSm,
    isLessThenMd,
    isBetweenLgAndMd,
  };
  const classes = useStyles(styleProps);
  return (
    <Box className={classes.mainContainer}>
      <Grid container justify="center">
        <HashLoader color={"#ffffff"} loading={isLoading} size={100} />
      </Grid>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: "50px",
    height: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
export default Loader;
