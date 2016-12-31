# The WildWood Web

an Ajax wepage by [Leigh Michael Forrest](http://leighmforrest.github.io/portfolio)

Website: [http://leighmforrest.github.io/wildwood_web](http://leighmforrest.github.io/wildwood_web)

Github Repo: [https://github.com/leighmforrest/wildwood_web](https://github.com/leighmforrest/wildwood_web)

---

## Installation

There is very little preparation needed to get the webpage up and running. The dependecies are found in `bower_components`. Data is either contained in the data.js, or on Foursquare's API.

To install, clone the Github repo in the directory that will host your site and clone it: `git clone https://github.com/leighmforrest/wildwood_web.git .`

There is one detail that needs to be taken care of: the Foursquare API credentials. at the Foursquare developer site( [https://foursquare.com/developers/apps](https://foursquare.com/developers/apps)), register yourself and the application with the site. How to do this is shown on the site.

When you register your application and obtain your credentials, you need to add them to the files. in the map.js file, find the `$.ajax` call. Where the lines say `client_id`, and `client_secret`, replace the credentials there with your `client_id` and `client_secret`.

You are now ready to run the application.
