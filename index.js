const async = require("async");
const fs = require("fs");

async.map(["index.js", "package.json", "README.md"], fs.stat, function(err, res) {
	console.log(res);
});

//without async
fs.stat("package.json", function(err, stats) {
	console.log(stats);
});
