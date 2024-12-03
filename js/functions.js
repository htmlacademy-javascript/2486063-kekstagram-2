function checkStrLength (str, stringLength) {
  return (str.length >= stringLength);
}

function checkPolindrom (str) {
  let arrayCharacters = str.toLowerCase();
  arrayCharacters = arrayCharacters.replace(/\s/g, '');
  arrayCharacters = arrayCharacters.split('');

  for (let i = 0; i < arrayCharacters.length / 2; i++) {
    const firstChar = arrayCharacters[i];
    const lastChar = arrayCharacters[arrayCharacters.length - i - 1];

    if (firstChar !== lastChar) {
      return false;
    }
  }

  return true;
}

function getNumber (str) {
  if (typeof str !== 'string') {
    str = str.toString();
  }

  let strWithNumber = str.replace(/[.,]/g, '');
  strWithNumber = strWithNumber.match(/[0-9]+/g);

  if (strWithNumber === null) {
    return NaN;
  }

  const stringNumber = strWithNumber[0].toString();

  return parseInt(stringNumber, 10);
}
