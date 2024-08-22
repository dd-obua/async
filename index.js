const fs = require('fs');

const superagent = require('superagent');

const filePath = `${__dirname}/dog.txt`;

fs.readFile(filePath, (error, data) => {
  if (error) throw new Error(error);
  console.log(`Breed: ${data}`);

  const breed = data.toString().trim();
  const url = `https://dog.ceo/api/breed/${breed}/images/random`;

  superagent.get(url).end((err, res) => {
    if (err) return console.error(err.message);

    const imgUrl = res.body.message;
    console.log(imgUrl);

    fs.writeFile('dog-img.txt', imgUrl, (error) => {
      console.log('Random dog image saved to file.');
    });
  });
});
