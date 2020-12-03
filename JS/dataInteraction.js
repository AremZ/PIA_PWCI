/*
//////////
AL CARGAR EL HTML MANDA CONSOLE LOG CON LA INFO
/////////
*/

/////////////////VALIDACIONES//////////////

function validateLogin(){
    var user=document.getElementById("user").value;
    var pass=document.getElementById("pass").value;

    var acceder=false;
    if(user.length<3||user.length>45)
        acceder=false;
    else
        acceder=true;
    if(pass.length<8||pass.length>15)
        acceder=false;
    else
        acceder=true;

    if(acceder)
        signInUser();
    else
        alert("¡Verifique sus datos!")

    document.getElementById("user").value="";
    document.getElementById("pass").value="";

}


//////////////MANEJO DE INFORMACIÓN//////////////

function getLogged(){
    var currentUser = localStorage.getItem("currentUser");
    alert(currentUser);
}
function logOut(){
    localStorage.setItem("currentUser", 0);
    localStorage.setItem("lista", 0);
    window.location.replace("http://127.0.0.1:" + livePort + "/landing.html");
}
/*
window.onload=function(){
    var req=new XMLHttpRequest(); 
req.open('GET','http://localhost:3000/getAllUsers',true);

//Para cuando cambie la situación
//4-->terminó 200-->ya está

req.onreadystatechange=function(data){
    if(req.readyState==4&&req.status==200){
        //retorna json del response a la peticion
        console.log(data.target.response);
    }
};

req.send();
}*/

var livePort = '5501'

function signupUser(){
    let signupForm=document.querySelector('form#formSignUp');
   
    var user=signupForm.uname.value;
    var mail=signupForm.mail.value;
    var pass=signupForm.psw.value;
    var typeC=1;
    
    var ele = document.getElementsByName('tipoCuentaRB');           
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) 
            typeC=parseFloat(ele[i].value); 
    } 
    if(user.length>3&&pass.length>7&&mail.length>5){
    //e.preventDefault();
    console.log(signupForm);
    //console.log(e);
    var req=new XMLHttpRequest();
    req.onreadystatechange = function() {   
        if(req.readyState==4&&req.status==200){
        var data=req.responseText;
        
        if (data=="1") {
          //window.location.replace("http://127.0.0.1:5501/myLists.html");
          alert("¡Registro exitoso! Por favor inicia sesión.");
          document.getElementById('id01').style.display='none';
        }
        else
          alert("Usuario o correo ya registrado.")
        }
       
    }
    req.open('POST','http://localhost:3000/registroUser');
    req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    req.send(
        JSON.stringify({user:user, email:mail, password:pass, type:typeC})
    );

    }
    else
        alert("Revise los datos.");
}


function signInUser(){
    var user=formLogin.user.value;
    var pass=formLogin.pass.value;

    if(user.length>3&&pass.length>0){
    let signupForm=document.querySelector('form#formLogin');
    console.log(signupForm);
    //console.log(e);
    var req=new XMLHttpRequest();
    req.onreadystatechange = function() {   
        if(req.readyState==4&&req.status==200){
        var data=req.response;
        var parse=JSON.parse(data);
        var id;
        if (parse!=0){
            id=parse[0].id_usuario;

        if (id!=0){
            localStorage.setItem("currentUser", id);
            window.location.replace("http://127.0.0.1:" + livePort + "/myLists.html");
        }
    }
        else
          alert("Usuario no registrado.")
        }
       
    }
    req.open('POST','http://localhost:3000/loginUser');
    req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    req.send(
        JSON.stringify({user:signupForm.user.value, password:signupForm.pass.value})
    );

    }
    else
        alert("Revise los datos.");
}

