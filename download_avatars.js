var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');
argv = process.argv

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
    if (err) {
      console.log(err);
    }

    if(cb) {
      cb(err, body);
    }
  });
}



function downloadImageByURL(url, filePath) {
  // console.log("test");
  request.get(url)
  .on('error', function (err) {
    throw err;
  })
  .pipe(fs.createWriteStream(filePath));
}


function downloadAll(repoOwner, repoName) {
  if (argv[2] === undefined || argv[3] === undefined) {
    throw "Please enter both arguments";
  } else {
    getRepoContributors(repoOwner, repoName, function(err, body) {
      var parsedBody = JSON.parse(body);
      for (var i = 0; i < parsedBody.length; i++) {
        downloadImageByURL(parsedBody[i].avatar_url, "avatars/"+parsedBody[i].login+".jpg");
        console.log("downloading...");
      }
      console.log("download complete");
    });
  }
}


downloadAll(argv[2], argv[3]);



