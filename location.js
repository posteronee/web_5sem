let myMap;
let myPlacemark1;


ymaps.ready(init);

function init() {
    myMap = new ymaps.Map('map', {
        center: [54.745734, 20.682443],
        zoom: 10
    });

    myPlacemark1 = new ymaps.Placemark([54.745734, 20.682443], {
        iconContent: '1',
        hintContent: 'Kenigcherry'
    }, {
        preset: 'twirl#violetIcon'
    })

    myMap.geoObjects.add(myPlacemark1);

    myMap.controls.add(
        new ymaps.control.ZoomControl()
    );

    myMap.controls.add('typeSelector');
}
