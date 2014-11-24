"use strict";

var TDPAHSessionPlugin=function(api)
{
	var path=require("path");
	var config;
	
	var init=function(api)
	{
		// Load config from API (actionhero) object
		config=api.config.AHTDPSessionPlugin;

		return;// callback();
	};
	
	var getSessionKey=function(connection, callback)
	{
		var err=null;
		var ret=null;
		var id=connection.fingerprint || connection.id || null;
		var sessionKeyPrefix=config.sessionKeyPrefix || null;

		if(id && sessionKeyPrefix)
		{
			ret=sessionKeyPrefix+id;
		}
		
		var sessionKey=config.sessionKeyPrefix+id;

		if(typeof(callback)==="function")
		{
			return callback(err, ret);
		}
		else
		{
			return ret;
		}
	}

	var getSessionTTL=function(callback)
	{
		var ret=null;
		var err=null;

		// NOTE: This won't allow unlimited (null TTL) session durations (which is not a good idea generally anyway for many reasons)
		if(typeof(config.sessionExpirationSeconds)==="number" && config.sessionExpirationSeconds>0)
		{
			ret=config.sessionExpirationSeconds * 1000; // actionhero's cache setter needs times in ms for redis
		}
		else
		{
			ret=null;
			err="config.sessionExpirationSeconds is not set or is < 0";
		}

		if(typeof(callback)==="function")
		{
			return callback(err, ret);
		}
		else
		{
			return  ret;
		}
	}


	// Public methods

	// Load any existing session data
	this.load=function loadFn(connection, next, callback)
	{
		getSessionKey(connection, function(err, sessionKey)
		{
			getSessionTTL(function(err, sessionTTL)
			{
				if(err)
				{
					callback(err, null);
				}
				else
				{
					api.cache.load(sessionKey, {expireTimeMS: sessionTTL}, function(err, sessionData)
					{
						if(err)
						{
	// TODO Might be best to handle any errors internally here - returning an error object
						}
						
						sessionData=sessionData || {};

						// Copy the session data onto the configured sub-object of connection
						connection[config.sessionDataObjectNameOnConnection]=sessionData;
						
						return callback(err, sessionData);
					});
				}
			});
		});
	};

	// Save new session data, merging onto existing data
	this.save=function saveFn(connection, next, callback)
	{
		getSessionKey(connection, function(err, sessionKey)
		{
			getSessionTTL(function(err, sessionTTL)
			{
				if(err)
				{
					callback(err, null);
				}
				else
				{
					api.cache.save(sessionKey, connection[config.sessionDataObjectNameOnConnection], sessionTTL, function(err, overwrite)
					{
						var ret=null;

						if(err)
						{
	// TODO Might be best to handle any errors internally here - returning an error object
						}
						else
						{
							ret=true;
						}

						return callback(err, ret);
					});
				}
			});
		});
	};


	this.destroy=function destroyFn(connection, next, callback)
	{
		getSessionKey(connection, function(err, sessionKey)
		{
			if(err)
			{
				callback(err, null);
			}
			else
			{
				api.cache.destroy(sessionKey, function(err, success)
				{
					var ret=true;

					if(err)
					{
						ret=null;
					}

					return callback(err, ret);
				});
			}
		});
	};



	if(typeof(api)==="object")
	{
		init(api);
	}
};

module.exports=TDPAHSessionPlugin;
