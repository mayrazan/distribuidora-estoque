import { Alert, AlertTitle } from "@material-ui/lab";

export function alertMessage(className, tipo) {
  return (
    <div className={className}>
      <Alert severity="error">
        <AlertTitle>Erro</AlertTitle>
        {tipo === 1 ? "Preencha todos os campos!" : "Email já cadastrado!"}
      </Alert>
    </div>
  );
}

export function successMessage(className) {
  return (
    <div className={className}>
      <Alert severity="success">
        <AlertTitle>Sucesso</AlertTitle>
        Cadastro realizado com sucesso!
      </Alert>
    </div>
  );
}
