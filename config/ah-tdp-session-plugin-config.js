/*jslint node: true */
"use strict";

exports.default=
{
	AHTDPSessionPlugin: function(api)
	{
	    return {
	    	sessionKeyPrefix:"session_", // The Redis key prefix to use
			sessionDataObjectNameOnConnection:"sessionData", // The sub-object of connection which hosts the session object
			sessionExpirationSeconds:1200 // The TTL on the Redis session data which effectively controls the session timeout/duration. Note: This can be e.g. 0.1 for 0.1 seconds if required
		}
	}
};

exports.production=
{
	AHTDPSessionPlugin: function(api)
	{
	    return {
			
	    }
	}
};

exports.uat=
{
	AHTDPSessionPlugin: function(api)
	{
	    return {
			
	    }
	}
};

exports.development=
{
	AHTDPSessionPlugin: function(api)
	{
	    return {
			
	    }
	}
};



