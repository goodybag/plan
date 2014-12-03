var assert  = require('assert');
var Plan    = require('../');

describe( 'Plan.Reduce', function(){
  it( '.use( function(){} )', function(){
    var planA = new Plan.Reduce(0)
      .use( function( curr ){
        assert.equal( curr, 0 );
        return curr + 1;
      })
      .use( function( curr ){
        assert.equal( curr, 1 );
        return curr + 1;
      })
      .use( function( curr ){
        assert.equal( curr, 2 );
        return curr + 1;
      });

    assert.equal( planA.value(), 3 );
  });

  it( '.use({ def: function(){} })', function(){
    var planA = new Plan.Reduce(0)
      .use({
        def: function( curr ){
          assert.equal( curr, 0 );
          return curr + 1;
        }
      })
      .use({
        def: function( curr ){
          assert.equal( curr, 1 );
          return curr + 1;
        }
      })
      .use({
        def: function( curr ){
          assert.equal( curr, 2 );
          return curr + 1;
        }
      });

    assert.equal( planA.value(), 3 );
  });

  it( '.set( key, val )', function(){
    var planA = new Plan.Reduce(0)
      .set( 'a', 10 )
      .use( function( curr ){
        assert.equal( curr, 0 );
        return curr + 1;
      })
      .use( function( curr ){
        assert.equal( curr, 1 );
        return curr + this.a;
      });

    assert.equal( planA.data.a, 10 );
    assert.equal( planA.value(), 11 );
  });
});