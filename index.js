import inquirer from 'inquirer';
import fetch from 'node-fetch';
import fs from 'fs';
inquirer 
.prompt([
    {
       type:'input',
       name:"username",
       message:"PLZ, enter your name"
    }])
    .then(async (ans) =>{
        const { username } = ans;
        const filePath='./username.txt';
        const url = `https://api.github.com/users/${username}/repos`;
      try{
        const response = await fetch(url, { headers: { 'User-Agent': 'node.js' } });
       const repos = await response.json();
       const repoNames = repos.map(repo => repo.name);
   
    fs.writeFile(filePath,JSON.stringify(repoNames)+"\n",'utf-8',()=>{});
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.log("Error reading file", err);
      } else {
        console.log("File Content:", data);
      }});
   }catch (error) {
    console.error(`Error fetching repos: ${error.message}`);
  }});