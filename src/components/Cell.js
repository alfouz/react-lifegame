import React from "react";
import classnames from "classnames";
import { createUseStyles } from "react-jss";
import { CELLSTATES } from "../utils/constants";

let useStyles = createUseStyles(theme => ({
  container: {
    background: theme.colorPrimary,
    width: "20px",
    height: "20px",
    border: `1px solid ${theme.colorDelimiter}`
  },
  cell: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    transition: "background 1s"
  },
  cellAlive: {
    background: "red"
  }
}));

function Cell({ value }) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div
        className={classnames(classes.cell, {
          [classes.cellAlive]: value === CELLSTATES.ALIVE
        })}
      ></div>
    </div>
  );
}

export default Cell;
