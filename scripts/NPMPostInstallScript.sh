#!/bin/bash

# This script is solely for NPM installs, to be run after the initial "npm install"
# it is not used for travis tests, see travisScript.sh for that


# TODO: Work out a way to automatically add the plugin name to the <root>/config/api.js in general.paths []

echo "NPM post install script"

# We'll wrap this in a condition so it can't fail - e.g. on travis
if [ -e ./config/TDPAHSessionPluginConfigDefaults.js ]
	then 
		# Create (AH) config/plugins dir if it doesn't exist
		mkdir -p "../../config/plugins";

		# copy config file to AH
		cp ./config/TDPAHSessionPluginConfigDefaults.js ../../config/plugins/TDPAHSessionPlugin.js;
fi