var json;

function get_JSON_from_server() {

    var req = new XMLHttpRequest();

    req.open("POST", "/", false);

    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    var body = 'first_name=' + encodeURIComponent(document.getElementById("name1").value) +
        '&comment=' + encodeURIComponent(document.getElementById("comment1").value);
    req.send(body);

    json = req.responseText;
    json = JSON.parse(json);
}

function print_JSON() {
    var list = '';

    for (var i in json) {
        list += '<p class=name>' +json[i].id+')'+ json[i].name + '</p><p class=comment>: ' + json[i].comment + '</p></br>';
    }
    document.getElementById('blokComments').innerHTML = list;
}

function get_JSON_and_print(){
    get_JSON_from_server();
    print_JSON();
}

get_JSON_and_print();
