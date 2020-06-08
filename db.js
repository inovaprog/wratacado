require('dotenv').config();
var mongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;

mongoClient.connect("mongodb+srv://wandinho:eu281168@cluster0-filpw.mongodb.net/test?retryWrites=true&w=majority",
                     { useUnifiedTopology: true })
 .then(conn => global.conn = conn.db("wratacado"))
 .catch(err => console.log(err))
 console.log("Conectado")

 function adicionar(item, callback){
    global.conn.collection("_produtos").insertOne(item, callback);
}

function deletar(id, callback){
    global.conn.collection("_produtos").deleteOne({_id: new ObjectId(id)}, callback);
}

function buscarTodos(callback){
    console.log('Consulta Banco OK')
    global.conn.collection("_produtos").find({}).toArray(callback);
}

function trocarFoto(item ,callback){

    id = item.id
    foto = item.foto

    global.conn.collection("_produtos").updateOne({_id: new ObjectId(id)}, {
        $set: {foto : foto}
    }, callback);
}

function editar(item, callback){

    id = item.id
    titulo = item.titulo
    descricao = item.descricao
    categoria = item.categoria
    preco = item.preco
    

    global.conn.collection("_produtos").updateOne({_id: new ObjectId(id)}, {
        $set: {titulo : titulo,
               descricao: descricao,
               categoria : categoria,
               preco : preco,      
        }
    }, callback);

}

function buscaUm(id, callback){
    global.conn.collection("_produtos").find({_id: new ObjectId(id)}).toArray(callback);
}

 module.exports = {adicionar, deletar, buscarTodos, trocarFoto, editar, buscaUm}