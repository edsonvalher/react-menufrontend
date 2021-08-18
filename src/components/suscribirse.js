import { useState } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";
import RegistrarseForm from "./registrarse";
import DireccionForm from "./direccion/Direccion";

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}






const SuscribirmeForm = () => {

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
            flexGrow: 1,
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));


    const [Registro, setRegistro] = useState({})

    const crearNegocio = (registrarse) => {
        setRegistro(registrarse)
        //setValue(1)
    }


    //const [value, setValue] = useState(2);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const classes = useStyles();
    const [value, setValue] = useState(0);


    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"

                >
                    <Tab label="Datos del negocio" {...a11yProps(0)} />
                    <Tab label="Direccion(es)" {...a11yProps(1)} />

                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Box display="flex" flexDirection="row" p={1} m={1}>
                    <Box p={1} >
                        <RegistrarseForm crearNegocio={crearNegocio} />
                    </Box>
                    <Box p={1} >

                    </Box>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DireccionForm negocio={Registro} />
            </TabPanel>

        </div>
    );
}

export default SuscribirmeForm;