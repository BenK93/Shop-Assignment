import "./Register.css";
import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Loader from "react-loader-spinner";
import axios from "axios";
import validator from "validator";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
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

export const RegisterView = (props) => {
  const { value, index } = props;
  const [emailError, setEmailError] = React.useState(false);
  const [showLoader, setShowLoader] = React.useState(false);
  const [validPass, setValidPass] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [role, setRole] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const classes = useStyles();

  const changeEmail = (event) => {
    if (validator.isEmail(email)) {
      setEmailError(false);
      setError(false);
    } else {
      setEmailError(true);
    }
    setEmail(event.target.value);
  };
  const changePass = (event) => {
    event.target.value.length < 8 ? setValidPass(true) : setValidPass(false);
    setPassword(event.target.value);
  };
  const changeName = (event) => {
    setName(event.target.value);
  };
  const changeRole = (event) => {
    event.target.value === "Admin" ? setIsAdmin(true) : setIsAdmin(false);
    setRole(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // here axios request for server
    axios
      .post("/api/users/register/", {
        fullName: name,
        email,
        password,
        isAdmin,
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
    <div className="register" hidden={value !== index}>
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
          className={[classes.root]}
          style={{ display: "inline-block" }}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <TextField
            required
            error={false}
            id="outlined"
            placeholder={"example: Tal Berman"}
            variant="outlined"
            label="Full Name"
            value={name}
            onChange={changeName}
          />
          <TextField
            required
            error={emailError || error}
            id="outlined"
            placeholder={"example@gmail.com"}
            variant="outlined"
            label="Email"
            value={email}
            onChange={changeEmail}
          />
          {error && (
            <Typography color="error" variant="h8" gutterBottom>
              This Email is already in use.
            </Typography>
          )}
          <TextField
            required
            error={validPass}
            placeholder={"Minimum 8 characters long"}
            variant="outlined"
            type="password"
            label="Password"
            id="component-outlined"
            value={password}
            onChange={changePass}
          />
          <FormControl required variant="outlined">
            <InputLabel htmlFor="outlined-age-native-simple">Role</InputLabel>
            <Select
              native
              value={role}
              onChange={changeRole}
              label="Role"
              inputProps={{
                name: "Role",
                id: "outlined-role-native-simple",
              }}
            >
              <option aria-label="None" value="" />
              <option value={10}>Admin</option>
              <option value={20}>Customer</option>
            </Select>
          </FormControl>
          <div className="login-btn">
            <Button fullWidth variant="contained" color="primary" type="submit">
              Register
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegisterView;
