var mysql      = require('mysql');
var express    = require('express');
var bodyParser = require('body-parser');

const app     = express()
const port    = 3000

app.use(bodyParser.urlencoded({ extended: true }))

// Conexão com Banco de Dados MYSQL
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '26031949Pa!',
  database : 'fidelizou'
});
 

app.post('/create/?:name/?:email/?:phone:', (req,res) => {
  // var post = {
  // name:req.body.name,
  // email:req.body.email,
  // phone:req.body.phone}

  con.query('INSERT INTO competition (name,email,phone) VALUES (?,?,?)', (err, result) => {
      res.send({message:'ok'})
  })

})


app.get('/read', (req,res) => {
  SQL = 'SELECT * from competition'
  con.query(SQL, (err,rows) => {
    if(err) throw err
      res.send(rows)
  })
})


app.listen(port, () => console.log(`Server running on port ${port}.`))
