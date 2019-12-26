import React, { useState } from "react";
import classnames from "classnames";
import { createUseStyles } from "react-jss";
import Menu from "../components/Menu";
import BodyPage from "./BodyPage";
import { CELLSTATES } from "../utils/constants";

let useStyles = createUseStyles(theme => ({
  container: {
    background: theme.colorPrimary,
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "row"
  },
  leftPannelContainer: {
    width: theme.sizes.menuWidth,
    marginLeft: `-${theme.sizes.menuWidth}`,
    transition: "margin-left 0.3s"
  },
  leftPannelContainerOpen: {
    marginLeft: 0
  },
  bodyContainer: {
    flex: "1"
  }
}));

function generateEcosystem(size, density) {
  return Array.from({ length: size * size }, () =>
    Math.floor(Math.random() * 100) >= density
      ? CELLSTATES.DEAD
      : CELLSTATES.ALIVE
  );
}

function MainPage() {
  const classes = useStyles();
  const [menuOpened, setMenuOpened] = useState(true);
  return (
    <div className={classes.container}>
      <div
        className={classnames(classes.leftPannelContainer, {
          [classes.leftPannelContainerOpen]: menuOpened
        })}
      >
        <Menu />
      </div>
      <div
        className={classes.bodyContainer}
        onClick={() => {
          setMenuOpened(!menuOpened);
        }}
      >
        <BodyPage
          initState={{
            cells: generateEcosystem(20, 50),
            size: 20
          }}
        />
      </div>
    </div>
  );
}

export default MainPage;
