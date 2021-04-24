import { useState } from 'react';
import { Box, Button, Container, Grid } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import PasswordGenerator from './components/PasswordGenerator';
import PasswordGeneratorSettings from './components/PasswordGeneratorSettings';

import {
    DEFAULT_PASSWORD_LENGTH,
    DEFAULT_EXCLUDED_CHARS,
    DEFAULT_INCLUDE_CAPITAL_CASE,
    DEFAULT_INCLUDE_NUMBER,
    DEFAULT_INCLUDE_SPECIAL_CASE
} from './config/defaults';


function App() {
    const [options, setOptions] = useState({
        capitals: localStorage.getItem('capitals') !== null ? JSON.parse(localStorage.getItem('capitals')) : DEFAULT_INCLUDE_CAPITAL_CASE,
        numbers: localStorage.getItem('numbers') !== null ? JSON.parse(localStorage.getItem('numbers')) : DEFAULT_INCLUDE_NUMBER,
        specials: localStorage.getItem('specials') !== null ? JSON.parse(localStorage.getItem('specials')) : DEFAULT_INCLUDE_SPECIAL_CASE,
        passwordLength: JSON.parse(localStorage.getItem('passwordLength'))?.length === 2 ? JSON.parse(localStorage.getItem('passwordLength')) : DEFAULT_PASSWORD_LENGTH,
        excludedCharacters: localStorage.getItem('excludedCharacters') !== null ? localStorage.getItem('excludedCharacters') : DEFAULT_EXCLUDED_CHARS
    });

    return (
        <Container maxWidth="sm">
            <Box mt={10}>
                <PasswordGeneratorSettings options={options} setOptions={setOptions} />
            </Box>
            <PasswordGenerator
                includeCapitalCase={options.capitals}
                includeNumbers={options.numbers}
                includeSpecialCharacters={options.specials}
                passwordLength={options.passwordLength}
                excludedCharacters={options.excludedCharacters}
            />
            <Box mt={3} />
            <Grid container>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    startIcon={<VpnKeyIcon />}
                >
                    Générer un mot de passe
                </Button>
            </Grid>
        </Container>
    );
}

export default App;
