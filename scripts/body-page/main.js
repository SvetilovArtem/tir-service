// Animation

const animItems = document.querySelectorAll('._anim-items')

if(animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll)
    function animOnScroll(params) {
        for(let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index]
            const animItemHeight = animItem.offsetHeight
            const animItemOffset = offset(animItem).top
            const animStart = 16

            let animItemPoint = window.innerHeight - animItemHeight / animStart
            if(animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart
            }

            if((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active')
            } else {
                if(!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active')
                }
            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    animOnScroll()
}

// BURGER MENU
const hiddenMenu = document.querySelector('.nav-list')
const burger = document.querySelector('.burger')

burger.addEventListener('click', () => {
    hiddenMenu.classList.toggle('_active')
})

// NAVIGATOR
const mapLink = document.querySelector('.map-link')
mapLink.addEventListener('click', findLocation)

function findLocation() {
    if (!navigator.geolocation) {
      confirm('Ваш браузер не дружит с геолокацией...')
    } else {
      navigator.geolocation.getCurrentPosition(success, error)
    }
  
    function success(position) {
      const { longitude, latitude }  = position.coords

      const targetLong = '53.851527'
      const targetLat = '27.694907'
  
      mapLink.href = `yandexnavi://build_route_on_map?lat_from=${latitude}&lon_from=${longitude}&lat_to=${targetLat}&lon_to=${targetLong}`
      window.open(mapLink.href)
    }
  
    function error() {
      confirm('Не получается определить вашу геолокацию :(')
    }
}


