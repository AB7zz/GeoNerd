const confirmPin = document.getElementById('confirmPin');
function initMap(){
    confirmPin.disabled = true;
    let myLatLng;
    let zoomVal;
    if(mode=="middleeast"){
        myLatLng = { lat: 24.79360866539293, lng: 42.63691120388848 };
        zoomVal = 3;
    }else if(mode=="europe"){
        myLatLng = { lat: 46.37166748852439, lng: 14.916301179034187 };
        zoomVal = 3;
    }else if(mode=="northamerica"){
        myLatLng = { lat: 45.99077953053835, lng: -105.33510075773074 };
        zoomVal = 2;
    }else if(mode=="southamerica"){
        myLatLng = { lat: -23.18894341606518, lng: -58.82929816801125 };
        zoomVal = 2;
    }else if(mode=="australia"){
        myLatLng = { lat: -24.15487320484811, lng: 134.5638389324763 };
        zoomVal = 2;
    }else if(mode=="world" || mode=="famous"){
        myLatLng = { lat: 29.55320816750227, lng: -4.750033235036346 };
        zoomVal = 1;
    }else if(mode=="asia"){
        myLatLng = { lat: 26.292966327268765, lng: 105.95316428653376    };
        zoomVal = 2;
    }else if(mode=="africa"){
        myLatLng = { lat: 0.04401599461441711, lng: 25.383148861553586 };
        zoomVal = 2;
    }
    const markerArray = [];
    let map = new google.maps.Map(document.getElementById("map"), {
        zoom: zoomVal,
        center: myLatLng,
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
        keyboardShortcuts: false,
    });
    function deleteMarker(markerArray) {
        for (let i = 0; i < markerArray.length; i++) {
            markerArray[i].setMap(null);
        }
        markerArray = [];
    } 
    const handler = (api) => {
        markerArray.push(new google.maps.Marker({
            map,
            position: {lat: parseFloat(JSON.stringify(api.latLng.toJSON().lat)), lng: parseFloat(JSON.stringify(api.latLng.toJSON().lng))},
            icon: "images/redmark.png",
        }));
        document.getElementById("latitude").value = JSON.stringify(api.latLng.toJSON().lat);
        document.getElementById("longitude").value = JSON.stringify(api.latLng.toJSON().lng);
    };
    
    map.addListener("click", (mapsMouseEvent) => {
        confirmPin.disabled = false;
        deleteMarker(markerArray);
        const api = mapsMouseEvent;
        handler(api);
        return handler;
    });
}
let distance;
function calcDistance(lat1,lat2,lon1,lon2)
{
    lon1 =  lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;


    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
    + Math.cos(lat1) * Math.cos(lat2)
    * Math.pow(Math.sin(dlon / 2),2);

    let c = 2 * Math.asin(Math.sqrt(a));

    
    let r = 6371;

    distance = c*r;
}
confirmPin.addEventListener('click', () => {
    const origin = parseFloat(document.getElementById("latitude").value) + ',' + parseFloat(document.getElementById("longitude").value);
    // console.log('Origin:', origin);

    // const revGeo = 'https://open.mapquestapi.com/geocoding/v1/reverse?key=VhCAzoCdq1iw3EUcNRezRhbXmIdsfxq9&location='+document.getElementById('latitude').value+','+document.getElementById('longitude').value+'&includeRoadMetadata=true&includeNearestIntersection=true';
    // fetch(revGeo)
    //     .then(function(response){
    //         return response.json();
    //     })
    //     .then(async function(data){
    //         const origin = data.results[0].locations[0].adminArea1 + ' ' + data.results[0].locations[0].adminArea3 + ' ' + data.results[0].locations[0].adminArea4 + ' ' + data.results[0].locations[0].adminArea5 + ' ' + data.results[0].locations[0].adminArea6 + ' ' + data.results[0].locations[0].street;
    //         document.getElementById('address').value = origin;
            
    //         });
    //     }
    // );

    // const bounds = new google.maps.LatLngBounds();
    const markersArray = [];
    let score = 0;
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: (parseFloat(document.getElementById("latitude").value)+parseFloat(document.getElementById("destLat").value))/2, lng: (parseFloat(document.getElementById("longitude").value)+parseFloat(document.getElementById("destLong").value))/2 },
        zoom: 3,
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
        keyboardShortcuts: false,
    });
    const lineSymbol = {
        path: "M 0,-1 0,1",
        strokeOpacity: 1,
        scale: 3,
    };
    const line = new google.maps.Polyline({
        path: [
            { lat: parseFloat(document.getElementById("latitude").value), lng: parseFloat(document.getElementById("longitude").value) },
            { lat: parseFloat(document.getElementById("destLat").value), lng: parseFloat(document.getElementById("destLong").value) },
        ],
        strokeOpacity: 0,
        icons: [
        {
            icon: lineSymbol,
            offset: "0",
            repeat: "20px",
        },
        ],
        map: map,
    });
    // const geocoder = new google.maps.Geocoder();
    // const service = new google.maps.DistanceMatrixService();
    
    
    // const request = {
    //     origins: [origin],
    //     destinations: [destination],
    //     travelMode: google.maps.TravelMode.DRIVING,
    //     unitSystem: google.maps.UnitSystem.METRIC,
    //     avoidHighways: false,
    //     avoidTolls: false,
    // };
    
    
    
    // service.getDistanceMatrix(request).then(async (response) => {
        // console.log(response);
        // let string = response.rows[0].elements[0].status;
        // let status = string.replace(/["]+/g,     '');
        // if(status!="ZERO_RESULTS"){
            // document.getElementById("distance").innerText = response.rows[0].elements[0].distance.text.replace(/["]+/g, '');
            // console.log(response);
        // }else{
            calcDistance(document.getElementById('latitude').value,document.getElementById('destLat').value,document.getElementById('longitude').value,document.getElementById('destLong').value);
            document.getElementById("distance").innerText = Math.round(distance).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            // console.log('ERROR: Google API did not work', distance);
            // console.log(playerId);
            socket.emit('score-inc', ({playerId, roomId, distance}));
        // }

        
        // const originList = response.originAddresses;
        // const destinationList = response.destinationAddresses;

        deleteMarkers(markersArray);

        // const showGeocodedAddressOnMap = (asDestination) => {
        //     const handler = ({ results }) => {
                   // map.fitBounds(bounds.extend(results[0].geometry.location));
        //         markersArray.push(
        //             new google.maps.Marker({
        //                 map,
        //                 position: results[0].geometry.location,
        //                 icon: asDestination ? "images/greenmark.png" : "images/redmark.png",
        //             })
        //         );
        //     };
        //     return handler;
        // };

        
        const handler = (asDestination) => {
            markersArray.push(
                new google.maps.Marker({
                    map,
                    position: asDestination ? { lat: parseFloat(document.getElementById("destLat").value), lng: parseFloat(document.getElementById("destLong").value) } : { lat: parseFloat(document.getElementById("latitude").value), lng: parseFloat(document.getElementById("longitude").value) },
                    icon: asDestination ? "images/greenmark.png" : "images/redmark.png",
                })
            );
        };

        // for (let i = 0; i < originList.length; i++) {
        //     const results = response.rows[i].elements;
        //     geocoder
        //     .geocode({ address: originList[i] })
        //     .then(showGeocodedAddressOnMap(false));

        //     for (let j = 0; j < results.length; j++) {
        //         geocoder
        //         .geocode({ address: destinationList[j] })
        //         .then(showGeocodedAddressOnMap(true));
        //     }
        // }

        // for (let i = 0; i < 1; i++) {
        //     handler(false);
        //     for (let j = 0; j < 1; j++) {
        //         handler(true);
        //     }
        //     return handler;
        // }
        
        handler(false); 
        handler(true);

        function deleteMarkers(markersArray) {
            for (let i = 0; i < markersArray.length; i++) {
                markersArray[i].setMap(null);
            }
            markersArray = [];
        }  
    // });                                         
})