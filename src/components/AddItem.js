import React, { useContext } from "react";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { green } from "@material-ui/core/colors";
import { IconButton } from "@material-ui/core";
import { store } from "../store/store.js";

export default function AddItem(props) {
  const { state, dispatch } = useContext(store);

  const handleOnClick = (e) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: props.id,
      },
    });
  };

  return (
    <div>
      <IconButton aria-label="add item" onClick={handleOnClick}>
        <AddCircleOutlineRoundedIcon style={{ color: green[500] }} />
      </IconButton>
    </div>
  );
}
