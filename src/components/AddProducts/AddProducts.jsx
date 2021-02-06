import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import { registerForm } from "../../services/getDataApi";
import { alertMessage, successMessage } from "../../utils/messages";
import InputTextField from "../InputTextField";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
}));

export default function AddProducts() {
  const classes = useStyles();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    score: 0,
    image: "",
    like: false,
  });
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [isMessageSuccess, setMessageSuccess] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      await registerForm("products", form);
      setMessageSuccess(true);

      setTimeout(() => window.location.reload(), 400);
    }
  }

  function validateForm() {
    if (
      form.title !== "" &&
      form.description !== "" &&
      form.category !== "" &&
      form.image !== ""
    ) {
      setMessageVisible(false);
      return true;
    } else {
      setMessageVisible(true);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Cadastrar Produtos
        </Typography>

        <form className={classes.form}>
          <InputTextField
            value={form.title}
            onChange={(event) => {
              setForm({ ...form, title: event.target.value });
            }}
            label="Nome do Produto"
            name="title"
          />
          <InputTextField
            value={form.description}
            onChange={(event) => {
              setForm({ ...form, description: event.target.value });
            }}
            label="Descrição do Produto"
            name="description"
          />
          <InputTextField
            value={form.category}
            onChange={(event) => {
              setForm({ ...form, category: event.target.value });
            }}
            label="Categoria do Produto"
            name="category"
          />
          <InputTextField
            value={form.image}
            onChange={(event) => {
              setForm({ ...form, image: event.target.value });
            }}
            label="Link da imagem"
            name="image"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Cadastrar
          </Button>
        </form>
      </div>

      {isMessageVisible ? alertMessage(classes.alerts, 1) : ""}
      {isMessageSuccess ? successMessage(classes.alerts) : ""}
    </Container>
  );
}
