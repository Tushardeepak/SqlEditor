export const csvtojson = (csv) => {
  const array = csv.toString().split("\n");

  /* Store the converted result into an array */
  const csvToJsonResult = [];

  /* Store the CSV column headers into seprate variable */
  const headers = array[0].split(", ");

  /* Iterate over the remaning data rows */
  for (let i = 1; i < array.length - 1; i++) {
    /* Empty object to store result in key value pair */
    const jsonObject = {};
    /* Store the current array element */
    const currentArrayString = array[i];
    let string = "";

    let quoteFlag = 0;
    for (let character of currentArrayString) {
      if (character === '"' && quoteFlag === 0) {
        quoteFlag = 1;
      } else if (character === '"' && quoteFlag == 1) quoteFlag = 0;
      if (character === ", " && quoteFlag === 0) character = "|";
      if (character !== '"') string += character;
    }

    let jsonProperties = string.split("|");

    for (let j in headers) {
      if (jsonProperties[j].includes(", ")) {
        jsonObject[headers[j]] = jsonProperties[j]
          .split(", ")
          .map((item) => item.trim());
      } else jsonObject[headers[j]] = jsonProperties[j];
    }
    /* Push the genearted JSON object to resultant array */
    csvToJsonResult.push(jsonObject);
  }
  /* Convert the final array to JSON */
  const json = JSON.stringify(csvToJsonResult);
  return json;
};
