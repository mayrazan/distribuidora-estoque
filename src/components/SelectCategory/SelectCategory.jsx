import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
//import { useState } from "react";
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

export default function SelectCategory({ children, value, handleChange }) {
  const classes = useStyles();
  // const [category, setCategory] = useState("");

  // const handleChange = (event) => {
  //   setCategory(event.target.value);
  //   console.log(category);
  // };

  return (
    <div className={classes.container}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="filled-age-native-simple">Categoria</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={value}
          onChange={handleChange}
          label="Categoria"
          autoWidth
        >
          {children}
        </Select>
      </FormControl>
    </div>
  );
}
