# Basics

#### /scripts

This folder contains a js app consisting of a collection of models, utility functions and an api layer that pulls all this together so you can use it all straight from the DOM using html data attributes.

Helpers are used in the Models which are used by Presenters. App.js is just for anything else that doesn't need a Helper or a Model such as something that uses a jQuery plugin.

We use grunt to concat all the helpers, models, presenters and app.js into the one main.js file.

To extend it on a per project basis, just add to the app.js file and go from there, if you need more abstraction then create models and concat them in the Gruntfile.js.


#### /styles

This folder contains all our sass: inut and soup. Make sure you are running at least version 3 or higher.


#### /docs

Todo! These need converting to jekyll properly as well as updating. But they are there at least.

You need jekyll installed: `gem install jekyll`. To run, navigate to /docs in the terminal and run `jekyll serve`.


#### /images

Drop your images in here...! When using svgs, drop them in /images/svg/src whilst running the ``grunt watch`` command and magically you will be able to use ``.icon__filename`` classes.


# Gory bits

#### NPM and Bower

You will need NPM so that you can run ``npm install`` and get all the grunt plugins we user. I recommend installing npm via [homebrew](http://brew.sh), its much more reliable.

Next, get [bower](http://bower.io) and run ``bower install`` to get all the third party resources we use (for example inuit).


#### Grunt

We use Grunt to compile everything, yay! There is a watch task that is handy and to be honest all you’ll ever want to run: ``grunt watch``. Read the file ``Gruntfile.js`` for all the really fun details.
