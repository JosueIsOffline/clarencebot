
// Importing Router from express
const {Router} = require('express')

// Creating a new Router instance for the home page
const home = Router()

// Defining a GET request for the home page
home.get('/', (req, res) =>{
    // Rendering the home page
    res.render('home')
})

// Exporting the base route configuration
module.exports.base_route = {
    // The base route for the home page
    route: "/",
    // The Router instance for the home page
    route_class: home
}
//
//In this code, we are creating a simple Express.js application with a single route for the home page. The comments provide a clear and concise explanation of each part of the code..</s>