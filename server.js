var mysql        = require('mysql');
var express      = require('express');
var exphbs       = require('express-handlebars');
var path         = require('path');

var bodyParser   = require('body-parser');
var url          = require('url');
var md5          = require('md5');

var db           = require('./connect.js');

connection = mysql.createConnection(db);

const app     = express()
const port    = 3000

//
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

// ROTAS
app.get('/', (req,res) => {

  res.render('home')
})

app.get('/special/:link', (req,res) => {
  special_link = req.params.link 

  SQL = 'SELECT * from competitor where link = "'+special_link+'" '
  connection.query(SQL, (err,rows) => {
    if(err) throw err
      res.render('register_special',{special_link:special_link})
  })

})

app.get('/compartilhar', (req,res) => {
    res.render('compartilhar')
})

//FUNÇÕES
function insert(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');  
  const point = 1;

  hash = md5(req.body.email)
  host = url.format({
                    protocol: req.protocol,
                    host: req.get('host')
             });

  var special_link = hash

  var post = [
    req.body.name,
    req.body.email,
    req.body.phone,
    point,
    special_link  
  ]

  SQL = "INSERT INTO competitor (name,email,phone,point,link) VALUES (?)";
  connection.query(SQL, [post], (err, rows) => {
    if(err){
      if(err.errno=1062){
        res.send({message:'e-mail já cadastrado',status:false})
      }else{ 
        res.send({message:err})
      }
    }else{
      res.send({
        message:'Registro Salvo.',
        generateLink:hash,
        host:host,
        special_link:special_link,
        status:true
      })
    }        
  })
}

function insert_special(req,res){
  res.setHeader('Access-Control-Allow-Origin', '*');  
  const point = 1;

  hash = md5(req.body.email)
  host = url.format({
                    protocol: req.protocol,
                    host: req.get('host')
             });

  var special_link = hash

  var post = [
    req.body.name,
    req.body.email,
    req.body.phone,
    point,
    special_link  
  ]

  SQL = "INSERT INTO competitor (name,email,phone,point,link) VALUES (?)";
  connection.query(SQL, [post], (err, rows) => {
    if(err){
      if(err.errno=1062){
        res.send({message:'e-mail já cadastrado',status:false})
      }else{ 
        res.send({message:err})
      }
    }else{
      var sum = 1
      link = req.body.special_link

      SQL = 'SELECT * FROM competitor where link = "'+link+'"'
      connection.query(SQL, (err, rows) => {
        if(err) throw err

          id = rows[0].id
          iPoint = rows[0].point
          sum  += iPoint
          
          SQL = 'UPDATE competitor SET point = "'+sum+'" WHERE `competitor`.`id` = "'+id+'" '
          connection.query(SQL, (err, rows) => {
          if(err) throw err
            res.send({
              message:'Registro Salvo.',
              generateLink:hash,
              host:host,
              special_link:special_link,
              status:true
            })
          })

      })
    }        
  })

}

///// ROTAS API

app.post('/create', insert)

app.post('/create_special_link', insert_special)


app.get('/read', (req,res) => { 
  SQL = "SELECT * FROM competitor order by point desc";
  connection.query(SQL, (err, rows) => {
    if(err) throw err
      res.send({data:rows})
  })
})

app.delete('/delete', (req,res) => { 
  SQL = "SELECT name,point FROM competitor order by point desc";
  connection.query(SQL, (err, rows) => {
    if(err) throw err
      winner = rows[0].name 

      SQL = "DELETE FROM competitor";
      connection.query(SQL, (err, rows) => {
        if(err) throw err
          res.send({message:winner})
      })
  })

})

app.listen(port, () => console.log(`Server running on port ${port}.`))
app.use("/js", express.static(path.join(__dirname, "public/js'")));


