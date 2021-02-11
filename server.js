const express = require("express"); //express import
// const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // package for parsing HTTP request bodies
var cors = require('cors')

const config = require("./config/config");

const app = express(); // Server App Instance

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));

const mockUserData = [
  {
    id: 1,
    name: "Ali",
    username: "ali@ubl.com",
    password: "123",
    address: "Lahore",
    cnic: "1234567891212",
    accountTitle: "Ali Hameed Khan",
    accountNumber: 12345,
    currencyCode: "PKR",
    branchName: "Johar Town, LHR",
    country: "Pakistan",
  },
];

app.post("/core/auth/signin", (req, res) => {
  const userCreds = JSON.parse(Object.keys(req.body)[0]);

  //Todo: get user here from oracle db
  //---------
  const profile = mockUserData.find((user) => {
    if (user.username === userCreds.username) {
      if (user.password === userCreds.password) {
        return res.send(user)
      } else {
        return res.status(401).send('Incorrect Password')
      }
    }
  });
  if (!profile) return res.status(400).send('No User Against This Username');
  //---------
  const user = JSON.parse(Object.keys(req.body)[0]);
  return res.send(user);
});

app.put("/core/profile/update", (req, res, next) => {
  const userProfile = JSON.parse(Object.keys(req.body)[0]);
  console.log('profile update request received', userProfile)
  //---------
  const profileIndex = mockUserData.findIndex(user => user.username === userProfile.username);
  console.log('profile index: ', profileIndex)
  if (profileIndex >=0) {
    mockUserData[profileIndex] = userProfile;
    console.log('data after operation', mockUserData);
    return res.status(200).send();
  }
  //---------

  console.log('data after operation', mockUserData);
  //Todo: update user here in oracle db
  res.status(500).send();
  next();
});

// root level request for server status test purpose
app.get("/", (req, res, next) => {
  res.send("BankLogin Server is up!");
  next();
});

// Finally, bring the server instance up
app.listen(config.PORT, config.HOST, function () {
  console.log(`BankLogin Server listening on http://${config.HOST}:${config.PORT}`);
});
