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

      return done();
    })
  });

  after(function(done)
  {
    actionhero.stop(function(err)
    {
      return done();
    });
  })

  it("Should save a data object onto the session", function(done)
  {


console.log("API");
console.dir(api.actions);

      api.specHelper.runAction('TDPAHSession/saveSession', conn, function(response, connection)
      {
console.log("TEST OBJ:");        
console.dir(testObj);

console.log("connec:");        
console.dir(connection.params);

console.log("SESS:");        
console.dir(response);

        assert.deepEqual(response.sessionData, testObj);
        return done();
      });
  });

  it("Should load data from redis successfully", function(done)
  {
      api.specHelper.runAction('TDPAHSession/loadSession', conn, function(response, connection)
      {
        assert.deepEqual(response.sessionData, testObj);
        return done();
      });
  });


// TODO: Add a destroy() test
  // it("Should destroy the session data from redis successfully", function(done)
  // {
  //     api.specHelper.runAction('TDPAHSession/loadTimestamp', conn, function(response, connection)
  //     {
  //       response.sessionData.ts.should.be.type("number");
  //       response.sessionData.ts.should.eql(ts);

  //       done();
  //     });
  // });

});