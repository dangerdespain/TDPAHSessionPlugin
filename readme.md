#TDPAHSessionPlugin

##Version
Master: V2.0.4  

[![Travis CI build status icon](https://api.travis-ci.org/neilstuartcraig/TDPAHSessionPlugin.svg)](https://travis-ci.org/neilstuartcraig/TDPAHSessionPlugin) 
[![Code Climate](https://codeclimate.com/github/neilstuartcraig/TDPAHSessionPlugin/badges/gpa.svg)](https://codeclimate.com/github/neilstuartcraig/TDPAHSessionPlugin) 
[![Coverage Status](https://img.shields.io/coveralls/neilstuartcraig/TDPAHSessionPlugin.svg)](https://coveralls.io/r/neilstuartcraig/TDPAHSessionPlugin) 
[![Dependency Status](https://gemnasium.com/neilstuartcraig/TDPAHSessionPlugin.svg)](https://gemnasium.com/neilstuartcraig/TDPAHSessionPlugin) 

##Semver
This project aims to maintain the [semver](http://semver.org/) version numbering scheme.

##Changelog
See the [changelog](./changelog.md) file

##Overview
A simple session data handler for the [actionhero](https://github.com/evantahler/actionhero/) API framework which uses the built-in Redis (or fake-redis for testing) backend.

TDPAHSessionPlugin is designed specifically for use with the actionHero API framework and thus is unlikely to work directly with any other application. You're welcome to fork and modify of course if that is of interest of course.

##Features
* Really simple to use, just store your data in an object (a sub-object of the actionhero `connection` object) and the plugin will handle the rest automatically
* Uses the built-in Redis cache in actionhero
* Uses the existing `connection.fingerpint` (or `connection.id` if the fingerprint doesn't exist) as the session identifier
* Very simple to use, minimal (if any) configuration needed
* Configurable:
    * Session key prefix (default: "session_")
    * `connection` sub-object name (default: "sessionData")
    * Session expiration time (default: 1200 seconds - 20 minutes)
* Asynchronous operation throughout
* Included unit tests, automatically run via Travis-CI
* Included default actions for automated testing
* Included initialiser
* Supports dedicated per actionhero environment configurations

##Requirements  
###Prerequisite since it's the plugin host
* [actionhero](https://github.com/evantahler/actionhero)

###Production requirements


###Development/test requirements
* [mocha](https://github.com/mochajs/mocha)  
* [should](https://github.com/shouldjs/should.js)
* [actionhero](https://github.com/evantahler/actionhero)

##Installation
Installation is relatively simple and is simplest using `npm`:

```sh
# Install actionhero (skip this if you have already got it installed)
npm install actionhero

# Generate a skeleton actionhero project (skip if already done)
./node_modules/.bin/actionhero generate

# Install ah-tdp-session-plugin (and save to package.json file - optional)
npm install ah-tdp-session-plugin --save
```

Then you'll need to edit the actionhero config file, `config/api.js` and add the plugin name into the `plugins` array.

After that, you can start your API server using `npm start`.

No doubt you'll want to change lots more things but the above is a generic set of instructions.

##Usage
This module is an actionhero [plugin](http://actionherojs.com/docs/core/plugins.html) so it conforms to the base requirements, this means it provides:

* Actions
* An initialiser
* An editable, userland config file (which is actionhero 'environment' (development, production etc.) aware) which will appear as `<project root>/config/plugins/TDPAHSessionPlugin.js` assuming the postinstall NPM script worked properly
* The core module itself

##Configuration
You should edit the userland config file as required, this is where you can customise the module to fit your project requirements. This file will not be replaced by module updates so you need to manually keep it up to date, at least until I create some automated method. 

For detailed explanation of the fields, check the userland or [default config file comments](./config/TDPAHSessionPluginConfigDefaults.js).

###Configuration file: environments
Configuration options can be defined for all or (overridden) for individual environments using the following structure:  

```js
exports.default=
{
    AHTDPSessionPlugin: function(api)
    {
        return {
            ...
        }
    }
}

exports.production=
{
    AHTDPSessionPlugin: function(api)
    {
        return {
            ...
        }
    }
}

...

```

This structure is as per the common actionhero configuration model. The environment is set via a environment variable (on *nix systems this is NODE_ENV) which override the base/default options in exports.defaults{}. So you should put common (environment agnostic/independent) configuration options in the exports.defaults{} section and then override/augment those with any environment-specific options as required.

##Actions
The included actions are for automated testing only and can be ignored.

##Constructor
The constructor is very simple and since the module is function-scoped, it requires the 'new' syntax in the constructor to instantiate a new instance e.g.:

```js
var TDPAHSessionPlugin=require("ah-tdp-session-plugin");
var session=new TDPAHSessionPlugin(api); // (where api is the actionhero api instance)
...
```

The module will self-initialise, using the actionhero environment-specific config options. A successful initialisation results in an object being returned

##Public methods

###General principals
All public methods conform to the below principals:

* They are asynchronous and thus receive a callback function as the last argument
* They will (in async mode) return two values, error and result, where:
    * error is a string, object or array if an error occurred, null otherwise
    * result is a string, object, array, number etc. on success, null otherwise
* They will never throw errors, instead they will return accordingly
* All arguments are required


###load(connection, next, callback)
Load any existing session data (onto the configured sub-object of the `connection` object).

####Arguments
#####connection (object)
The actionhero `connection` object

#####next (string)
The actionhero `next()` function

#####callback (function)
The callback function to execute on completion of this function. 

####Returns (callback arguments)
The callback function currently receives two arguments:
* `err` (string || null) - A descriptive error or `null` if no error occurred
* `sessionData` (object || null) - the loaded sessionData object (or `null` if an error occurred)



###save(connection, next, callback)
Save session data (from the configured sub-object of the `connection` object) to the storage backend (redis).

####Arguments
#####connection (object)
The actionhero `connection` object

#####next (string)
The actionhero `next()` function

#####callback (function)
The callback function to execute on completion of this function. 

####Returns (callback arguments)
The callback function currently receives two arguments:
* `err` (string || null) - A descriptive error or `null` if no error occurred
* `success` (boolean || null) - true on success (or `null` if an error occurred)


###destroy(connection, next, callback)
Destroy session data in the storage backend (redis).

####Arguments
#####connection (object)
The actionhero `connection` object

#####next (string)
The actionhero `next()` function

#####callback (function)
The callback function to execute on completion of this function. 

####Returns (callback arguments)
The callback function currently receives two arguments:
* `err` (string || null) - A descriptive error or `null` if no error occurred
* `success` (boolean || null) - true on success (or `null` if an error occurred)


##To do/roadmap
* Include the `destroy()` method in the unit tests
* Consider sanitising input (at least as an option)
* Consider adding a dedicated storage layer (option) to enable better security through segregation
* Consider encryption of session data


##Tests
[Tests](./test) currently run automatically in `travis` and use `mocha` and `should`.


##License
ah-tdp-session-plugin is issued under a [Creative Commons attribution share-alike license](http://creativecommons.org/licenses/by-sa/4.0/deed.en_GB).
This means you can share and adapt the code provided you attribute the original aclor(s) and you share your resulting source code. If, for some specific reason you need to use this library under a different license then please contact me and i'll see what I can do - though I should mention that I am committed to all my code being open-source so closed licenses will almost certainly not be possible.
