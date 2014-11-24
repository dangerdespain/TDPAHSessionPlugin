var action = {};

/////////////////////////////////////////////////////////////////////
// metadata
action.name = 'TDPAHSession/test/loadSession';
action.description = 'I load session data from the cache';
action.inputs = {
  'required' : [],
  'optional' : []
};
action.blockedConnectionTypes=[];
action.outputExample=
{
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
