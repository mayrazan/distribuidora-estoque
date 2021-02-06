import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { getDataApi } from "../../services/getDataApi";
import { alertMessage } from "../../utils/messages";
import InputTextField from "../InputTextField";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alerts: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  link: {
    textDecoration: "none",
    position: "relative",
    left: 300,
  },
}));

export default function LoginForm() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMessageVisible, setMessageVisible] = useState(false);
  const history = useHistory();
  const [form, setForm] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getDataApi("users");
      setForm(response);
    })();
  }, []);

  function onSubmit(event) {
    event.preventDefault();
    redirectToHome();
  }

  function validateAccount() {
    const response = form.filter((field) => {
      return field.email === email && field.password === password;
    });

    if (response.length > 0) {
      const type = response.map((el) => {
        return el.type;
      });
      localStorage.setItem("token", JSON.stringify(type));
    } else {
      localStorage.setItem("token", JSON.stringify(""));
    }

    return response;
  }

  function redirectToHome() {
    if (validateAccount().length > 0) {
      setMessageVisible(false);

      const isLogged = JSON.parse(localStorage.getItem("token"));

      if (isLogged[0] === "user") {
        history.push("/home");
      } else {
        history.push("/admin-home");
      }

      window.location.reload();
    } else {
      setMessageVisible(true);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <form className={classes.form}>
          <InputTextField
            label="Email"
            name="email"
            autoFocus
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <InputTextField
            name="password"
            label="Senha"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup" variant="body2" className={classes.link}>
                {"Cadastre-se"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

      {isMessageVisible ? alertMessage(classes.alerts, 1) : ""}
    </Container>
  );
}
