var action = {};

/////////////////////////////////////////////////////////////////////
// metadata
action.name = 'TDPAHSession/test/loadTimestamp';
action.description = 'I save a timestamp onto the session';
action.inputs = {
  'required' : [],
  'optional' : []
};
action.blockedConnectionTypes = [];
action.outputExample = {
  status: 'OK',
  uptime: 1234,
  stats: {}
}

/////////////////////////////////////////////////////////////////////
// functional
action.run = function(api, connection, next)
{
	connection.response.sessionData=connection.sessionData;

	next(connection, true);
};

/////////////////////////////////////////////////////////////////////
// exports
exports.action = action;
