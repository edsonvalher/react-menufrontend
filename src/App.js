import { Fragment, useState } from "react";
import RegistrarseForm from "./components/registrarse";
import DireccionForm from "./components/direccion/Direccion";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Box } from "@material-ui/core";

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";


import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SuscribirmeForm from "./components/suscribirse";

function App() {


  return (
    <Fragment>
      <SuscribirmeForm />
    </Fragment>
  );
}

export default App;
