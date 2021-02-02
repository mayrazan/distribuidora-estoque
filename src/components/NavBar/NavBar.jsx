import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import { useState } from "react";
import TabPanel from "@material-ui/lab/TabPanel";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavBar({ children, page }) {
  const classes = useStyles();
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <TabContext value={value}>
        <AppBar position="static">
          <TabList onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Home" value={page}  >
              <Link href="/home"></Link>
            </Tab>

            <Tab label="Contato" value={page} href="/contact" />
            <Tab label="Logout" value="3" />
          </TabList>
        </AppBar>

        <TabPanel value={page}></TabPanel>
        <TabPanel value={page}>{children}</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </div>
  );
}
