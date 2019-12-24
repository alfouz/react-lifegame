import React from "react";
import { createUseStyles } from "react-jss";

let useStyles = createUseStyles(theme => ({
  container: {
    background: theme.colorPrimary
  }
}));

function BodyPage() {
  const classes = useStyles();
  return <div className={classes.container}></div>;
}

export default BodyPage;
