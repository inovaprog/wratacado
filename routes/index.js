require('dotenv').config();
const fetch = require("node-fetch");
var express = require('express');
var router = express.Router();
var auth = false


/* GET home page. */

router.get('/', function(req, res, next) {
  fetch('https://wratacado.appspot.com/api/lista', { method: "post" }) // quando suibir
  .then(res => res.json())
  .then(produtos => res.render('index', { produtos }))
});


router.get('/adm', function(req, res, next) {
  res.render('login');
});

router.post('/lista', function(req, res, next) {

    var user = req.body.user;
    var senha = req.body.senha;
    if (user == process.env.USER && senha == process.env.SENHA) {
      auth = true
      console.log('Senha Correta')
    }
  
    if (auth) {
    auth = false
    fetch('https://wratacado.appspot.com/api/lista', { method: "post" }) // quando suibir
      .then(res => res.json())
      .then(produtos => res.render('lista', { produtos }))
    }else{
      res.render('login')
    }
  });

  router.get('/edit/:id', function(req, res, next) {
    var id = req.params.id
  //buscar um pelo id
 
  fetch(`https://wratacado.appspot.com/api/buscarum/${id}`, { method: "post" }) // 
    .then(res => res.json())
    .then(itens => res.render('edit', { itens }))
  });

  router.post('/add', function(req, res, next) {
    res.render('add');
  });


module.exports = router;