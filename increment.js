var fs = require('fs');
var file_data = fs.readFileSync('./update_version')
fs.writeFileSync('./update_version', Number(Number(file_data) + 1))