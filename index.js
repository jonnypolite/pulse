#!/usr/bin/env node

const {exec} = require('child_process');
const opn = require('opn');

exec('git push -u origin HEAD', (err, stdout, stderr) => {
  if(err) throw err;

  const pullUrl = stderr.split('\n')
    .filter(line => line.startsWith('remote:'))
    .filter(line => line.search(/https:\/\//) > -1)
    .map(line => line.replace(/^remote:\W+/, '').trim())
    .pop();

  if(pullUrl) {
    console.log(stderr);
    console.log(stdout);
    opn(pullUrl, {wait: false});
  } else {
    console.log("Couldn't find the pull request URL in here:");
    console.log(stderr);
    console.log("YOUR COMMITS WERE STILL PUSHED THOUGH!");
  }
});
