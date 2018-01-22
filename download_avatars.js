var request = require('request');
var secrets = require('./secrets.js');

console.log("Welcome to the Github Avatar Downloader");

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'michael-38',
      'Authorization': secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}


function printAvatarURL(err, body) {
  console.log("Errors:", err);
  var parsedBody = JSON.parse(body);


  // console.log(parsedBody[0].avatar_url);

  for (var i = 0; i < parsedBody.length; i++) {
    console.log(parsedBody[i].avatar_url);
  }
}


getRepoContributors("jquery", "jquery", printAvatarURL);

// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
// });










