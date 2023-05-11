// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

const updateTime = 5000;

function initMap() {
  //   const locationButton = document.createElement("button");

  //   locationButton.textContent = "Pan to Current Location";
  //   locationButton.classList.add("custom-map-control-button");
  //   map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  // locationButton.addEventListener("click", () => {
  // Try HTML5 geolocation.
  //   const locationButton = document.createElement("button");

  //   locationButton.textContent = "Pan to Current Location";
  //   locationButton.classList.add("custom-map-control-button");
  //   map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  // locationButton.addEventListener("click", () => {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 55.590463, lng: 12.992339 },
          zoom: 16.5,
          draggable: false,
          mapId: "a0111f479c8a0090",
        });
        map.setCenter(pos);
        const image = "./dot.svg";
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
        location_update(icon);
        map.addListener("click", (mapsMouseEvent) => {
          send_hazard(mapsMouseEvent, map);
        });
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
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

function location_update(icon) {
  navigator.geolocation.getCurrentPosition((position) => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    icon.setPosition(pos);
    let hazard_zones_array = Array.from(
      document.querySelectorAll(".hazard_area")
    );
    if (hazard_zones_array[0]) {
      hazard_zones_array.forEach((z) => {
        if (hazard_zone_bool(z, pos)) {
          console.log("damage taken");
        }
      });
    }
  });
  render_hazards();
  setTimeout(() => {
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

function create_hazard_buttons() {
  let Hazards = [
    {
      hazard: "fire",
      color: "red",
    },
    {
      hazard: "water",
      color: "blue",
    },
  ];

  Hazards.forEach((h) => {
    let div = document.createElement("div");
    div.classList.add("hazard");
    div.id = h.hazard;
    div.style.backgroundColor = h.color;
    div.addEventListener("click", toggle_hazard);
    document.getElementById("hazard_buttons").append(div);
  });
}

function toggle_hazard(event) {
  event.stopPropagation();
  if (event.target.classList.contains("active")) {
    event.target.classList.remove("active");
  } else {
    let hazard_button_array = Array.from(document.querySelectorAll(".hazard"));
    hazard_button_array.forEach((e) => e.classList.remove("active"));
    event.target.classList.add("active");
  }
}

function send_hazard(mapsMouseEvent, map) {
  let hazard_div = document.querySelector(".active");

  let latLng = mapsMouseEvent.latLng
    .toString()
    .replace("(", "")
    .replace(")", "")
    .replace(",", "");

  latLng = latLng.split(" ");

  if (hazard_div) {
    let time = document.getElementById("time").value * 60 * 1000;

    let options = {
      method: "POST",
      body: JSON.stringify({
        type: hazard_div.id,
        lat: latLng[0],
        lng: latLng[1],
        time: time,
      }),
      headers: { "Content-Type": "application/json" },
    };
    fetch("./mapAPI.php", options)
      .then((r) => r.text())
      .then((r) => {
        if (time != 0) {
          options = {
            method: "DELETE",
            body: JSON.stringify({ id: r }),
            headers: { "Content-Type": "application/json" },
          };
          setTimeout(() => {
            fetch("./mapAPI.php", options);
          }, time);
        }
        render_hazards();
      });
  }
}

function create_hazard_div(latLng) {
  let danger_div = document.createElement("div");
  danger_div.dataset.lng = latLng.lng;
  danger_div.dataset.lat = latLng.lat;
  danger_div.classList.add("hazard_area")
  document.querySelector("#dangers").append(danger_div);
}

function pointer_position(event) {
  let pointer = document.getElementById("pointer");
  pointer.style.left = event.pageX - 75 + "px";
  pointer.style.top = event.pageY - 75 + "px";
}

async function render_hazards() {
  let response = await fetch("./mapAPI.php");
  let resource = await response.json();
  let hazards = JSON.parse(resource);
  document.querySelector("#dangers").innerHTML = "";
  hazards.forEach((hazard) => {
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
  });
}

window.initMap = initMap;
create_hazard_buttons();
window.addEventListener("mousemove", pointer_position);
