import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import s from "./Login.module.css";
import { LoadingButton } from "@mui/lab";
import { Link } from "@mui/material";
import { djangoApi } from "../../api/djangoApi";
import { setName } from "../../store/userSlice";
import Cookie from "js-cookie";

import axios from "axios";
import { setView } from "../../store/viewSlice";
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loadBtn, setLoadBtn] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoadBtn(true);
      // Perform your authentication logic here
      const body = {
        username,
        password,
      };
      const response = await djangoApi.post("/login/", body);
      if (response.status === 200) {
        dispatch(setName(username));
        const sessionId = response.data.session_id;
        Cookie.set("session_id", sessionId, {
          sameSite: true,
          secure: false,
        });
        dispatch(setView("home"));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={s.loginContainer}>
      <Typography variant="h4" align="left">
        Войти
      </Typography>
      <Typography align="left" className={s.registerTip}>
        Новый пользователь?{" "}
        <Link onClick={() => dispatch(setView("register"))}>
          Зарегистрироваться
        </Link>
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Логин"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Пароль"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <LoadingButton
          loading={loadBtn}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Вход в систему
        </LoadingButton>
      </form>
    </div>
  );
};

export default LoginForm;
