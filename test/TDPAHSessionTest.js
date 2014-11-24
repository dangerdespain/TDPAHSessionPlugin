process.env.NODE_ENV = 'test';

var should = require('should');
var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;


describe('actionhero plugin ah-tdp-session-plugin tests', function()
{

  before(function(done)
  {
    actionhero.start(function(err, a)
    {
      api = a;
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
      api.specHelper.runAction('TDPAHSession/test/saveTimestamp', {}, function(response, connection)
      {
        ts=response.ts;
        response.sessionData.ts.should.be.type("number");

        done();
      });
  });

  // it("Should load the session data from redis successfully", function(done)
  // {
  //     api.specHelper.runAction('TDPAHSession/test/loadTimestamp', {}, function(response, connection)
  //     {
  //       response.ts.should.be.an.type("integer");
  //       response.ts.should.eql(ts);

  //       done();
  //     });
  // });

});