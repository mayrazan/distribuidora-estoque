import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  container: {
    position: "relative",
    bottom: 250,
    right: 70,
  },
}));

export default function SelectCategory({ children, value, setValue }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="filled-age-native-simple">Categoria</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          label="Categoria"
          autoWidth
        >
          {children}
        </Select>
      </FormControl>
    </div>
  );
}
