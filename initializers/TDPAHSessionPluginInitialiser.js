/*jslint node: true */
"use strict";

module.exports=
{
	initialize: function(api, next)
	{
		var path=require("path");

		// var TDPAHSession=require("ah-tdp-session-plugin");
		var TDPAHSession=require("../TDPAHSessionPlugin.js");
		var sessionHandler=new TDPAHSession(api);

		// Pre-processor - loads any existing session data
		api.actions.addPreProcessor(function(connection, actionTemplate, next)
		{
			sessionHandler.load(connection, next, function(err)
			{
				// probably want to be able to abandon on some error condition
				next(connection, true);
			});
		});

		// Post-processor - merge then save a session data
		api.actions.addPostProcessor(function(connection, actionTemplate, toRender, next)
		{
			sessionHandler.save(connection, next, function(err)
			{			
				// probably want to be able to abandon on some error condition
				next(connection, toRender);
			});
		});
		
		next();
	},
	start: function(api, next)
	{
		next();
	},
	stop: function(api, next)
	{
		next();
	}
};