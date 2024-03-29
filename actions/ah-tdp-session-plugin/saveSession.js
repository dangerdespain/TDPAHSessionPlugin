/*jslint node: true */
"use strict";

var action = {};

/////////////////////////////////////////////////////////////////////
// metadata
action.name = 'ah-tdp-session-plugin/saveSession';
action.description = 'I save a data object onto the session';
action.inputs =
{
	t:
	{
		required:true
	}
};
action.blockedConnectionTypes = [];
action.outputExample = {};

/////////////////////////////////////////////////////////////////////
// functional
action.run = function(api, connection, next)
{
	// NOTE: Don't ever just save user-supplied data anywhere, sanitise it first!
	connection.sessionData=connection.params.t;
	connection.response.sessionData=connection.sessionData;
	next(connection, true);
};

/////////////////////////////////////////////////////////////////////
// exports
exports.action = action;
