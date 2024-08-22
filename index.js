const fs = require('fs');

const filePath = `${__dirname}/dog.txt`;

fs.readFile(filePath, (error, data) => {
  console.log(`Breed: ${data}`);
});
