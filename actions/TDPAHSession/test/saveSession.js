var action = {};

/////////////////////////////////////////////////////////////////////
// metadata
action.name = 'TDPAHSession/test/saveSession';
action.description = 'I save a timestamp onto the session';
action.inputs = {
  'required' : ["t"],
  'optional' : []
};
action.blockedConnectionTypes = [];
action.outputExample = {
}

/////////////////////////////////////////////////////////////////////
// functional
action.run = function(api, connection, next)
{

console.dir(connection.params);

  connection.sessionData=connection.params.t;

  connection.response.sessionData=connection.sessionData;

  next(connection, true);
};

/////////////////////////////////////////////////////////////////////
// exports
exports.action = action;
