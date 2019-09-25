const path = require("path");
const fs = require('fs');

let PATH=path.resolve();
const info=JSON.parse(fs.readFileSync(PATH+"/info.json",'utf8'));
const data = []

for(let name in info){
    data.push(info[name])
}

data.forEach(member =>{
    console.log(member.name);
})