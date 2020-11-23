//servidor

var express=require("express");
var mysql=require("mysql");
//Bloquear o permitir ciertas IP's, MIDDLEWARE
var cors = require('cors')

var puerto=3000;
var app=express();

app.use(cors());
app.use(express.json());

var connection=mysql.createConnection({host:'localhost', user:'root',password:'',database:'pwcidb'});

app.listen(puerto,()=>{
    console.log("Funcionando en puerto 3mil");

});


connection.connect((error)=>{
    if(error)
        throw error;
    console.log("La base de datos funciona");
});


app.get("/getUser/:id", (req,res)=>{

    const id = req.params.id;


    const sql = 'SELECT nombre_Usuario from usuarios where id_Usuario='+id;

    connection.query(sql, (err, results)=>{

       if(err)throw err;
       if(results.length>0){
           res.send(results);
       }
       else{
           res.send("Not results");
       }
    });

});

app.post("/loginUser", (req,res)=>{

    const user = req.body.user;
    //const mail=req.body.email;
    const pass = req.body.password;
    


   // const sql = "SELECT id_usuario,nombre_Usuario from usuarios where nombre_Usuario='"+user+"' AND password_Usuario='"+pass+"';";

    const sql = "SELECT id_usuario from usuarios where (nombre_Usuario='"+user+"' AND password_Usuario='"+pass+"') OR (correo_Usuario='"+user+"' AND password_Usuario='"+pass+"');";


    connection.query(sql, (err, results)=>{

       if(err)throw err;
       if(results.length>0){
           res.send(results);
       }
       else{
           res.send("0");
       }
    });

});

app.post("/registroUser", (req,res)=>{

    const user = req.body.user;
    const mail=req.body.email;
    const pass = req.body.password;
    const type=req.body.type;

    console.log(req.body);
    const sql = "CALL sp_userSignUp('"+user+"','"+mail+"','"+pass+"',"+type+");";

    connection.query(sql, (err, results, fields)=>{

       if(err)  throw err;
       
       if(results.affectedRows>0){
        res.send("1");
        }
    else{
        res.send("0");
    }
    });

});

app.get("/getAllUsers", (req,res)=>{

   // const id = req.params.id;


    const sql = 'SELECT nombre_Usuario from usuarios';

    connection.query(sql, (err, results)=>{

       if(err)throw err;
       if(results.length>0){
           res.send(results);
       }
       else{
           res.send("Not results");
       }
    });

});