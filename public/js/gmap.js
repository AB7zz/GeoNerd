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
            calcDistance(document.getElementById('latitude').value,document.getElementById('destLat').value,document.getElementById('longitude').value,document.getElementById('destLong').value);
            document.getElementById("distance").innerText = Math.round(distance).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            socket.emit('score-inc', ({playerId, roomId, distance}));

        deleteMarkers(markersArray);

        
        const handler = (asDestination) => {
            markersArray.push(
                new google.maps.Marker({
                    map,
                    position: asDestination ? { lat: parseFloat(document.getElementById("destLat").value), lng: parseFloat(document.getElementById("destLong").value) } : { lat: parseFloat(document.getElementById("latitude").value), lng: parseFloat(document.getElementById("longitude").value) },
                    icon: asDestination ? "images/greenmark.png" : "images/redmark.png",
                })
            );
        };
        
        handler(false); 
        handler(true);

        function deleteMarkers(markersArray) {
            for (let i = 0; i < markersArray.length; i++) {
                markersArray[i].setMap(null);
            }
            markersArray = [];
        }                                         
})