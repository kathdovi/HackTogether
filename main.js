

// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:

var map, heatmap;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: 30.2672, lng: -97.7431 },
        mapTypeId: 'satellite'
    });
}

function toggleHeatmap() {
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map
    });
    heatmap.setMap(heatmap.getMap() ? null : map);
}

function togglePothole() {

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPointsPothole(),
        map: map
    });
    heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
    var gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
    ]
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
    heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
    heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

// Heatmap data: 500 Points
function getPoints() {
    let points = [];
    $.get("https://data.austintexas.gov/resource/5h38-fd8d.json?$query=SELECT%20sr_location_lat_long,%20sr_department_desc%20WHERE%20sr_location_lat_long%20IS%20NOT%20NULL%20LIMIT%2050000", (data) => {
        data.forEach(e => {
            let long = e.sr_location_lat_long.coordinates[0];
            let lat = e.sr_location_lat_long.coordinates[1];
            let obj = new google.maps.LatLng(lat, long);
            points.push(obj);
        })
        console.log(points)
    })
    return points;
}

function getPointsPothole() {
    let points = [];
    $.get("https://data.austintexas.gov/resource/5h38-fd8d.json?$query=SELECT%20sr_location_lat_long,%20sr_type_desc%20WHERE%20sr_location_lat_long%20IS%20NOT%20NULL%20LIMIT%2050000", (data) => {
        data.forEach(e => {
            if (e.sr_type_desc.toLowerCase().includes("pothole")) {
                let long = e.sr_location_lat_long.coordinates[0];
                let lat = e.sr_location_lat_long.coordinates[1];
                let obj = new google.maps.LatLng(lat, long);
                points.push(obj); 
            }
        })
        console.log(points)
    })
    return points;
}

