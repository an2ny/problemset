'use strict';

let lib = require('./lib');
let stream = require('stream');
const UTIL = require('util');
const EVENTEMITTER = require('events').EventEmitter;

//create the class
function RandStringSource(data){
    
    //just a simple checking if the construction params is a valid class of randstream
    if ( !(data instanceof lib.RandStream) ) {
        return;
    }
    
    var me = this;
    EVENTEMITTER.call(me);
    
    //listen to the generation of chunks
    me.data = data;
    me.data.on('readable', () => {
        var chunk;
        //while there is still chunks generated
        while (null !== (chunk = me.data.read())) {
            //split the chunks based on the separator "."
            var split_chunk = chunk.toString().split(".");
            split_chunk.forEach(function(val){
                if (val != '') {
                    //emit the 'data' event
                    me.emit('data', val);
                }
            });
        }
    });
    
}
UTIL.inherits(RandStringSource, EVENTEMITTER);

var source = new RandStringSource(new lib.RandStream());

source.on('data', (chunk) => {
    console.log(chunk);
});