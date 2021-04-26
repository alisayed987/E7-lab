const express = require('express');
const router = express.Router();
const fs = require('fs');



router.get('/sourceCode/',(req, res) => {
    const vars = req.query;
    if (Object.keys(vars).length == 0) {
        fs.readdir('./', (err, files) => {
            if (err) { return res.status(400).send(err); }
            else { return res.send(files); }
        });
    }
    else{
        if (vars.file)
            fs.readFile('./' + vars.file, 'utf8', async(err, data) => {
                console.log(vars.file);
                await res.send('<html><head><meta charset="UTF-8"><title>File :'+vars.file+'</title></head><body><div style="white-space: pre-wrap;">'+data+'</div></body></html>');
            });
            
        if (vars.dir) {
            console.log(vars.dir);
            fs.readdir('./' + vars.dir, (err, files) => {
                if (err) { res.status(400).send(err); }
                else { res.send(files); }
            });
        }
    }
    console.log(vars);
})

module.exports = router;