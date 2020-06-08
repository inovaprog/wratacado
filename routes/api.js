require('dotenv').config();
var router = require ('express').Router();
var db = require('../db')
let multer = require('multer');
const aws = require('aws-sdk')
const multers3 = require('multer-s3');
var storageTypes = {

    local: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/mototaxi')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    }),
    s3: multers3({
        s3: new aws.S3(),
        bucket: 'uploadwr' ,
        contentType: multers3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            cb(null, file.originalname);
        }
    })
}
var upload = multer({ storage: storageTypes['s3'] })

router.post('/lista', function (req, res, next) {
    console.log('Chamada API OK')
    db.buscarTodos((e, produtos) => {
        if (e) { return console.log(e); }
        res.send(produtos);
    })
});


router.post('/buscarum/:id', async function (req, res, next) {
    var id = req.params.id;
   
    db.buscaUm(id, (e, produto) => {
        if (e) { return console.log(e); }
        res.send(produto);
    })
});

router.post('/edit/', async function (req, res) {
    var id = req.body.id;
    
    var titulo = req.body.titulo
    var descricao = req.body.descricao
    var categoria = req.body.categoria
    var preco = req.body.preco

 
     db.editar({id, titulo, descricao, categoria, preco}, (err, result) => {
        if (err) { return console.log(err); }
        res.render('sucesso');
        });

})

router.get('/delete/:id',  async function (req, res) {
    var id = req.params.id;
    db.deletar(id, (e, r) => {
        if (e) { return console.log(e) }
        res.render('sucesso');
    });

})

router.post('/adicionar', function(req, res){
    
    var titulo = req.body.titulo
    var descricao = req.body.descricao
    var categoria = req.body.categoria
    var preco = req.body.whatsapp
    var foto = 'padrao-wr.png'

 
     db.adicionar({ titulo, descricao,categoria, preco, foto}, (err, result) => {
        if (err) { return console.log(err); }
        res.render('sucesso');
    })
})

router.post('/foto/:id', upload.single('file'), function(req, res){
    
    var foto = req.file.key
    var id = req.params.id 

    console.log(foto)
    console.log(id)

    db.trocarFoto({id, foto}, (e, r) => {
        if (e) { return console.log(e); }
        res.render('sucesso');
    })
})

module.exports = router;