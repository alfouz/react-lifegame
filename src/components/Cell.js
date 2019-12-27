import React from "react";
import classnames from "classnames";
import { createUseStyles } from "react-jss";
import { CELLSTATES } from "../utils/constants";

let useStyles = createUseStyles(theme => ({
  container: {
    background: theme.colorPrimary,
    width: "20px",
    height: "20px",
    border: `1px solid ${theme.colorDelimiter}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  cell: {
    width: "10%",
    height: "10%",
    borderRadius: "50%",
    transition: props =>
      props.speed
        ? `background ${props.speed}s, width ${props.speed}s, height ${props.speed}s`
        : `background 0.5s, width 0.2s, height 0.2s`
  },
  cellAlive: {
    background: "red",
    width: "100%",
    height: "100%"
  }
}));

function Cell({ value, speed }) {
  const classes = useStyles({ speed: speed });
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
