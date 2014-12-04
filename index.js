/**
 * Plan.js
 */

if ( typeof module === "object" && module && typeof module.exports === "object" ){
  var isNode = true, define = function (factory) {
    module.exports = factory(require, exports, module);
  };
}

define( function( require, exports, module ){
  module.exports = require('./lib/plan');
  module.exports.Reduce = require('./lib/plan-reduce');
  return module.exports;
});