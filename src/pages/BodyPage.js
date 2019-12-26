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

function getNeighbours(index, ecosystem, size) {
  let neighbours = 0;
  //West
  if (index > 0 && ecosystem[index - 1] === CELLSTATES.ALIVE) {
    neighbours += 1;
  }
  //EAST
  if (index < ecosystem.length && ecosystem[index + 1] === CELLSTATES.ALIVE) {
    neighbours += 1;
  }
  //SOUTH
  if (
    index <= ecosystem.length - size &&
    ecosystem[index + size] === CELLSTATES.ALIVE
  ) {
    neighbours += 1;
  }
  //SOUTHWEST
  if (
    index <= ecosystem.length - size + 1 &&
    ecosystem[index + size - 1] === CELLSTATES.ALIVE
  ) {
    neighbours += 1;
  }
  //SOUTHEAST
  if (
    index <= ecosystem.length - size - 1 &&
    ecosystem[index + size + 1] === CELLSTATES.ALIVE
  ) {
    neighbours += 1;
  }
  //NORTH
  if (index >= size && ecosystem[index - size] === CELLSTATES.ALIVE) {
    neighbours += 1;
  }
  //NORTHWEST
  if (index >= size + 1 && ecosystem[index - size - 1] === CELLSTATES.ALIVE) {
    neighbours += 1;
  }
  //NORTHEAST
  if (index >= size - 1 && ecosystem[index - size + 1] === CELLSTATES.ALIVE) {
    neighbours += 1;
  }
  return neighbours;
}

function getState(cell, neighbours) {
  if (cell === CELLSTATES.ALIVE) {
    switch (neighbours) {
      case 0:
      case 1:
        return CELLSTATES.DEAD;
      case 2:
      case 3:
        return CELLSTATES.ALIVE;
      default:
        return CELLSTATES.DEAD;
    }
  }
  switch (neighbours) {
    case 3:
      return CELLSTATES.ALIVE;
    default:
      return CELLSTATES.DEAD;
  }
}
function BodyPage({ initState, active }) {
  const classes = useStyles();
  const [ecosystem, setEcosystem] = useState(initState.cells);
  const nextStep = useCallback(() => {
    setEcosystem(
      ecosystem.map((cell, index) =>
        getState(cell, getNeighbours(index, ecosystem, initState.size))
      )
    );
  }, [ecosystem, setEcosystem, initState]);

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
    const intervalId = setInterval(nextStep, 1000);
    return () => clearInterval(intervalId);
  }, [nextStep]);

  return <div className={classes.container}>{createTable()}</div>;
}

export default BodyPage;
