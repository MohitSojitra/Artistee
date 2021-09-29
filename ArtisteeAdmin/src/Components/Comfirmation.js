import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from "@mui/material";
import React from "react";

import Draggable from "react-draggable";
import { TextElement } from "./TextElement";

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function ComfirmationDailog({ description, onOk, onCancel, open }) {
  return (
    <Dialog open={open} onClose={onCancel} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        <TextElement font="bold" fontType="h2" textStyle={{ textAlign: "left" }}>
          Please Comfirm
        </TextElement>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onCancel} color="primary">
          <TextElement font="bold" fontType="h6" textStyle={{ textAlign: "left" }}>
            No
          </TextElement>
        </Button>
        <Button onClick={onOk} color="primary">
          <TextElement font="bold" fontType="h6" textStyle={{ textAlign: "left" }}>
            Yes
          </TextElement>
        </Button>
      </DialogActions>
    </Dialog>
  );
}
