var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});


var fs = require('fs');
app.use('/', express.static('public'));


app.post('/', urlencodedParser, function (req, res) {
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);

        var idMessage = 0;
        if (data[0] != undefined)
            idMessage = data[0].id + 1;

        var first_name = req.body.first_name;
        var comment = req.body.comment;

        var adminName = 'admin';
        var pass = 'password';
        var arr = first_name.split(':');
        if (arr[0] == adminName && arr[1] == pass)
            deleteComment(comment, data);
        else if (first_name != '' && comment != '')
            data.unshift({id: idMessage, name: first_name, comment: comment}); //Добавить комментарий в начало


        console.log(data);
        fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(data), 'utf8');
        res.end(JSON.stringify(data));
    });

});

function deleteComment(id, data) {
    var index = data.length - id - 1; // Индекс записи в дате
    if (index >= 0) {
        for (var i = index - 1; i >= 0; i--) {
            data[i].id = id;
            id++;
        }
        data.splice(index, 1);
    }
}

app.listen(25565, function () {
    console.log('Example app listening on port 25565!');
});

app.use(function (req, res, next) {
    res.status(404).sendFile(__dirname + "/" + "err404.html");
});