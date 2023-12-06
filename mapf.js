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

//var predicate=(compileFn(getArgs().join()||"(s)=>String(s).trim().length>0"));
//var filterFn = (xs) => xs.map(s=>compileFn(s)).reduce((aggr,next)=>aggr.filter(next));



var f=compile(process.argv.slice(2))
var split=s=>s+"\n"

//Readable.from(readLine(process.openStdin()))
readLines(process.openStdin())
  .map(f)
  .map(split)
//  .compose(join("\n"))
	.pipe(process.stdout)
