var url = location.protocol + '//' + location.hostname + location.pathname + 'time.php';
function conv(timestamp){
    return new Date(timestamp).toTimeString();
}
//setting local time
function loc(){
    var locdate = new Date().getTime();
    return [locdate/1000, conv(locdate)];
}

//setting remote time

function xhr(uri, callback) {
    var start = new Date().getTime()/1000;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200 ) {
            callback(xhttp.responseText, start);
        }
    };
    xhttp.open("GET", uri, true);
    xhttp.send();
}

function trigger (remtime, start) {
    var outstring = conv(remtime*1000);
    print(loc(),[remtime, outstring], start);
}

//printing to the dom based on the output from loc and rem

function print(loct, remt, start){
    document.getElementById("lt").innerHTML = loct[1];
    if (remt[0] >0 )
        { document.getElementById("rt").innerHTML = remt[1]; }
    else
        { document.getElementById("rt").innerHTML = 'remote connection failed'; }
    document.getElementById("diff").innerHTML = Math.abs((remt[0] - loct[0])).toPrecision(2);
    document.getElementById("delay").innerHTML = Math.abs((loct[0] - start)).toPrecision(2);
}

function update() {
    xhr(url, trigger);
}