function validateList(mode, action){
    var content=document.getElementById("nameList");
    var content2=document.getElementById("descrNewList");
    var valido=true;

    if(mode==0){

    if (content.value.length<5){
        document.getElementById("nameContainerList").className=document.getElementById("nameContainerList").className+" error";
        valido=false;
    }

    if (content2.value.length<5){
        document.getElementById("descrContainerList").className=document.getElementById("descrContainerList").className+" error";
        valido=false;
    }

    
}
    else{
        valido=true;
        content=document.getElementById("nameObj");
        if (content.value.length<5){
            document.getElementById("nameContainerObj").className=document.getElementById("nameContainerObj").className+" error";
            valido=false;
        }
        content2=document.getElementById("descrObj");
        if (content2.value.length<5){
            document.getElementById("descrContainerObj").className=document.getElementById("descrContainerObj").className+" error";
            valido=false;
        }
}
if(valido){
    if(action==0)
        createList();
    if(action==1)
        editLista();
    content.value="";
    content2.value="";
    }
}

function createList(){
   
    let newListForm=document.querySelector('form#formNewList');
   
    var nameL=newListForm.nameList.value;
    var descL=newListForm.descrNewList.value;
    var typeC=0;
    var e = document.getElementById("tipoLista");
    typeC= parseFloat(e.value);

    var currentUser = localStorage.getItem("currentUser");

    if(nameL.length>3&&descL.length>10&&typeC!=0){
    //console.log(newListForm);
    var req=new XMLHttpRequest();
    req.onreadystatechange = function() {   
        if(req.readyState==4&&req.status==200){
        var data=req.responseText;
        
        if (data=="1"){
          alert("¡Lista creada!")
          refreshListas();
        }
        else
          alert("¡No se puede repetir lista!")
        }
       
    }
    req.open('POST','http://localhost:3000/altaLista');
    req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    req.send(
        JSON.stringify({name:nameL, desc:descL, type:typeC, user:currentUser})
    );

    }
    else
        alert("Revise los datos.");
}

function getUserLists(){
    var tipoMensaje;
    var currentUser = localStorage.getItem("currentUser");
    var req=new XMLHttpRequest();
    req.onreadystatechange = function(data) {   
        if(req.readyState==4&&req.status==200){
            var datos=data.target.response;
            var parse=JSON.parse(datos);
            //var valor=parse.length;
            parse.forEach((k,v)=>{
                
                if(k.tipo_Lista=="private")
                    tipoMensaje="Privada"
                else
                    tipoMensaje="Pública"
                $("#listasUsuario").append(
                    "<div class='col-md-12'> <div class='card myList'> <div class='row no-gutters'>"+
                    "<div class='col-md-2'> <img class='card-img imgList' src='Imagenes/DisplayDGP1.png'>"+
                    "</div> <div class='col-md-10'> <div class='card-body'>"+
                    "<label class='idLista' style='font-size:10px;'>"+k.id_Lista+"</label>"+//DISPLAY NONE PENDIENTE
                    "<h2 class='col-md-12 titleList'>"+k.nombre_Lista+" :)</h2>"+
                    "<h6 class='col-md-12 titleList'>"+tipoMensaje+"</h6>"+
                    "<p class='descrList'>"+k.descrip_Lista+"</p>"+
                    "<div class='buttons'>"+
                    "<button class='btnSeeList btn btn-outline-danger barBut'  data-toggle='modal' data-target='#editorNoticia'"+
                    "type='submit' id='btnSeeList'><i class='fa fa-eye'></i> Ver mi lista</button>"+
                    "<button class='btnDeleteList btn btn-outline-danger barBut' data-toggle='modal' data-target='#confirmDeleteList'"+
                    "type='submit' id='btnDeleteList'><i class='fa fa-trash'></i> Eliminar</button>"+
                    "</div></div></div></div></div> </div>"

                );


            });
        }
       
    }
    req.open('POST','http://localhost:3000/allUserLists');
    req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    req.send(
        JSON.stringify({id:currentUser})
    );

    
}

