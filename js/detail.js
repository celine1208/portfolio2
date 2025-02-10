
// Image gallery
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.querySelector('.main-image');thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        const newSrc = this.src;
        mainImage.src = newSrc.replace('200/100', '800/400');
    });
});

// Naver map
var mapOptions = {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10
};

var map = new naver.maps.Map('map', mapOptions);