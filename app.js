//servidor

var express=require("express");
var mysql=require("mysql");
var cors = require('cors')

var puerto=3000;
var app=express();

app.use(cors());
app.use(express.json());

var connection=mysql.createConnection({host:'localhost', user:'PruebaDB3',password:'password',database:'pwcidb'});
//var connection=mysql.createConnection({host:'localhost', user:'root',password:'',database:'pwcidb'});

app.listen(puerto,()=>{
    console.log("Funcionando en puerto " + puerto + ".");

});

connection.connect((error)=>{
    if(error)
        throw error;
    console.log("La base de datos funciona");
});

app.post("/loginUser", (req,res)=>{

    const user = req.body.user;
    const pass = req.body.password;

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



app.post("/altaLista", (req,res)=>{

    const name = req.body.name;
    const desc=req.body.desc;
    const type=req.body.type;
    const user = req.body.user;

    console.log(req.body);
    const sql = "CALL sp_altaLista('"+name+"','"+desc+"','"+type+"',"+user+");";

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

app.put("/editarLista", (req,res)=>{

    const name = req.body.name;
    const desc=req.body.desc;
    const type=req.body.type;
    const list = req.body.list;

    console.log(req.body);
    const sql = "CALL sp_editarLista('"+name+"','"+desc+"','"+type+"',"+list+");";

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

app.delete("/bajaLista", (req,res)=>{

    const idL = req.body.lista;

    console.log(req.body);
    const sql = "DELETE from lista WHERE id_Lista="+idL+";";

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

app.post("/allUserLists", (req,res)=>{

     const id = req.body.id;
    
     console.log(req.body);
     const sql = "SELECT id_Lista, nombre_Lista,descrip_Lista,tipo_Lista,usuario_Dueno from lista WHERE usuario_Dueno='"+id+"';";
 
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

 app.post("/userPubLists", (req,res)=>{
 
      const id = req.body.id;
     
      console.log(req.body);
      const sql = "CALL sp_getUserPubLists(" + id + ");";
  
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


 app.post("/getLista", (req,res)=>{

    const id = req.body.id;
   
    console.log(req.body);
    const sql = "SELECT id_Lista, nombre_Lista,descrip_Lista,tipo_Lista from lista WHERE id_Lista='"+id+"';";

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


app.post("/addObjeto", (req,res)=>{

    const name = req.body.name;
    const desc=req.body.desc;
    const state=req.body.state;
    const list = req.body.list;

    console.log(req.body);
    const sql = "CALL sp_addObjeto('"+name+"','"+desc+"','"+state+"',"+list+");";

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

app.put("/editObjeto", (req,res)=>{

    const id = req.body.obj;
    const name = req.body.name;
    const desc=req.body.desc;
    const state=req.body.state;
    

    console.log(req.body);
    const sql = "CALL sp_editarObjeto("+id+",'"+name+"','"+desc+"','"+state+"');";

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

app.delete("/bajaObjeto", (req,res)=>{

    const idO = req.body.id;

    console.log(req.body);
    const sql = "DELETE from objeto WHERE id_Objeto="+idO+";";

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


app.post("/getObjeto", (req,res)=>{

    const id = req.body.idOb;
    
    console.log(req.body);
    const sql = "SELECT id_Objeto, nombre_Objeto,descrip_Objeto,estado_Objeto from objeto WHERE id_Objeto="+id+";";

    connection.query(sql, (err, results, fields)=>{

       if(err)  throw err;
       
       if(results.length>0){
        res.send(results);
        }
    else{
        res.send("0");
    }
    });

});


app.post("/getListObjects", (req,res)=>{

    const list = req.body.list;
    console.log(req.body);
    const sql = "SELECT id_Objeto, nombre_Objeto,descrip_Objeto,estado_Objeto from objeto WHERE lista_Duena="+list+";"
    
    connection.query(sql, (err, results, fields)=>{

       if(err)  throw err;
       
       if(results.length>0){
        res.send(results);
        }
    else{
        res.send("0");
    }
    });

});

app.post("/getUserData", (req,res)=>{
    
   const id = req.body.id;
   console.log(req.body);
   const sql = 'CALL sp_getUserData(' + id + ');';

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

app.put("/bajaMyUser", (req,res)=>{

    const userID = req.body.id;
    const sql = "CALL sp_bajaUser(" + userID + ");";

    connection.query(sql, (err, results, fields)=>{
        if(err)  throw err;
        
        if(results.affectedRows>0)
            res.send("1");
        else
            res.send("0");
    });

});

app.put("/updateMyData", (req,res)=>{
    
    const userID = req.body.id;
    const username = req.body.user;
    const email=req.body.email;
    const pass=req.body.password;
    const usertype=req.body.type;
    
    const sql = "CALL sp_updateUser("+userID+",'"+username+"','"+email+"','"+pass+"',"+usertype+");";

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

app.get("/searching-lists/:keyword", (req,res)=>{

    const palBusq = req.params.keyword;
    console.log(req.params);
    const sql = "CALL sp_searchLists('" + palBusq + "');";

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

app.get("/searching-users/:keyword", (req,res)=>{

    const palBusq = req.params.keyword;
    console.log(req.params);
    const sql = "CALL sp_searchUsers('" + palBusq + "');";

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

app.get("/isOwner/:loggedUser", (req,res)=>{

    const userID = req.params.loggedUser;
    const sql = "CALL sp_getUserLists(" + userID + ");";

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