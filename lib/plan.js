/**
 * Plan
 */

if ( typeof module === "object" && module && typeof module.exports === "object" ){
  var isNode = true, define = function (factory) {
    module.exports = factory(require, exports, module);
  };
}

define( function( require, exports, module ){
  module.exports = Plan;

  function Plan(){
    this.strategies = [];
    this.data = {};
    return this;
  }

  Plan.create = function(){
    return new ( Plan.bind.apply( Plan, arguments ) )();
  };

  /**
   * Adds a new strategy to the plan
   * @param  {Object|Function}  strategy Strategy definition
   * @return {Plan}             This plan instance
   */
  Plan.prototype.use = function( strategy ){
    if ( typeof strategy === 'function' ){
      strategy = {
        def: strategy
      };
    } else if ( typeof strategy.def !== 'function' ){
      throw new Error('Invalid strategy. Strategy must be a function or object with function key `def`');
    }

    this.strategies.push( strategy );

    return this;
  };

  /**
   * Sets properties on the plan data to be bound to each
   * strategy call
   * @param {String} key   Key of the object
   * @param {Mixed} value  Value of the key
   * @return {Plan}             This plan instance
   */
  Plan.prototype.set = function( key, value ){
    this.data[ key ] = value;
    return this;
  };

  Plan.prototype.clone = function(){
    var args = [ this.constructor ].concat(
      Array.prototype.slice.call( arguments )
    );

    var plan = new (Function.prototype.bind.apply( this.constructor, args ))();
    for ( var key in this.data ) plan.set( key, this.data[ key ] );
    this.strategies.forEach( plan.use.bind( plan ) );
    return plan;
  };

  Plan.prototype.valueOf = function(){
    return this;
  };

  Plan.prototype.value = function(){
    return this.valueOf();
  };

  return module.exports;
});
