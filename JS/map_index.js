// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;
let updateTimeout;
const updateTime = 5000;

function initMap() {
    localStorage.setItem("hurt", "0")
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map = new google.maps.Map(document.getElementById("map"), {
                    center: { lat: 55.589200, lng: 12.992339 },
                    zoom: 15,
                    mapTypeControl: false,
                    draggable: false,
                    clickable: false,
                    mapId: "a0111f479c8a0090",
                });
                // map.setCenter(pos);
                const image = "./IMG/dot.svg";
                const icon = new google.maps.Marker({
                    position: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                    map,
                    icon: new google.maps.MarkerImage(
                        image,
                        null,
                        null,
                        null,
                        new google.maps.Size(20, 20)
                    ),
                    draggable: false,
                    clickable: false,
                });
                render_constants();
                location_update(icon);
                console.log(icon);
            },
            () => {
                handle_location_error(true, infoWindow, map.getCenter());
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handle_location_error(false, infoWindow, map.getCenter());
    }
    //   });
}

function handle_location_error(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation ?
        "Error: The Geolocation service failed." :
        "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}

function location_update(icon) {
    navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };
        map.setCenter(pos)
        icon.setPosition(pos);
        if (localStorage.getItem("playerId") != null) {
            let options = {
                method: "PATCH",
                body: JSON.stringify({
                    user_id: localStorage.getItem("playerId"),
                    lat: pos.lat,
                    lng: pos.lng,
                }),
                headers: { "Content-Type": "application/json" },
            }
            console.log(options);
            fetch("./DB/mapAPI.php", options)
                .then(r => r.json())
                .then(r => console.log(r))
        }
        let hazard_zones_array = Array.from(
            document.querySelectorAll(".hazard_area")
        );
        if (hazard_zones_array[0]) {
            if (hazard_zones_array.some(z => hazard_zone_bool(z, pos))) {
                let hit = localStorage.getItem("hurt")
                if (hit < 1) {
                    let popup = document.getElementById("danger_popup")
                    popup.style.display = "flex"
                    popup.textContent = "Du står i en farozon!"
                    setTimeout(() => { popup.style.display = "none" }, 3000)
                    localStorage.setItem("hurt", ++hit)
                } else if (hit % 5 == 0) {
                    let popup = document.getElementById("danger_popup")
                    popup.style.display = "flex"
                    popup.textContent = "Du tog skada av farozonen, lämna området!"
                    setTimeout(() => { popup.style.display = "none" }, 3000)
                    checkFilledCircles()
                    localStorage.setItem("hurt", ++hit)
                } else {
                    localStorage.setItem("hurt", ++hit)
                }
            } else {
                localStorage.setItem("hurt", "0")
            };
        }
    });
    render_hazards();
    updateTimeout = setTimeout(() => {
        location_update(icon);
    }, updateTime);
}

function hazard_zone_bool(z, player_pos) {
    let hazard_pos = { lat: z.dataset.lat, lng: z.dataset.lng };
    let newRadius = distanceInKmBetweenEarthCoordinates(
        hazard_pos.lat,
        hazard_pos.lng,
        player_pos.lat + 0.00009,
        player_pos.lng
    );

    let radius = 0.071;

    return newRadius <= radius;
}

function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6378;

    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

function create_hazard_div(latLng) {
    let danger_div = document.createElement("div");
    danger_div.dataset.lng = latLng.lng;
    danger_div.dataset.lat = latLng.lat;
    danger_div.classList.add("hazard_area");
    document.querySelector("#dangers").append(danger_div);
}

async function render_constants() {
    let response = await fetch("./DB/mapAPI.php");
    let hazards = await response.json();

    document.querySelector("#dangers").innerHTML = "";
    hazards.forEach((hazard) => {
        if (hazard.time <= 0) {
            let latLng = { lat: Number(hazard.lat), lng: Number(hazard.lng) };
            let dangerCircle;
            if (hazard.type === "fire") {
                dangerCircle = new google.maps.Circle({
                    strokeColor: "#FF0000",
                    strokeOpacity: 0,
                    strokeWeight: 2,
                    fillColor: "#FF0000",
                    fillOpacity: 1,
                    center: latLng,
                    map,
                    draggable: false,
                    clickable: false,
                    radius: 75,
                });
            }
            create_hazard_div(latLng);
        }
    });
}

async function render_hazards() {
    let response = await fetch("./DB/mapAPI.php");
    let hazards = await response.json();

    document.querySelector("#dangers").innerHTML = "";
    hazards.forEach((hazard) => {
        if (hazard.time <= 0) {} else {
            let latLng = { lat: Number(hazard.lat), lng: Number(hazard.lng) };
            let dangerCircle;
            if (hazard.type === "fire") {
                dangerCircle = new google.maps.Circle({
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#FF0000",
                    fillOpacity: 0.35,
                    center: latLng,
                    map,
                    draggable: false,
                    clickable: false,
                    radius: 75,
                });
            } else {
                dangerCircle = new google.maps.Circle({
                    strokeColor: "#0000FF",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#0000FF",
                    fillOpacity: 0.35,
                    center: latLng,
                    map,
                    draggable: false,
                    clickable: false,
                    radius: 75,
                });
            }
            create_hazard_div(latLng);
            setTimeout(() => {
                dangerCircle.setMap(null);
            }, updateTime * 1.5);
        }
    });
}

window.initMap = initMap;