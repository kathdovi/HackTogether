


// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:

var map, heatmap, heatmap2, heatmap3, heatmap4, heatmap5;
var heat, pothole, animal, maintenance, police, radius, gradientBool, opacity;

function initMap() {
    heat = false;
    pothole = false;
    animal = false;
    maintenance = false;
    police = false;
    radius = false;
    gradientBool = false;
    opacity = false;
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: 30.2672, lng: -97.7431 },
        mapTypeId: 'satellite'
    });
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map
    });
    heatmap2 = new google.maps.visualization.HeatmapLayer({
        data: getPointsPothole(),
        map: map
    });
    heatmap3 = new google.maps.visualization.HeatmapLayer({
        data: getPointsAnimal(),
        map: map
    });
    heatmap4 = new google.maps.visualization.HeatmapLayer({
        data: getPointsMaintenance(),
        map: map
    });
    heatmap5 = new google.maps.visualization.HeatmapLayer({
        data: getPointsPolice(),
        map: map
    });
}

function toggleHeatmap() {
    var strin = 'buttonsAll';
    changeElement(heat, strin);
    if (!heat) {
        heatmap.setMap(map);
        heat = true;
    } else {
        heatmap.setMap(null);
        heat = false;
    }
}

function togglePothole() {
    var strin1 = 'buttonsPothole';
    changeElement(pothole, strin1);
    if (!pothole) {
        heatmap2.setMap(map);
        pothole = true;
    } else {
        heatmap2.setMap(null);
        pothole = false;
    }
}

function toggleAnimal() {
    var strin2 = 'buttonsAnimal';
    changeElement(animal, strin2);
    if (!animal) {
        heatmap3.setMap(map);
        animal = true;
    } else {
        heatmap3.setMap(null);
        animal = false;
    }
}

function toggleMaintenance() {
    var strin = 'buttonsMaintenance';
    changeElement(maintenance, strin);
    if (!maintenance) {
        heatmap4.setMap(map);
        maintenance = true;
    } else {
        heatmap4.setMap(null);
        maintenance = false;
    }
}

function togglePolice() {
    var strin = 'buttonsPolice';
    changeElement(police, strin);
    if (!police) {
        heatmap5.setMap(map);
        police = true;
    } else {
        heatmap5.setMap(null);
        police = false;
    }
}


$(".btn").click(function () {
    $(this).toggleClass('btn-default btn-success');
});

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
    var strin = 'buttonsGradient';
    changeElement(gradientBool, strin);
    if (!gradientBool) {
        heatmap.set('gradient', gradient);
        heatmap2.set('gradient', gradient);
        heatmap3.set('gradient', gradient);
        heatmap4.set('gradient', gradient);
        heatmap5.set('gradient', gradient);
        gradientBool = true;
    } else {
        heatmap.set('gradient', null);
        heatmap2.set('gradient', null);
        heatmap3.set('gradient', null);
        heatmap4.set('gradient', null);
        heatmap5.set('gradient', null);
        gradientBool = false;
    }
}

function changeElement(x, strin) {
    if (x) {
        // Default button style
        var el = document.getElementById(strin);
        el.style.fontSize = "15px";
    } else {
        // after we clicked style
        var el = document.getElementById(strin);
        el.style.fontSize = "15px";
    }
    return;
}

function changeOpacity() {
    var strin = 'buttonsOpacity';
    changeElement(opacity, strin);
    if (!opacity) {
        heatmap.set('opacity', 0.2);
        heatmap2.set('opacity', 0.2);
        heatmap3.set('opacity', 0.2);
        heatmap4.set('opacity', 0.2);
        heatmap5.set('opacity', 0.2);
        opacity = true;
    } else {
        heatmap.set('opacity', null);
        heatmap2.set('opacity', null);
        heatmap3.set('opacity', null);
        heatmap4.set('opacity', null);
        heatmap5.set('opacity', null);
        opacity = false;
    }
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
    })
    return points;
}

function getPointsAnimal() {
    let points = [];
    $.get("https://data.austintexas.gov/resource/5h38-fd8d.json?$query=SELECT%20sr_location_lat_long,%20sr_type_desc%20WHERE%20sr_location_lat_long%20IS%20NOT%20NULL%20LIMIT%2050000", (data) => {
        data.forEach(e => {
            if (e.sr_type_desc.toLowerCase().includes("animal")) {
                let long = e.sr_location_lat_long.coordinates[0];
                let lat = e.sr_location_lat_long.coordinates[1];
                let obj = new google.maps.LatLng(lat, long);
                points.push(obj);
            }
        })
    })
    return points;
}

function getPointsMaintenance() {
    let points = [];
    $.get("https://data.austintexas.gov/resource/5h38-fd8d.json?$query=SELECT%20sr_location_lat_long,%20sr_type_desc%20WHERE%20sr_location_lat_long%20IS%20NOT%20NULL%20LIMIT%2050000", (data) => {
        data.forEach(e => {
            if (e.sr_type_desc.toLowerCase().includes("maintenance")) {
                let long = e.sr_location_lat_long.coordinates[0];
                let lat = e.sr_location_lat_long.coordinates[1];
                let obj = new google.maps.LatLng(lat, long);
                points.push(obj);
            }
        })
    })
    return points;
}

function getPointsPolice() {
    let points = [];
    $.get("https://data.austintexas.gov/resource/5h38-fd8d.json?$query=SELECT%20sr_location_lat_long,%20sr_type_desc%20WHERE%20sr_location_lat_long%20IS%20NOT%20NULL%20LIMIT%2050000", (data) => {
        data.forEach(e => {
            if (e.sr_type_desc.toLowerCase().includes("officer")) {
                let long = e.sr_location_lat_long.coordinates[0];
                let lat = e.sr_location_lat_long.coordinates[1];
                let obj = new google.maps.LatLng(lat, long);
                points.push(obj);
            }
        })
    })
    return points;
}