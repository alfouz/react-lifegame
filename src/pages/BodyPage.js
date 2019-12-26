import React, { useState, useCallback, useEffect } from "react";
import { createUseStyles } from "react-jss";
import Cell from "../components/Cell";
import { CELLSTATES } from "../utils/constants";

let useStyles = createUseStyles(theme => ({
  container: {
    background: theme.colorPrimary,
    width: "100%",
    height: "100%"
  },
  row: {
    display: "flex",
    flexDirection: "row"
  }
}));

function BodyPage({ initState, active }) {
  const classes = useStyles();
  const [ecosystem, setEcosystem] = useState(initState.cells);
  const nextStep = useCallback(() => {
    setEcosystem(
      ecosystem.map(cell =>
        cell === CELLSTATES.ALIVE ? CELLSTATES.DEAD : CELLSTATES.ALIVE
      )
    );
  }, [ecosystem, setEcosystem]);

  const createTable = useCallback(() => {
    const size = initState.size;
    const table = [];
    for (let i = 0; i < ecosystem.length / size; i += 1) {
      const arrayChunk = ecosystem.slice(i * size, (i + 1) * size);
      table[i] = (
        <div className={classes.row} key={`row${i}`}>
          {arrayChunk.map((cell, index) => (
            <Cell value={cell} key={`cell${index}`} />
          ))}
        </div>
      );
    }
    return table;
  }, [ecosystem, classes, initState]);

  useEffect(() => {
    const intervalId = setInterval(nextStep, 10000);
    return () => clearInterval(intervalId);
  }, [nextStep]);

  return <div className={classes.container}>{createTable()}</div>;
}

export default BodyPage;
