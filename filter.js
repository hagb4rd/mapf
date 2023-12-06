#!/usr/bin/env node
var fs=require("node:fs/promises")
var cp=require("node:child_process")
var path=require("node:path")
var vm=require("node:vm")
var net=require("node:net")
var qs=require("node:querystring")
var stream = require("node:stream");
var { Readable, filter, map } = require("node:stream");
var { readLines, readLine, compile } = require("./streammapfilter");
var getArgs=()=>process.argv.slice(2)
//var unidecode=require("unidecode")



//run
/* 
USAGE:
  cat file | filter '(s)=>["bad","ananas"].some(ext=>String(s).includes(ext)))' 

  filters each line using a predicate function (a function returning a boolean value: true/false) 
  in this case any line that contains the keywords "bad" or "ananas"

  cat file | filter | mapf 's=>s.toUpperCase()'

  filters (by default empty lines) and then maps each line parsing a given function s=>transform(s) 
*/

var predicate=(compile(getArgs().join()||"(s)=>String(s).trim().length>0"));
var split=s=>s+"\n"

//aequivalent to
//  Readable.from(readLine(process.openStdin()))
readLines()
	.filter(predicate)
	.map(split)
	.pipe(process.stdout)
