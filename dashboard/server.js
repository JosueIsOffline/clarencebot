const Express = require('express')

require('dotenv').config()
const port = process.env.PORT || 4000
const app = Express()
const fs = require('fs').promises
const path = require('path')
app.logger = require('../utils/logger')


app.set('views', path.join(__dirname, 'Views'))
app.set('view engine', 'pug')

const loadRoutes = async (directoy) => {
    const files = await fs.readdir(directoy, {withFileTypes: true})
    for(const file of files){
        const fullPath = path.join(directoy, file.name)
        if(file.isDirectory()){
            await loadRoutes(fullPath)
        }
        else if(file.name.endsWith('.js')){
            const route = require(fullPath)
            app.use(route.base_route.route, route.base_route.route_class)
            app.logger.log(`Route loaded ${route.base_route.route}`, 'success')
        }
    }
}

loadRoutes(path.join(__dirname, "Routes"))
    .then(() => {
        app.get('*', (req, res) => {
            app.logger.log('User used an invalid route')
            res.redirect('/')
        })
        app.listen(port, () => {
            app.logger.log(`Server is on ${port}`, 'info') 
        })
    })
    .catch((e) => {
        app.logger.log(e, 'error')
    })
