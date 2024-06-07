
  // Get the current location from the browser
  function getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  // Create a map and add a tile layer
  async function createMap() {
    // Get the latitude and longitude from the location object
    let location = await getLocation();
    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude;

    // Log the coordinates to the console
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    // Create a Leaflet map object and set the view to the current coordinates
    let map = L.map('map').setView([latitude, longitude], 13);

    // Add a tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="^5^">OpenStreetMap</a> contributors, <a href="^6^">CC-BY-SA</a>, Imagery © <a href="^7^">CloudMade</a>',
      maxZoom: 18
    }).addTo(map);

    return map;
  }

  // Add a custom marker to the map
  function addMarker(map) {
    // Use a local image file as a custom marker icon in Leaflet.js
    let customIcon = L.icon({
      iconUrl: './customicon.png', // The relative URL of the image file
      iconSize: [50, 50], // The size of the icon
      iconAnchor: [25, 50], // The point of the icon which will correspond to the marker's location
      popupAnchor: [0, -50] // The point from which the popup should open relative to the iconAnchor
    });

    // Add a marker with the custom icon to the map
    L.marker(map.getCenter(), {icon: customIcon}).addTo(map)
      .bindPopup(`Your Local`)
      .openPopup();
  }

  // Call the functions to create and update the map
  createMap().then(map => {
    addMarker(map);
  });