const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
app = express();

app.set('views',path.join(__dirname,"views"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use( morgan('dev') );

var id=0;
let scarpe=[];

app.get('/',(req,res) => {
    res.render('index',{scarpe});
});

app.post('/elimina',(req,res) => {
    const id = parseInt(req.body.id);
    scarpe = scarpe.filter(scarpe=>{
        return scarpe.id !== id
    })
    res.redirect('/');
});

app.post('/creascarpa',(req,res) => {
    id++;
    req.body.id=id
    scarpe.push(req.body)
    res.redirect('/');
});

app.get('/modificascarpa/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    scarpa=scarpe.find(element => element.id === id);
    res.render('modifica',scarpa);
});

app.post('/modifica',(req,res)=>{
    const id = parseInt(req.body.id);
    const scarpa = scarpe.find(element => element.id === id);
    scarpa.modello = req.body.modello;
    scarpa.marca = req.body.marca;
    res.redirect('/');
});

app.use((req,res) => {
    res.status(404).sendFile(path.join(__dirname,"public","index.html"));
});

app.listen(80);

console.log("server running: http://localhost:80")