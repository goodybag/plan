# Plan.js - Values composed of _Strategies_

> Plan.js allows consumers to create values whose logic is broken up into individual and self-contained strategies. How those strategies interact with the end-value depends on the plan-type.

__Install__

```
npm install plan.js
bower install plan.js
```

__Usage__

```javascript
var Plan = require('plan.js');
// Create a plan with initial value of 0
var orderTotalPlan = new Plan.Reduce(0);

// Generic order total plan
orderTotalPlan
  // Sub-total
  .use( function( curr ){
    return this.order.items.reduce( function( a, b ){
      return a + ( b.price * b.qty )
    }, curr );
  })
  // Promo Code
  .use( function( curr ){
    var promo = promos.get( this.order.promo );
    if ( !promo ) return curr;
    return curr - ( curr * promo.rate );
  })
  // Sales tax
  .use( function( curr ){
    return curr + ( curr * this.order.taxRate );
  })
  // Only integer results in pennies
  .use( Math.round )

// Create an order model
var order = Object.create({
  id: 'my-order'
, salesTax: 0.0825
, get total (){
    return orderTotalPlan.set( 'order', this ).value();
  }
, items: [
    { name: 'Stuff', price: 1000, qty: 1 }
  , { name: 'More Stuff', price: 500, qty: 2 }
  ]
, promo: 'FALLDUMBSALE10%OFF'
});f

// => 1949
order.total;
```

## Docs

TODO
