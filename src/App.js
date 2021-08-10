import { Fragment, useState } from "react";
import RegistrarseForm from "./components/registrarse";
import Direccion from "./components/direccion/Direccion";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Box } from "@material-ui/core";

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";



function App() {
  const theme = createTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });



  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 2,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  const classes = useStyles();


  const crearNegocio = (registrarse) => {
    console.log(registrarse)

  }



  //

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box width="100%" component="span"
          color="text.primary"
          textAlign="center"
        >

          <h1>REGISTRARSE</h1>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="flex-start"
            alignItems="stretch"

          >
            <Grid item xs={6}>
              <Box width="100%">
                <Box width="100%" p={1} my={0.5}>

                  <RegistrarseForm crearNegocio={crearNegocio} />

                </Box>
              </Box>

            </Grid>
            <Grid item xs={6}>
              <Box width="100%">
                <Box width="100%" p={1} my={0.5}>

                  Width 100%

                </Box>
                <Box width="100%" p={1} my={0.5}>

                  Width 100%

                </Box>
              </Box>

            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
