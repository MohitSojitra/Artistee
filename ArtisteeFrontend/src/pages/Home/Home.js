import { Box, makeStyles } from "@material-ui/core";
import React from "react";

import ButtonContainer from "../../components/ButtonContainer";
import { useHistory } from "react-router-dom";
import { TextElement } from "../../components/TextElement";
import colors from "../../Theme/ColorPalette";

function Home() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.innerContainer}>
        <Box className={classes.cardTextContainer}>
          <TextElement font='bold' fontType='h2' className={classes.cardTitle}>
            {"Welcome to Macron!"}
          </TextElement>
          <TextElement
            font='semiBold'
            fontType='h5'
            className={classes.cardSubTitle}
          >
            {"Thanks for signing up!"}
          </TextElement>
          <TextElement
            font='semiBold'
            fontType='h5'
            className={classes.cardSubTitle}
          >
            {" We’re happy to see you here"}
          </TextElement>
        </Box>
        <ButtonContainer
          customButtonStyle={{ marginTop: "32px" }}
          onClick={() => history.push("/dashboard")}
          title={"Let's Start"}
        />
      </Box>
    </Box>
  );
}

const useStyles = makeStyles({
  mainContainer: {
    display: "flex",
    justifyContent: "center",
  },
  innerContainer: {
    padding: "4%",
    textAlign: "center",
    backgroundColor: colors.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "112px",
    borderRadius: "20px",
    boxShadow: "0px 12px 60px rgba(0, 0, 0, 0.02)",
  },
  logo: {
    width: "224px",
    height: "32px",
  },
  cardTextContainer: {
    marginTop: "32px",
  },
  cardTitle: {
    color: colors.darkBlue,
  },
  cardSubTitle: {
    color: colors.lightGrey,
  },
});

export default Home;
