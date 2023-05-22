import React from "react";
import s from "./Header.module.css";
import Image from "mui-image";
import { useSelector } from "react-redux";
import { HeaderBtn } from "./HeaderBtn";
import { Button } from "@mui/material";
import Cookies from "js-cookie";
export const Header = () => {
  const userName = useSelector((state) => state.user.name);
  const handleLogout = () => {
    Cookies.remove("session_id");
    window.location.reload();
  };
  return (
    <div className={s.header}>
      <div className={s.flexContainer}>
        <div className={s.imgWrapper}>
          <Image src={"/Rectangle 6.png"} className={s.logoImg} duration={0} />
        </div>
        <div className={s.btnWrapper}>
          <HeaderBtn text={"Главная"} view={"home"} />
          {userName ? (
            <>
              <div className={s.profileWrapper}>
                <div className={s.imgWrapper}>
                  <Image src={"/main/avatar.png"} duration={0} />
                </div>
                <h5>{userName}</h5>
              </div>
              <Button
                onClick={handleLogout}
                className={s.btnHeader}
                variant="contained"
                sx={{
                  minWidth: "154px", // Minimum width
                  paddingLeft: "16px", // Set left padding here
                  paddingRight: "16px", // Set right padding here
                }}
              >
                Выйти
              </Button>
            </>
          ) : (
            <>
              <HeaderBtn text={"Регистрация"} view={"register"} />
              <HeaderBtn text={"Войти"} view={"login"} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
