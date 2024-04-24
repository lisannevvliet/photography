const img = document.querySelector('div.overlay div img')
const overlay = document.querySelector('div.overlay')

document.querySelectorAll('div.images img').forEach(image =>
    image.addEventListener('click', element => {
        img.src = element.target.src
        overlay.classList.add('show')
        overlay.classList.remove('hide')
    })
)

overlay.addEventListener('click', () => {
    overlay.classList.add('hide')
    overlay.classList.remove('show')
})

img.addEventListener('click', event =>
    event.stopPropagation()
)