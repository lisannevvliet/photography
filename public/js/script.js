document.querySelectorAll('ul li a').forEach(anchor => {
    if (anchor.textContent == 'Home' && window.location.pathname.substring(1) == '' || anchor.textContent.replace(/\s+/g, '-').toLowerCase() == window.location.pathname.substring(1)) {
        anchor.classList.add('active')
    } else {
        anchor.classList.remove('active')
    }
})

if (window.location.pathname.substring(1) == '' || window.location.pathname.substring(1) == 'photo-series') {
    const overlayImage = document.querySelector('div.overlay div img')
    const overlay = document.querySelector('div.overlay')

    document.querySelectorAll('div.images img').forEach(image =>
        image.addEventListener('click', element => {
            overlayImage.src = element.target.src
            overlay.classList.add('show')
            overlay.classList.remove('hide')
        })
    )
    
    overlay.addEventListener('click', () => {
        overlay.classList.add('hide')
        overlay.classList.remove('show')
    })
    
    overlayImage.addEventListener('click', event =>
        event.stopPropagation()
    )
}