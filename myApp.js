require('dotenv').config();

let bodyParser = require('body-parser');
let express = require('express');
let app = express();

console.log("Hello World");

const middlewareFunction = (req,res,next)=>{
     console.log(req.method + " " + req.path + " - " + req.ip);
     next();
};

app.use(middlewareFunction);

app.get('/now', function(req,res,next) {
    req.time = new Date().toString();
    next();
}, function(req,res){
    res.json({'time': req.time});
})

app.get("/", (req,res)=>{
    res.send("Hello Express");
    absolutePath = __dirname +'/views/index.html';
    res.sendFile(absolutePath);
});

app.use("/public",express.static(__dirname + "/public"));

app.get("/json", (req, res)=>{
    if(process.env.MESSAGE_STYLE == 'uppercase')
        res.json({"message": "HELLO JSON"});
    else
    {
        res.json({"message": "Hello json"});
    }
})

app.get('/:word/echo', function(req,res){
    const {word} = req.params;
    res.json({echo: word});
});

module.exports = app;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/name', function(req,res){
    res.json({name: req.query.first + " " + req.query.last});
});

app.post('/name', function(req,res) {
    let string = req.body.first + " " + req.body.last;
    res.json({ name: string });
})


