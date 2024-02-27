const express = require("express");
const app = express();

app.use(express.json());

// Import the arrays from wordLists.js
const {
  hskOne,
  hskTwo,
  hskThree,
  hskFour,
  hskFive,
  hskSix,
} = require("./wordLists");

app.post("/", (req, res) => {
  console.log(req.body);

  const data = JSON.parse(JSON.stringify(req.body)).test;

  const arZero = String(data).slice(0, 66).split("。");

  const arA = arZero.flat(4);

  const arB = arA.map((el) => {
    return el.split("《");
  });

  const arC = arB.flat(4);

  const arD = arC.map((el) => {
    return el.split("》");
  });

  const arE = arD.flat(4);

  const arF = arE.map((el) => {
    return el.split("，");
  });

  const arG = arF.flat(4);

  const arH = arG.map((el) => {
    return el.split("“");
  });

  const arI = arH.flat(4);

  const arJ = arI.map((el) => {
    return el.split("”");
  });

  const arK = arJ.flat(4);

  const arL = arK.map((el) => {
    return el.split("·");
  });

  const arM = arL.flat(4);

  const arN = arM.map((el) => {
    return el.split("？");
  });

  const charsTogether = arN.flat(4);

  let matchedCharsOne = [];
  let matchedCharsTwo = [];
  let matchedCharsThree = [];
  let matchedCharsFour = [];
  let matchedCharsFive = [];
  let matchedCharsSix = [];

  for (const character of hskOne) {
    for (const textSection of charsTogether) {
      if (textSection.includes(character)) {
        matchedCharsOne.push(character);
      }
    }
  }
  for (const character of hskTwo) {
    for (const textSection of charsTogether) {
      if (textSection.includes(character)) {
        matchedCharsTwo.push(character);
      }
    }
  }
  for (const character of hskThree) {
    for (const textSection of charsTogether) {
      if (textSection.includes(character)) {
        matchedCharsThree.push(character);
      }
    }
  }
  for (const character of hskFour) {
    for (const textSection of charsTogether) {
      if (textSection.includes(character)) {
        matchedCharsFour.push(character);
      }
    }
  }
  for (const character of hskFive) {
    for (const textSection of charsTogether) {
      if (textSection.includes(character)) {
        matchedCharsFive.push(character);
      }
    }
  }
  for (const character of hskSix) {
    for (const textSection of charsTogether) {
      if (textSection.includes(character)) {
        matchedCharsSix.push(character);
      }
    }
  }

  let matches = {
    one: [...new Set(matchedCharsOne)],
    two: [...new Set(matchedCharsTwo)],
    three: [...new Set(matchedCharsThree)],
    four: [...new Set(matchedCharsFour)],
    five: [...new Set(matchedCharsFive)],
    six: [...new Set(matchedCharsSix)],
  };

  res.status(201).json(matches);
});

// Specify the port number
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
