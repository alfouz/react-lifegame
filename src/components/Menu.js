import React from "react";
import { createUseStyles } from "react-jss";
import texts from "../theme/texts";

let useStyles = createUseStyles(theme => ({
  container: {
    background: theme.colorSecondary,
    height: "100%",
    color: theme.colorTextLight,
    display: "flex",
    flexDirection: "column"
  },
  title: {
    marginTop: theme.spacing.XL,
    textAlign: "center"
  },
  body: {
    flex: 1,
    textAlign: "center"
  }
}));

function Menu() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{texts.title}</h2>
      <div className={classes.body}>{texts.error_no_options}</div>
    </div>
  );
}

export default Menu;
