
// Image gallery
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.querySelector('.main-image');thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        const newSrc = this.src;
        mainImage.src = newSrc.replace('200/100', '800/400');
    });
});// Initialize map
const mapOptions = {
    center: new naver.maps.LatLng(37.50396465, 127.00076350),
    zoom: 15
};
const map = new naver.maps.Map('map', mapOptions);

// Add marker
new naver.maps.Marker({
    position: new naver.maps.LatLng(37.50396465, 127.00076350),
    map: map
});