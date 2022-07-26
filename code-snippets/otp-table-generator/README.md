# One-time-pad Table Generator
This script automates the generation and encoding of a one-time-pad. A 60-year old technology used by spies around the globe.

## Example
```js
var input = 'Grilled cheese, you mean so much to me.\nGrilled cheese, you bring cholesterol to my knees.';

// generate our random table
// The "false" parameter says that we want all the values in the table to be unique.
var table = generateOTPRandtable(false);

// Generate key, be sure that it is at least longer than the inputted string.
var key = generateOTPKey(input.length);

// Output as a Javascript object.
// This is what we will use to encode the message.
var machine_friendly_table = convertToObject(table);

// Encode the message.
var encoded_message = encodeMessage(input, key, machine_friendly_table);
console.log(encoded_message);

// Decode the message.
var decoded_message = decodeMessage(encoded_message, key, machine_friendly_table);
console.log(decoded_message);

// Output as string formatted as a CSV file.
var csvfile = convertToCSV(table);
console.log(csvfile);
```

## Short description of OTP
*excerpt from [Wikipedia](https://en.wikipedia.org/wiki/One-time_pad)*
>In cryptography, the one-time pad (OTP) is an encryption technique that cannot be cracked, but requires the use of a single-use pre-shared key that is not smaller than the message being sent. In this technique, a plaintext is paired with a random secret key (also referred to as a one-time pad). Then, each bit or character of the plaintext is encrypted by combining it with the corresponding bit or character from the pad using modular addition.

This is not to be confused with the [One-time password which shares the same acronym](https://en.wikipedia.org/wiki/One-time_password), though this can technically also describe an OTP key as both are disposed of after use.

## Excel formula parsing error (#NAME?) in CSV file
In Excel or other spreadsheet applications any entry beginning with a equal (=) or plus (+) sign will be interpreted as a formula. This can be simply mitigated by removing these in the `allowedCharacters` variable if it is not neccesary for your communications.

## Chunking size
The script also gives you the ability to increase the number of characters used to encode the message. To change it:

1. Append `allowedCharacters[Math.floor(Math.random() * allowedCharacters.length)]` as many times in `generateOTPRandtable`'s `elem` variable. (5 is my recommended maximum)
```js
// function generateOTPRandtable()
    let elem = /* append allowedCharacters[Math.floor(Math.random() * allowedCharacters.length)] here*/;
```
2. Update how many times you appended this in `decodeMessage`'s `split_string` variable
```js
// function encodeMessage(input, key, table)
// OPTIONAL: Update the warning that pops up if the string is not a multiple of the chunk size.
  if (input.length % 2 != 0) { console.warn('string is probably invalid, continuing anyway...'); }
//      Update here: ^

// ...

  var split_string = string.match(/[\s\S]{2}/g);
//                           Update here: ^
```