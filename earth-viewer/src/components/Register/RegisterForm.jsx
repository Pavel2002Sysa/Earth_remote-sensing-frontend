import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import s from "../Login/Login.module.css";
import { LoadingButton } from "@mui/lab";
import { Link } from "@mui/material";
import { djangoApi } from "../../api/djangoApi";
import { setView } from "../../store/viewSlice";
import { setName } from "../../store/userSlice";
import Cookies from "js-cookie";
export const RegisterForm = () => {
  const [formValues, setFormValues] = useState({});
  const [loadBtn, setLoadBtn] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadBtn(true);
    try {
      const response = await djangoApi.post("/add_user/", formValues);
      console.log(
        "🚀 ~ file: RegisterForm.jsx:21 ~ handleSubmit ~ response:",
        response
      );
      setLoadBtn(false);
      dispatch(setName(formValues.username));
      dispatch(setView("home"));
    } catch (e) {
      console.error(e);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const data = { ...formValues };
    setFormValues({ ...data, [name]: value });
  };
  return (
    <div className={s.loginContainer}>
      <Typography variant="h4" align="left">
        Регистрация
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name={"username"}
          label="Логин"
          variant="outlined"
          onChange={(e) => handleChange(e)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          name="email"
          label="E-mail"
          variant="outlined"
          onChange={(e) => handleChange(e)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          name={"password"}
          label="Пароль"
          variant="outlined"
          type="password"
          onChange={(e) => handleChange(e)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          name="phone"
          label="Телефон"
          variant="outlined"
          onChange={(e) => handleChange(e)}
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
