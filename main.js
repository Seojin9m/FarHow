var map;

function initMap() {
    var location = {
        lat: 43.651070, 
        lng: -79.347015
    };
    var options = {
        center: location,
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    if(navigator.geolocation) {
        console.log('Geolocation is here!');
        navigator.geolocation.getCurrentPosition((loc) => {
            location.lat = loc.coords.latitude;
            location.lng = loc.coords.longitude;
            map = new google.maps.Map(document.getElementById("map"), options);
        },
        (err) => {
            console.log("User clicked block");
            map = new google.maps.Map(document.getElementById("map"), options);
        })
    } else {
        console.log('Geolocation is not supported :(');
        map = new google.maps.Map(document.getElementById("map"), options);
    }

    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();

    directionsDisplay.setMap(map);

    autocomplete = new google.maps.places.Autocomplete(document.getElementById("input"), 
    {
        types: ['establishment'],
    });
}

function calculateRoute() {
    var location = {
        lat: 43.43705627076827, 
        lng: -79.75267155020909
    };

    var request = {
        origin: location,
        destination: document.getElementById("input").value,
        travelMode: google.maps.TravelMode.DRIVING, // WALKING
        unitSystem: google.maps.UnitSystem.METRIC
    }
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            const output = document.getElementById("output");
            output.innerHTML = "<div class='alert-info'> From: Your Location " + "<br />To: " + document.getElementById("input").value + " <br />Driving Disatnce: " + result.routes[0].legs[0].distance.text + " <br />Driving Duration: " + result.routes[0].legs[0].duration.text + "</div>";
            directionsDisplay.setDirections(result);
        } else {
            directionsDisplay.setDirections({routes: []});
            map.setCenter(location);
            output.innerHTML = "<div class='alert-danger'> Could Not Retrieve Driving Distance </div>";
        }
    });
}