function deleteList(idLista){
    var req=new XMLHttpRequest();
    req.onreadystatechange = function() {   
        if(req.readyState==4&&req.status==200){
        var data=req.responseText;
        
        if (data=="1"){
          alert("¡Lista eliminada!")
          refreshListas();
        }
        else
          alert("Error en el proceso")
        }
       
    }
    req.open('POST','http://localhost:3000/bajaLista');
    req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    req.send(
        JSON.stringify({lista:idLista})
    );

}

function deleteListSelf(idLista){
    var req=new XMLHttpRequest();
    req.onreadystatechange = function() {   
        if(req.readyState==4&&req.status==200){
        var data=req.responseText;
        
        if (data=="1"){
          alert("¡Lista eliminada!");
          localStorage.setItem("lista",0);
          window.location.href = "http://127.0.0.1:" + livePort + "/myLists.html";
        }
        else
          alert("Error en el proceso")
        }
       
    }
    req.open('POST','http://localhost:3000/bajaLista');
    req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    req.send(
        JSON.stringify({lista:idLista})
    );

}

function refreshListas(){
        document.getElementById("listasUsuario").innerHTML = "";
        getUserLists();

}

function refreshObjetos(){
    document.getElementById("contenedorObjetosLista").innerHTML = "";
    getObjetosLista();

}

function verListaPage(id){
    localStorage.setItem("lista",id);
    window.location.href = "http://127.0.0.1:" + livePort + "/listView.html";
}

function getLista(){
    var idLista = localStorage.getItem("lista");
    //document.getElementById("titleLista").innerHTML = "holi";
    var nombreLista=document.getElementById("titleLista");
    var descripLista=document.getElementById("displayDescrList");
    var tipo=document.getElementById("tipoLista");
    var tipoMensaje;
    var req=new XMLHttpRequest();
    req.onreadystatechange = function(data) {   
        if(req.readyState==4&&req.status==200){
            var datos=data.target.response;
            var parse=JSON.parse(datos);
            //var valor=parse.length;
            parse.forEach((k,v)=>{
               //alert("Tengo la información.");
               if(k.tipo_Lista=="private")
               tipoMensaje="Privada"
            else
               tipoMensaje="Pública"

               nombreLista.innerHTML=k.nombre_Lista;
               tipo.innerHTML=tipoMensaje;
               descripLista.innerHTML=k.descrip_Lista;
            });
        }
       
    }
    req.open('POST','http://localhost:3000/getLista');
    req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    req.send(
        JSON.stringify({id:idLista})
    );
}

function editLista(){
    //alert("Vas a editar la lista.");


    let newListForm=document.querySelector('form#formEditList');
   
    var nameL=newListForm.nameList.value;
    var descL=newListForm.descrNewList.value;
    var typeC=0;
    var e = document.getElementById("tipoListaE");
    typeC= parseFloat(e.value);

    var list=localStorage.getItem("lista");

    if(nameL.length>3&&descL.length>10&&typeC!=0){
    //console.log(newListForm);
    var req=new XMLHttpRequest();
    req.onreadystatechange = function() {   
        if(req.readyState==4&&req.status==200){
        var data=req.responseText;
        
        if (data=="1"){
          alert("¡Lista modificada!")
          getLista(list);
        }
        else
          alert("Error en el proceso.")
        }
       
    }
    req.open('POST','http://localhost:3000/editarLista');
    req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    req.send(
        JSON.stringify({name:nameL, desc:descL, type:typeC, list:list})
    );

    }
    else
        alert("Revise los datos.");
}



function addObjeto(){
   
    let newListForm=document.querySelector('form#formNewObject');
   
    var nameO=newListForm.nameObj.value;
    var descO=newListForm.descrObj.value;
    var stateO=0;
    var e = document.getElementById("estadoObjeto");
    stateO= parseFloat(e.value);

    var currentList = localStorage.getItem("lista");

    if(nameO.length>3&&descO.length>10&&stateO!=0){
    //console.log(newListForm);
    var req=new XMLHttpRequest();
    req.onreadystatechange = function() {   
        if(req.readyState==4&&req.status==200){
        var data=req.responseText;
        
        if (data=="1"){
          alert("¡Objeto añadido!")
          //refreshListas();
          refreshObjetos();
        }
        else
          alert("¡Problemas con el objeto!")
        }
       
    }
    req.open('POST','http://localhost:3000/addObjeto');
    req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    req.send(
        JSON.stringify({name:nameO, desc:descO, state:stateO, list:currentList})
    );

    }
    else
        alert("Revise los datos.");
}


