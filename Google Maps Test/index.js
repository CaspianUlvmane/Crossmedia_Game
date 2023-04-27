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
                      mapId: "a0111f479c8a0090"
                    });
                    map.setCenter(pos)
                    const image =
                      "./dot.svg";
                     const icon = new google.maps.Marker({
                      position: { lat: position.coords.latitude, lng: position.coords.longitude },
                      map,
                      icon: new google.maps.MarkerImage(image, null, null, null, new google.maps.Size(20,20)),
                      draggable: false
                    });
                    location_update(icon)
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

function location_update (icon){
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      icon.setPosition(pos)
    })
    console.log(icon);
  setTimeout(() => {location_update(icon)}, 5000)
}

function create_hazard_buttons(){
  let Hazards = [
    {
      hazard: "Fire",
      color: "red",
    },
    {
      hazard: "Water",
      color: "blue"
    }
  ]

  Hazards.forEach(h => {
    let div = document.createElement("div")
    div.classList.add("hazard")
    div.id = h.hazard
    div.style.backgroundColor = h.color
    // div.addEventListener("click", toggle_hazard)
    document.getElementById("hazard_buttons").append(div)
  })
}

function send_hazard(hazard){

}

window.initMap = initMap;
create_hazard_buttons()
