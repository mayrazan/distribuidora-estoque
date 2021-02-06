import TextField from "@material-ui/core/TextField";

export default function InputTextField({ value, onChange, label, name, type }) {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id={name}
      label={label}
      name={name}
      autoFocus
      value={value}
      onChange={onChange}
      type={type}
    />
  );
}
