process.env.NODE_ENV = 'test';

var should = require('should');
var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;
var conn;

describe('actionhero plugin ah-tdp-session-plugin tests', function()
{

  before(function(done)
  {
    actionhero.start(function(err, a)
    {
      api = a;

      conn=new api.specHelper.connection();

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
      api.specHelper.runAction('TDPAHSession/test/saveTimestamp', conn, function(response, connection)
      {
        ts=response.sessionData.ts;

        response.sessionData.ts.should.be.type("number");
        done();
      });
  });

  it("Should load the session data from redis successfully", function(done)
  {
      api.specHelper.runAction('TDPAHSession/test/loadTimestamp', conn, function(response, connection)
      {
        response.sessionData.ts.should.be.type("number");
        response.sessionData.ts.should.eql(ts);

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