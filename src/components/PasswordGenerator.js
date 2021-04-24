/* eslint-disable no-extend-native */
import React, { useRef, useEffect } from 'react';
import { IconButton } from '@material-ui/core'
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {
    LOWER_CHARS_LIST,
    CAPITAL_CHARS_LIST,
    NUMBER_LIST,
    SPECIAL_CHARS_LIST,
    DEFAULT_PASSWORD_LENGTH,
    DEFAULT_EXCLUDED_CHARS,
    DEFAULT_INCLUDE_LOWER_CASE,
    DEFAULT_INCLUDE_CAPITAL_CASE,
    DEFAULT_INCLUDE_NUMBER,
    DEFAULT_INCLUDE_SPECIAL_CASE
} from '../config/defaults';

String.prototype.shuffle = function () {
    let a = this.split(""),
        n = a.length;

    for (let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

const generatePassword = (seedString, passwordLength) => {
    let generatedPassword = "";
    seedString = seedString.shuffle()

    for (let i = 0; i < passwordLength; i++) {
        const index = Math.floor(Math.random() * seedString.length)
        generatedPassword += seedString[index]
    }

    return generatedPassword;
}

const PasswordGenerator = ({
    passwordLength = DEFAULT_PASSWORD_LENGTH,
    includeLowerCase = DEFAULT_INCLUDE_LOWER_CASE,
    includeCapitalCase = DEFAULT_INCLUDE_CAPITAL_CASE,
    includeNumbers = DEFAULT_INCLUDE_NUMBER,
    includeSpecialCharacters = DEFAULT_INCLUDE_SPECIAL_CASE,
    excludedCharacters = DEFAULT_EXCLUDED_CHARS
}) => {
    if (typeof includeLowerCase !== "boolean" && !includeLowerCase)
        includeLowerCase = DEFAULT_INCLUDE_LOWER_CASE
    if (typeof includeCapitalCase !== "boolean" && !includeCapitalCase)
        includeCapitalCase = DEFAULT_INCLUDE_CAPITAL_CASE
    if (typeof includeNumbers !== "boolean" && !includeNumbers)
        includeNumbers = DEFAULT_INCLUDE_NUMBER
    if (typeof includeSpecialCharacters !== "boolean" && !includeSpecialCharacters)
        includeSpecialCharacters = DEFAULT_INCLUDE_SPECIAL_CASE
    if (typeof excludedCharacters !== "string" && !excludedCharacters)
        excludedCharacters = DEFAULT_EXCLUDED_CHARS
    if (!passwordLength || !Array.isArray(passwordLength) || passwordLength.length !== 2)
        passwordLength = DEFAULT_PASSWORD_LENGTH

    const codeRef = useRef();
    const passwordRandomLength = Math.floor(Math.random() * (passwordLength[1] - passwordLength[0] + 1) + passwordLength[0]);

    // Build seed string
    let seedString = (includeLowerCase && LOWER_CHARS_LIST) + (includeCapitalCase && CAPITAL_CHARS_LIST) +
        (includeNumbers && NUMBER_LIST) + (includeSpecialCharacters && SPECIAL_CHARS_LIST)

    // Remove undesired characters from seed string 
    excludedCharacters.split('').forEach(c => { seedString = seedString.replace(c, '') })

    // Generate password
    const generatedPassword = generatePassword(seedString, passwordRandomLength)

    useEffect(() => {
        // Select text so user can directly ctrl+c
        const codeElement = codeRef.current
        window.getSelection().setBaseAndExtent(codeElement, 0, codeElement, 1)
    }, [generatedPassword])

    return (<>
        <code ref={codeRef}>{generatedPassword}</code>
        <IconButton>
            <FileCopyIcon onClick={() => navigator.clipboard.writeText(generatedPassword)} />
        </IconButton>
    </>)
}

export default PasswordGenerator;