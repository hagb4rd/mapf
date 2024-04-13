
# ea-mapf 

Read line by line from input stream and compile small javascript lambdas to transform *mapf* or *filter* them. Tiny. No dependencies. Needs nodejs.org version 18+ (using pure native node streams). 

## Installation
```
npm install -g ea-mapf
```

## Example
```
printf %s\\n {1..10} | mapf 's=>Number(s)**3' | filter 's=>Number(s)%2!=0'
```

produces the output
```
1
27
125
343
729
```


Have fun!

###
mcfuege@gmail.com
