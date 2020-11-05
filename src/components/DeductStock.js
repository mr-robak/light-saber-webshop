import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircleOutlineRoundedIcon from "@material-ui/icons/RemoveCircleOutlineRounded";
import { red } from "@material-ui/core/colors";
import { store } from "../store/store.js";

export default function DeductStock(props) {
  const { dispatch } = useContext(store);

  const handleOnClick = (e) => {
    dispatch({
      type: "DEDUCT_FROM_STOCK",
      payload: props.id,
    });
  };

  return (
    <div>
      <IconButton aria-label="decrease item" onClick={handleOnClick}>
        <RemoveCircleOutlineRoundedIcon style={{ color: red[500] }} />
      </IconButton>
    </div>
  );
}
