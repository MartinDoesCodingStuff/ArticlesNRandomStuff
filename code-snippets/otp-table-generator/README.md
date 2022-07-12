# One-time-pad Table Generator

This script automates the generation and encoding of a one-time-pad. A 60-year old technology used by spies around the globe.

## Example
```js
var input = 'grilled cheese, you bring cholesterol to my knees';

// generate our table
var table = generateOTPRandtable();

// generate key, be sure that it is at least longer than the inputted string
var key = generateOTPKey(input.length);

// output as machine-friendly Javascript object
var machine_friendly_table = convertToObject(table);

// encode the message
var encoded_message = encodeMessage(input, key, machine_friendly_table);
console.log(encoded_message);

// output as string formatted as a CSV file
var csvfile = convertToCSV(table);
console.log(csvfile);
```

## Short description of OTP

*excerpt from [Wikipedia](https://en.wikipedia.org/wiki/One-time_pad)*
>In cryptography, the one-time pad (OTP) is an encryption technique that cannot be cracked, but requires the use of a single-use pre-shared key that is not smaller than the message being sent. In this technique, a plaintext is paired with a random secret key (also referred to as a one-time pad). Then, each bit or character of the plaintext is encrypted by combining it with the corresponding bit or character from the pad using modular addition.

This is not to be confused with the [One-time password which shares the same acronym](https://en.wikipedia.org/wiki/One-time_password), though this can technically also describe an OTP key as both are disposed of after use.

## Excel formula parsing error (#NAME?) in CSV file

In Excel or other spreadsheet applications any entry beginning with a equal (=) or plus (+) sign will be interpreted as a formula. This can be simply mitigated by removing these in the `allowedCharacters` variable if it is not neccesary for your communications.