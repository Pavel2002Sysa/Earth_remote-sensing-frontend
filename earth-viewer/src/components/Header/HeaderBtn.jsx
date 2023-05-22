import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import s from "./Header.module.css";
import { setView } from "../../store/viewSlice";

export const HeaderBtn = ({ text, view }) => {
  const dispatch = useDispatch();
  return (
    <Button
      className={s.btnHeader}
      onClick={() => dispatch(setView(view))}
      variant="contained"
      sx={{
        minWidth: "154px", // Minimum width
        paddingLeft: "16px", // Set left padding here
        paddingRight: "16px", // Set right padding here
      }}
    >
      {text}
    </Button>
  );
};
