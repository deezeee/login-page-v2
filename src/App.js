import { useRef, useState } from "react";

import InputText from "./components/input_text/InputText";
import { ReactComponent as EyeIcon } from "./assets/icons/eye.svg";
import { ReactComponent as CheckedIcon } from "./assets/icons/checkbox-checked.svg";
import { ReactComponent as UnCheckedIcon } from "./assets/icons/checkbox-blank.svg";
import Button from "./components/button/Button";

import { validateEmail } from "../src/utils/common";

import "./App.css";

function App() {
  const checkErrorInputEmail = (val) => {
    if (val.trim().length === 0) return "Bắt buộc!";
    else if (validateEmail(val.trim()) === false) return "Email sai dạng";
    return "";
  };

  const checkErrorInputPassword = (val) => {
    if (val.trim().length === 0) return "Bắt buộc!";
    return "";
  };

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isHoverTogglePassword, setIsHoverTogglePassword] = useState("");
  const [isRememberAccount, setIsRememberAccount] = useState(false);

  const handleRememberAccount = () => {
    setIsRememberAccount(!isRememberAccount);
  };

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setIsShowPassword(!isShowPassword);
  };

  const isInputBothEmailAndPassword = () => {
    return email.trim().length !== 0 && password.trim().length !== 0;
  };

  const isAvailableForSubmit = () => {
    if (
      isInputBothEmailAndPassword() === false ||
      validateEmail(email.trim()) === false
    )
      return false;
    return true;
  };

  const handleFocusPassword = () => {
    passwordRef.current.focus();
  };

  return (
    <div className="App">
      <div className="overlay">
        <form className="login-container">
          <div className="login-title">Đăng nhập</div>
          <div className="login-register">
            <span>Chưa có tài khoản?</span>
            <a href="blank" className="link green">
              Đăng kí tại đây
            </a>
          </div>
          <InputText
            className="email"
            type="text"
            label="Email"
            placeholder="Nhập email"
            handleError={checkErrorInputEmail}
            ref={emailRef}
            handleInputChanging={(e) => setEmail(e.target.value)}
          />
          <div className="password-wrapper">
            <InputText
              className={`password${isHoverTogglePassword ? " hovered" : ""}`}
              type={isShowPassword ? "text" : "password"}
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              ref={passwordRef}
              handleInputChanging={(e) => {
                setPassword(e.target.value);
              }}
              handleError={checkErrorInputPassword}
            />
            <button
              className="toggle-password"
              onClick={(e) => {
                handleTogglePassword(e);
                handleFocusPassword();
              }}
              onMouseEnter={() => setIsHoverTogglePassword(true)}
              onMouseLeave={() => setIsHoverTogglePassword(false)}
            >
              <EyeIcon
                className={`${isShowPassword ? "green" : "grey"} icon`}
              />
            </button>
          </div>
          <div className="login-more">
            <div className="login-remember" onClick={handleRememberAccount}>
              <div className="remember-button">
                {isRememberAccount ? (
                  <CheckedIcon className="icon green" />
                ) : (
                  <UnCheckedIcon className="icon grey" />
                )}
              </div>
              <span>Ghi nhớ tài khoản của tôi</span>
            </div>
            <div className="forgot-password">
              <a className="link green" href="blank">
                Quên mật khẩu?
              </a>
            </div>
          </div>

          <Button
            type="submit"
            className={`big ${
              isAvailableForSubmit() ? "enabled" : "disabled"
            } uppercase`}
            buttonName="Đăng Nhập"
            handleClick={(e) => {
              e.preventDefault();
              if (isAvailableForSubmit() === true)
                console.log({ email: email, password: password });
            }}
          />
        </form>
      </div>
    </div>
  );
}

export default App;
