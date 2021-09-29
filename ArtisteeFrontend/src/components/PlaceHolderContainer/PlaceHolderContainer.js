import { Box, makeStyles } from "@material-ui/core";
import React from "react";

const PlaceHolderContainer = ({ children }) => {
  const classes = usePlaceholderStyles();
  return <Box className={classes.placeholder}>{children}</Box>;
};

const usePlaceholderStyles = makeStyles((theme) => ({
  placeholder: {
    color: "#a6a6a6",
  },
}));
export default PlaceHolderContainer;