function editObjeto(id){
   
    let newListForm=document.querySelector('form#formEditObject');
   
    var nameO=newListForm.nameObj.value;
    var descO=newListForm.descrObj.value;
    var stateO=0;
    var e = document.getElementById("estadoObjetoE");
    stateO= parseFloat(e.value);

    if(nameO.length>3&&descO.length>10&&stateO!=0){
    //console.log(newListForm);
    var req=new XMLHttpRequest();
    req.onreadystatechange = function() {   
        if(req.readyState==4&&req.status==200){
        var data=req.responseText;
        
        if (data=="1"){
          alert("¡Cambios guardados!")
          //refreshListas();
          refreshObjetos();
        }
        else
          alert("¡Problemas con el objeto!")
        }
       
    }
    req.open('POST','http://localhost:3000/editObjeto');
    req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    req.send(
        JSON.stringify({obj:id, name:nameO, desc:descO, state:stateO})
    );

    }
    else
        alert("Revise los datos.");
}

function deleteObjeto(idObjeto){
    var req=new XMLHttpRequest();
    req.onreadystatechange = function() {   
        if(req.readyState==4&&req.status==200){
        var data=req.responseText;
        
        if (data=="1"){
          alert("¡Objeto eliminado!")
          refreshObjetos();
        }
        else
          alert("Error en el proceso")
        }
       
    }
    req.open('POST','http://localhost:3000/bajaObjeto');
    req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    req.send(
        JSON.stringify({id:idObjeto})
    );

}

function getObjetosLista(){
    var estado;
    var currentList = localStorage.getItem("lista");
    var req=new XMLHttpRequest();
    req.onreadystatechange = function(data) {   
        if(req.readyState==4&&req.status==200){
            var datos=data.target.response;
            var parse=JSON.parse(datos);
            //var valor=parse.length;
            parse.forEach((k,v)=>{
                if(k.estado_Objeto=="busca")
                    estado="Lo busco"
                else
                    estado="Lo tengo"
                $("#contenedorObjetosLista").append(

                    "<div class='col-lg-3'><div class='card card-obj'> <img class='card-img imgObject' src='Imagenes/PSWSH.jpg'><div class='card-body'>"+
                    "<div class='row bodyTarjeta'> <div class='card-title titleObject'>"+  k.nombre_Objeto+
                    "<div class='descrObject'>"+ k.descrip_Objeto +"</div>"+
                    "</div><div class='row buttonsTarjeta'><div class='col-md-6'><label class='idObjeto' style='font-size:10px; margin:-0.5em;'>"+k.id_Objeto+"</label>"+
                    "<button class='btn btn-outline-danger barButObj btnEditObj' id='btnEditObj' data-toggle='modal' data-target='#modEditObj'><i class='fa fa-pencil'></i> Editar</button></div>"+
                    "<div class='col-md-6'> <button class='btn btn-outline-danger barButObj btnDeleteObj'id='btnDeleteObj' data-toggle='modal' data-target='#confirmDeleteObj'><i class='fa fa-trash'></i> Eliminar</button>"+
                    "</div><div class='col-md-12'><label class='btn btn-outline-danger barButObj' type='' id='btnObtenidoObj'><i class='fa fa-check-square'></i>"+ estado+"</label>"+
                    "</div></div> </div></div></div>"
                );
            });
        }
    }
    req.open('POST','http://localhost:3000/getListObjects');
    req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    req.send(
        JSON.stringify({list:currentList})
    );

    
}



