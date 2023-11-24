const {Router} = require('express')

const home = Router()

home.get('/', (req, res) =>{
    res.render('home')
})


module.exports.base_route = {
    route: "/",
    route_class: home
}