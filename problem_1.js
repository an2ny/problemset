'use strict';

let lib = require('./lib');

//promises container whenever an array is passed in the input
let promises = [];
//callback function to be called after each request so simulate a series transaction type
let cb = function(param){
    if (param != '')
        doAsync(param);
};

function doAsync(input){
    //if input in array
    if ( Array.isArray(input[0]) )
    {
        //collect all promises to a variable
        input[0].forEach(function(val, index){
            promises.push( lib.asyncOp(val) );
        });
        
        //wait til all on-going transactions are done, then proceed to next input
        Promise.all(promises).then(function(){
            promises = [];//clear the promise container, just to be safe
            cb(input.splice(1));
        })
    }
    else
    {
        lib.asyncOp(input[0], function(){
            cb(input.splice(1));
        });
    }
}

//the input
let input = ['A', ['B', 'C'], 'D'];

//call the async method
doAsync(input);