import React from "react";
import s from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import Image from "mui-image";
import { Button } from "@mui/material";
import { setView } from "../../store/viewSlice";
export const Home = () => {
  const userName = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  return (
    <div className={s.home}>
      {!userName ? (
        <Typography variant="h4" align="center" className={s.heading}>
          Сайт для просмотра снимков поверхности Земли
        </Typography>
      ) : (
        <Typography variant="h4" align="left" className={s.heading}>
          Вы авторизовались !
        </Typography>
      )}
      <div className={s.imgWrapper}>
        <Image
          src={"/main/Rectangle 4.png"}
          width={712}
          height={513}
          sx={{ display: { sm: "none", lg: "inline" } }}
          duration={0}
        />
      </div>
      <Button onClick={() => dispatch(setView("carousel"))} variant="contained">
        Просмотреть
      </Button>
    </div>
  );
};
