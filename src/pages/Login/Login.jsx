import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/apiCalls";
import { setMessage } from "../../redux/uxSlice";
import style from "./login.module.scss";
const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string().min(2).max(50).required(),
  password: Joi.string().min(5).max(1024).required(),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, isFetching } = useSelector((state) => state.user);
  const [input, setInput] = useState({});

  const handleInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();

    const { error: joiError } = schema.validate(input);
    if (joiError) {
      dispatch(
        setMessage({
          type: "error",
          text: joiError.details?.[0]?.message?.toString(),
        })
      );
    } else {
      login(dispatch, input);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]); //eslint-disable-line

  return (
    <div className={style.Container}>
      <div className={style.Wrapper}>
        <h1>SIGN IN</h1>
        <form action="">
          <div className={style.InputContainer}>
            <input
              type="text"
              placeholder="username"
              name="username"
              onChange={handleInput}
            />
            <input
              name="password"
              type="password"
              placeholder="password"
              onChange={handleInput}
            />
            <a href="register">Create an account</a>
          </div>
          <div className={style.LoginButton}>
            <button onClick={handleClick} disabled={isFetching}>
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
