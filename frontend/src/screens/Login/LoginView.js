import "./Login.css";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import validator from "validator";
import FormControl from "@material-ui/core/FormControl";
import Loader from "react-loader-spinner";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { createBrowserHistory } from "history";
let history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "35ch",
      display: "flex",
    },
  },
}));

export const LoginView = (props) => {
  const { value, index } = props;
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [showLoader, setShowLoader] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const classes = useStyles();

  const changeEmail = (event) => {
    if (validator.isEmail(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
    setError(false);
    setEmail(event.target.value);
  };
  const changePass = (event) => {
    setError(false);
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // here axios request for server
    axios
      .post("/api/users/login/", {
        email,
        password,
      })
      .then((response) => {
        sessionStorage.setItem("token", response.data["token"]);
        sessionStorage.setItem("email", response.data["email"]);
        sessionStorage.setItem("isAdmin", response.data["isAdmin"]);
        setShowLoader(true);
        setTimeout(() => {
          history.push("/new-order/");
        }, 1500);
      })
      .catch((error) => {
        setError(true);
      });
  };

  useEffect(() => {}, []);

  return (
    <div className="login" hidden={value !== index}>
      {showLoader ? (
        <div style={{ padding: "100px" }}>
          <Loader
            type="Puff"
            color="#3f51b5"
            height={50}
            width={50}
            timeout={3000}
          />
        </div>
      ) : (
        <form
          className={classes.root}
          onSubmit={handleSubmit}
          autoComplete="off"
          style={{ display: "inline-block" }}
        >
          <FormControl required variant="outlined">
            <InputLabel htmlFor="component-outlined">Email</InputLabel>
            <OutlinedInput
              error={emailError}
              id="component-outlined"
              value={email}
              onChange={changeEmail}
              label="Email"
            />
          </FormControl>
          <FormControl required variant="outlined">
            <InputLabel htmlFor="component-outlined">Password</InputLabel>
            <OutlinedInput
              error={false}
              type="password"
              id="component-outlined"
              value={password}
              onChange={changePass}
              label="Password"
            />
          </FormControl>
          {error && (
            <Typography
              color="error"
              variant="h7"
              gutterBottom
              className="error-msg"
            >
              Invalid Email or Password
            </Typography>
          )}
          <div className="login-btn">
            <Button fullWidth variant="contained" color="primary" type="submit">
              Login
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginView;
