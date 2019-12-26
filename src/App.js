import React from "react";
import "./App.css";
import { ThemeProvider } from "react-jss";
import theme from "./utils/theme";
import MainPage from "./pages/MainPage";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
