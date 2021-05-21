function prayerTimes(latitude, longitude) {
    fetch('http://api.aladhan.com/v1/calendar?latitude='+latitude+'&longitude='+longitude+'&method=4')
    .then(response => response.json())
    .then(function(response){
        let date = new Date();
        let today = date.getDate() - 1;
        let data = response.data[today].timings;

        let app = document.getElementById('app');
        let table = document.createElement('table');
        let tableThead = document.createElement('thead');
        let tableTbody = document.createElement('tbody');
        let theadLeftCell = document.createElement('th');
        let theadRightCell = document.createElement('th');

        theadLeftCell.innerHTML = 'Prayer';
        theadRightCell.innerHTML = 'Time';

        for(i in data) {
            let row = tableTbody.insertRow();
            let name = row.insertCell(0);
            let time = row.insertCell(1);
            name.innerHTML = i;
            time.innerHTML = data[i];
            tableTbody.appendChild(row);
        }
        table.appendChild(tableThead);
        tableThead.appendChild(theadLeftCell);
        tableThead.appendChild(theadRightCell);
        table.appendChild(tableTbody);
        app.appendChild(table);
    })
}

function success(position) {
    prayerTimes(position.coords.latitude, position.coords.longitude);
}

function error() {
    // Default Times on Jakarta
    prayerTimes(-6.121435, 106.774124);

    let app = document.getElementById('app');
    let p = document.createElement('p');
    p.innerHTML = 'Akses lokasi tidak diizinkan, menampilkan waktu shalat lokasi Jakarta';

    app.appendChild(p);
}

function userLocation() {
    if(!navigator.geolocation) {
        alert('Geolocation tidak didukung di browser kamu, silahkan gunakan browser lain');
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

function index() {
    let app = document.getElementById('app');
    let title = document.createElement('div');

    title.innerHTML = 'Muslim Prayer Times';
    app.appendChild(title);

    userLocation()
}

index()