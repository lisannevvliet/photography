import express from 'express'
import { engine } from 'express-handlebars'
import fs from 'fs'
import ExifReader from 'exifreader'

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (_req, res) => {
    const path = 'public/images'
    const images = new Array()
    const names = []

    fs.readdirSync(path).forEach((name, index) => {
        if (name != '.DS_Store') {
            images[index] = {}
            images[index]['name'] = name
            images[index]['timestamp'] = ExifReader.load(fs.readFileSync(path + '/' + name))['DateTimeOriginal'].value
        }
    })

    images.sort((x, y) => x.timestamp - y.timestamp)
    images.forEach(image => names.push(image['name']))
    
    res.render('home', { images: names })    
})

app.listen(3000)