# The WildWood Web

an Ajax wepage by [Leigh Michael Forrest](http://leighmforrest.github.io/portfolio)

Website: <http://leighmforrest.github.io/wildwood_web>

Github Repo: <https://github.com/leighmforrest/wildwood_web>

--------------------------------------------------------------------------------

## Installation

To begin installation, clone the Github repo in the directory: `git clone https://github.com/leighmforrest/wildwood_web.git .`

### Code Preparation for Installation

There is one detail that needs to be taken care of: the Foursquare API credentials. at the Foursquare developer site( <https://foursquare.com/developers/apps>), register yourself and the application with the site. How to do this is shown on the site.

When you register your application and obtain your credentials, you need to add them to the files. in the map.js file, find the `$.ajax` call. Where the lines say `client_id`, and `client_secret`, replace the credentials there with your `client_id` and `client_secret`.

### Local Installation (using Webpack)

To install on your local machine, you will need Node.js and Webpack: <https://webpack.github.io/>. To install Webpack, run this command: `npm install webpack -g` When Webpack is installed, run this command: `webpack ./js/* bundle.js` This command will compile the code needed for the application.

To get it running, install the development server: `npm install webpack-dev-server -g` and run the server command: `webpack-dev-server --progress --colors` To view the webpage on the development server, go to url `http://localhost:8080/` It should work.
