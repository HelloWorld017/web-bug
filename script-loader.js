var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var scripts = [];

fs.readdir('./scripts/', (err, files) => {
	if(err){
		console.error(chalk.red("Failed to load scripts!"));
		return;
	}

	files.forEach((v) => {
		if(v.endsWith(".js")){
			require(path.join(__dirname, 'scripts', v));
		}
	});
});
