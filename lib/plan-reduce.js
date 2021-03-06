/**
 * Plan.Reduce
 */

if ( typeof module === "object" && module && typeof module.exports === "object" ){
  var isNode = true, define = function (factory) {
    module.exports = factory(require, exports, module);
  };
}

define( function( require, exports, module ){
  var Plan = require('./plan');

  module.exports = Reduce;

  function Reduce( initial ){
    Plan.call( this );
    this.initial = initial;
    return this;
  }

  Reduce.prototype = new Plan();

  Reduce.prototype.clone = function( initial ){
    var plan = new Reduce( initial || this.initial );
    for ( var key in this.data ) plan.set( key, this.data[ key ] );
    this.strategies.forEach( plan.use.bind( plan ) );
    return plan;
  };

  Reduce.prototype.valueOf = function(){
    var data = this.data;

    return this.strategies.reduce( function( curr, strategy ){
      return strategy.def.call( data, curr );
    }, this.initial );
  };

  return module.exports;
});
