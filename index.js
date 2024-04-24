import express from 'express'
import { engine } from 'express-handlebars'
import fs from 'fs'
import ExifReader from 'exifreader'

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(express.static('public'))

function sortImages(directory) {
    const images = new Array()
    const sortedImages = []

    fs.readdirSync(directory).forEach((file, index) => {
        const path = directory + '/' + file
    
        if (fs.lstatSync(path).isFile() && file != '.DS_Store') {
            images[index] = {}
            images[index]['name'] = file
            images[index]['timestamp'] = ExifReader.load(fs.readFileSync(path))['DateTimeOriginal'].value
        }
    })

    images.sort((x, y) => x.timestamp - y.timestamp)
    images.forEach(image => sortedImages.push(image['name']))

    return sortedImages
}

app.get('/photo-series', (_req, res) => {
    res.render('photo-series', { images: sortImages('public/images/selfless-activism') })
})

app.get('/about', (_req, res) => {
    res.render('about')
})

app.get('/contact', (_req, res) => {
    res.render('contact')
})

app.get('/', (_req, res) => {
    res.render('home', { images: sortImages('public/images') })
})

app.listen(3000)