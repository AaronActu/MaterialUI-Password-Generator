import React from 'react';
import { FormControl, FormControlLabel, FormGroup, FormLabel, Paper, Slider, Switch, Typography, Box, Checkbox } from '@material-ui/core'
import { SPECIAL_CHARS_LIST } from '../config/defaults'

const PasswordGeneratorSettings = ({ options, setOptions }) => {
    const handleChange = (e) => {
        setOptions({ ...options, [e.target.name]: e.target.checked })
        localStorage.setItem(e.target.name, JSON.stringify(e.target.checked))
    }

    const handlePasswordLengthChange = (e, range) => {
        setOptions({ ...options, passwordLength: range })
        localStorage.setItem("passwordLength", JSON.stringify(range))
    }

    const handleExcludedCharactersChange = (e) => {
        let excludedCharacters = options.excludedCharacters;
        excludedCharacters = options.excludedCharacters.includes(e.target.name) ?
            excludedCharacters.replace(e.target.name, '') :
            excludedCharacters + e.target.name

        setOptions({ ...options, excludedCharacters })
        localStorage.setItem("excludedCharacters", excludedCharacters)
    }

    return (

        <Paper elevation={0}>
            <FormControl component="fieldset">
                <FormLabel component="legend">Sélectionnez les options de votre mot de passe sécurisé:</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch checked={options.capitals} onChange={handleChange} name="capitals" />}
                        label="Avec des lettres majuscules"
                    />
                    <FormControlLabel
                        control={<Switch checked={options.numbers} onChange={handleChange} name="numbers" />}
                        label="Avec des chiffres"
                    />
                    <FormControlLabel
                        control={<Switch checked={options.specials} onChange={handleChange} name="specials" />}
                        label="Avec des caractères spéciaux"
                    />
                    {options.specials === true &&
                        <FormGroup row>
                            {
                                SPECIAL_CHARS_LIST.split("").map((c, i) => <FormControlLabel
                                    key={"excluded-char-" + i}
                                    control={<Checkbox checked={!options.excludedCharacters.includes(c)} onChange={handleExcludedCharactersChange} name={c} />}
                                    label={c}
                                />
                                )
                            }
                        </FormGroup>
                    }

                    <Typography>
                        Nombre de caractères dans le mot de passe
                    </Typography>
                    <Box mt={5}>
                        <Slider
                            value={options.passwordLength}
                            onChange={handlePasswordLengthChange}
                            valueLabelDisplay="on"
                            min={8}
                            max={40}
                        />
                    </Box>
                </FormGroup>
            </FormControl>
        </Paper>
    )
}

export default PasswordGeneratorSettings;