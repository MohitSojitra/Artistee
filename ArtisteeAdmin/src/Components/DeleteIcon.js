import React, { memo, useCallback } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ComfirmationDailog from "./Comfirmation";

function DeleteIcon({ onClick, styles }) {
  const [open, setOpen] = React.useState(false);
  const _handleClick = useCallback(() => {
    setOpen(false);
    onClick();
  }, [onClick]);
  const _handleDilog = () => {
    if (typeof onClick === "function") {
      setOpen(true);
    }
  };
  return (
    <>
      <DeleteForeverIcon style={{ cursor: "pointer", ...styles }} onClick={_handleDilog} />
      <ComfirmationDailog description={"Are You sure to Delete This ?"} onOk={_handleClick} onCancel={() => setOpen(false)} open={open} />
    </>
  );
}

export default memo(DeleteIcon);
