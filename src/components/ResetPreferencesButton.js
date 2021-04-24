import React from 'react';
import { Button } from '@material-ui/core';
import {
    DEFAULT_PASSWORD_LENGTH,
    DEFAULT_EXCLUDED_CHARS,
    DEFAULT_INCLUDE_LOWER_CASE,
    DEFAULT_INCLUDE_CAPITAL_CASE,
    DEFAULT_INCLUDE_NUMBER,
    DEFAULT_INCLUDE_SPECIAL_CASE
} from '../config/defaults';

const ResetPreferencesButton = ({ setOptions }) => {
    const resetPreferences = () => {
        // Set default values 
        setOptions({
            passwordLength: DEFAULT_PASSWORD_LENGTH,
            capitals: DEFAULT_INCLUDE_CAPITAL_CASE,
            numbers: DEFAULT_INCLUDE_NUMBER,
            specials: DEFAULT_INCLUDE_SPECIAL_CASE,
            excludedCharacters: DEFAULT_EXCLUDED_CHARS
        });

        // Clear stored preferences
        localStorage.clear()
    }

    return (
        <Button onClick={resetPreferences}>
            Réinitialiser les préférences
        </Button>
    )
}

export default ResetPreferencesButton;