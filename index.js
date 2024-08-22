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

const getDogPic = async () => {
  try {
    const data = await readFilePromise(filePath);
    console.log(`Breed: ${data}`);

    const breed = data.toString().trim();
    const url = `https://dog.ceo/api/breed/${breed}/images/random`;

    const res = await superagent.get(url);
    const imgUrl = res.body.message;
    console.log(imgUrl);

    await writeFilePromise('dog-img.txt', imgUrl);
    console.log('Random dog image saved to file.');
  } catch (error) {
    console.error(error);
  }

  return '2: Ready';
};

(async () => {
  try {
    console.log('1: Will get dog pics');
    const val = await getDogPic();
    console.log(val);
    console.log('3: Done getting dog pics');
  } catch (error) {
    console.error(error);
  }
})();
