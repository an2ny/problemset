'use strict';

//resource manager
function ResourceManager(count){
    if ( isNaN(count) ) {
        throw ('not a valid number');
    }
    
    var me = this;
    var rsc = function(){
        this.release = function(){
            me.removeResource(this);
        }
        
        //just to generate a uniq id (hopefully)
        this._id = Math.random();
    }
    
    me.numAllowedResource = parseInt(count, 10);
    me.resources = [];
    
    me.addResource = function(){
        if (me.resources.length < me.numAllowedResource) {
            var resource = new rsc();
            me.resources.push(resource);
            
            console.log('added new resource.');
            
            return resource;
        }
        else
        {
            console.log('unable to allocate resource.');
            
            return false;
        }
    };
    
    me.removeResource = function(resource){
        for(var i=0; i<me.resources.length; i++)
        {
            //remove the matching resource
            if(me.resources[i]._id == resource._id)
            {
                me.resources.splice(i, 1);
                break;
            }
        }
    };
    
    me.borrow = function(cb){
        var source = me.addResource();
        
        cb(source);
    }
}

var pool = new ResourceManager(2);

pool.borrow((res) => {
    console.log('borrow here');
});

pool.borrow((res) => {
    console.log('borrow here2');
    
    console.log('res', res);
    
    res.release();
});

pool.borrow((res) => {
    console.log('borrow here3');
});

pool.borrow((res) => {
    console.log('borrow here4');
});