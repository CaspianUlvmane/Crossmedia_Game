// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

function initMap() {
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
    console.log(pos);
  });

  let hazard_zones_array = Array.from(
    document.querySelectorAll(".hazard_area")
  );
  if (hazard_zones_array[0]) {
    hazard_zones_array.forEach((z) => {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        if (hazard_zone_bool(z, pos)) {
          console.log("damage taken");
        }
      });
    });
  }
  setTimeout(() => {
    location_update(icon);
  }, 5000);
}

function hazard_zone_bool(z, player_pos) {
  let hazard_pos = { lat: z.dataset.lat, lng: z.dataset.lng };
  let newRadius = distanceInKmBetweenEarthCoordinates(
    hazard_pos.lat,
    hazard_pos.lng,
    player_pos.lat+0.00009,
    player_pos.lng
  );

console.log(hazard_pos);

  let radius = 0.071;

  console.log(newRadius);
  console.log(radius);

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
      hazard: "Fire",
      color: "red",
    },
    {
      hazard: "Water",
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

let latLng = mapsMouseEvent.latLng.toString().replace("(", "").replace(")", "").replace(",", "")

latLng = latLng.split(" ")

console.log(latLng);

  if (hazard_div) {
    let danger_div = document.createElement("div");
    danger_div.style.position = "absolute";
    danger_div.style.top = mapsMouseEvent.domEvent.pageY - 75 + "px";
    danger_div.style.left = mapsMouseEvent.domEvent.pageX - 75 + "px";
    danger_div.dataset.lng = latLng[1];
    danger_div.dataset.lat = latLng[0];
    danger_div.style.width = "150px";
    danger_div.style.height = "150px";
    danger_div.style.zIndex = 10;
    danger_div.classList.add("hazard_area");
    danger_div.classList.add(hazard_div.id);
    document.querySelector("body").append(danger_div);
    setTimeout(() => {
      danger_div.remove();
    }, 300000);
  }
}

window.initMap = initMap;
create_hazard_buttons();

// window.addEventListener("click", send_hazard);
