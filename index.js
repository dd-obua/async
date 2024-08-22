const fs = require('fs');

const superagent = require('superagent');

const readFilePromise = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, data) => {
      if (error) reject('Could not find file');
      resolve(data);
    });
  });
};

const writeFilePromise = (to, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(to, data, (error) => {
      if (error) reject('Could not write file');
      resolve('Success');
    });
  });
};

const filePath = `${__dirname}/dog.txt`;

readFilePromise(filePath)
  .then((data) => {
    console.log(`Breed: ${data}`);
    const breed = data.toString().trim();
    const url = `https://dog.ceo/api/breed/${breed}/images/random`;
    return superagent.get(url);
  })
  .then((res) => {
    const imgUrl = res.body.message;
    console.log(imgUrl);
    return writeFilePromise('dog-img.txt', imgUrl);
  })
  .then(() => console.log('Random dog image saved to file.'))
  .catch((error) => {
    console.error(error);
  });
