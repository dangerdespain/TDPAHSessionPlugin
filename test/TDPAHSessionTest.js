process.env.NODE_ENV = 'test';

var should = require('should');
var assert = require('assert');

var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;
var conn;


var testObj=
{
  str:"This is a string",
  integer:Date.now(),
  floatingPoint:3.14159,
  bool:true,
  obj:
  {
    a:"b",
    c:"d"
  },
  arr:
  [
    "a",
    "b",
    "c"
  ]
};

var i;

describe('actionhero plugin ah-tdp-session-plugin tests', function()
{

  before(function(done)
  {
    actionhero.start(function(err, a)
    {
      api = a;

      conn=new api.specHelper.connection();

      conn.params=
      {
        t:testObj
      };

      done();
    })
  });

  after(function(done)
  {
    actionhero.stop(function(err)
    {
      done();
    });
  })

  // We need this var in scope for the two tests below
  var ts=null;

  it("Should save the current unix timestamp onto the session", function(done)
  {
      api.specHelper.runAction('TDPAHSession/test/saveSession', conn, function(response, connection)
      {
        assert.deepEqual(response.sessionData, testObj);
        done();
      });
  });

  it("Should load the session data from redis successfully", function(done)
  {
      api.specHelper.runAction('TDPAHSession/test/loadSession', conn, function(response, connection)
      {
        assert.deepEqual(response.sessionData, testObj);
        done();
      });
  });


// TODO: Add a destroy() test
  // it("Should destroy the session data from redis successfully", function(done)
  // {
  //     api.specHelper.runAction('TDPAHSession/test/loadTimestamp', conn, function(response, connection)
  //     {
  //       response.sessionData.ts.should.be.type("number");
  //       response.sessionData.ts.should.eql(ts);

  //       done();
  //     });
  // });

});