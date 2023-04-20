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
                      center: { lat: pos.lat, lng: pos.lng },
                      zoom: 6,
                    });
                    infoWindow = new google.maps.InfoWindow();
                    
                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Location found.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                    const image =
                      "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
                      new google.maps.Marker({
                      position: { lat: position.coords.latitude, lng: position.coords.longitude },
                      map,
                      icon: image,
                    });
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
//   });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

window.initMap = initMap;