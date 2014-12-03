module.exports = Plan;

function Plan(){
  this.strategies = [];
  this.data = {};
  return this;
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

Plan.create = function(){
  return new Plan();
};

Plan.prototype.valueOf = function(){
  return this;
};

Plan.prototype.value = function(){
  return this.valueOf();
};