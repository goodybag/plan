var Plan = require('./plan');

module.exports = Reduce;

function Reduce( initial ){
  Plan.call( this );
  this.initial = initial;
  return this;
};

Reduce.prototype = new Plan();

Reduce.prototype.valueOf = function(){
  var data = this.data;

  return this.strategies.reduce( function( curr, strategy ){
    return strategy.def.call( data, curr );
  }, this.initial );
};