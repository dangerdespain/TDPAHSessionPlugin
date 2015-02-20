#!/bin/bash

# Install NPM modules
npm install;

# Generate actionhero project skeleton
./node_modules/.bin/actionhero generate;

# Create (AH) config/plugins dir
mkdir -p "./config/plugins";

# Move the existing config file to the plugins dir created above
mv ./config/ah-tdp-session-plugin-config.js ./config/plugins/ah-tdp-session-plugin-config.js;