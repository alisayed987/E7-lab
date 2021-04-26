const fs = require('fs');

fs.readdir('./',(err,files)=>{
console.log(files);
});

fs.readFile('./tst.js','utf8',(err,data)=>{
    console.log(data)
})