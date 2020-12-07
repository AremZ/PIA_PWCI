/*
//////////
AL CARGAR EL HTML MANDA CONSOLE LOG CON LA INFO
/////////
*/

var isOwner = false;

/////////////////VALIDACIONES//////////////

function validateLogin(){
    var user=document.getElementById("user").value;
    var pass=document.getElementById("pass").value;

    var acceder=false;
    if(user.length < 5 || user.length > 45)
        acceder=false;
    else
        acceder=true;
    if(pass.length < 5 || pass.length > 15)
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

//var livePort = '5501';
var livePort = '5500';

function signupUser(){
    let signupForm=document.querySelector('form#formSignUp');
   
    var user=signupForm.uname.value;
    var mail=signupForm.mail.value;
    var pass=signupForm.psw.value;
    var typeC=1;

    //var avatar = signupForm.agregarFoto.files[0];
    
    var radioButt = document.getElementsByName('tipoCuentaRB');           
    for(i = 0; i < radioButt.length; i++) { 
        if(radioButt[i].checked) 
            typeC=parseFloat(radioButt[i].value); 
    } 

    if(user.length >= 5 && user.length <= 45
       && pass.length >= 5 && pass.length <= 15
       && mail.length >= 5 && mail.length <= 50){
       if((!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail.value)))){
            console.log(signupForm);
            var req=new XMLHttpRequest();
            req.onreadystatechange = function() {   
                if(req.readyState==4&&req.status==200){
                    var data=req.responseText;
                    
                if (data=="1") {
                    //window.location.replace("http://127.0.0.1:5501/myLists.html");
                    //Sign in con credenciales.
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
            alert("Ingrese un correo valido.");
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
        if(req.readyState == 4 && req.status == 200){
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
        if (content.value.length<5 || content.value == ""){
            document.getElementById("nameList").className=document.getElementById("nameList").className+" error";
            valido=false;
        }

        if (content2.value.length<5 || content2.value == ""){
            document.getElementById("descrNewList").className=document.getElementById("descrNewList").className+" error";
            valido=false;
        }
    }
    else{
        valido=true;
        content=document.getElementById("nameObj");
        if (content.value.length<5 || content.value == ""){
            document.getElementById("nameList").className=document.getElementById("nameList").className+" error";
            valido=false;
        }
        content2=document.getElementById("descrObj");
        if (content2.value.length<5 || content2.value == "" ){
            document.getElementById("descrNewList").className=document.getElementById("descrNewList").className+" error";
            valido=false;
        }
}
if(valido){
    if(action==0){
        createList();    
        $('#modNewList').modal('toggle');     
    }
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
            if (parse)
                parse.forEach((k,v)=>{
                    
                    if(k.tipo_Lista=="private")
                        tipoMensaje="Privada"
                    else
                        tipoMensaje="Pública"
                    $("#listasUsuario").append(
                        "<div class='col-md-12'> <div class='card myList'> <div class='row no-gutters'>"+
                        "<div class='col-md-2'> <img class='card-img imgList' src='Imagenes/default-image-list.png'>"+
                        "</div> <div class='col-md-10'> <div class='card-body'>"+
                        "<label class='idLista' style='font-size:10px;'>"+k.id_Lista+"</label>"+//DISPLAY NONE PENDIENTE
                        "<h2 class='col-md-12 titleList'>"+k.nombre_Lista+"</h2>"+
                        "<h6 class='col-md-12 privacyList'>"+tipoMensaje+"</h6>"+
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
    var e = document.getElementById("estadoObjetoE");
    alert(e.value);
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
            if(parse)
            parse.forEach((k,v)=>{
                if(k.estado_Objeto=="busca")
                    estado=" Buscando"
                else
                    estado=" Obtenido"
                $("#contenedorObjetosLista").append(

                    "<div class='col-lg-3'><div class='card card-obj'> <img class='card-img imgObject' src='Imagenes/default-image-list.png'><div class='card-body'>"+
                    "<div class='row bodyTarjeta'> <div class='card-title titleObject'>"+  k.nombre_Objeto+
                    "<div class='descrObject'>"+ k.descrip_Objeto +"</div>"+
                    "</div><div class='col-md-12'><div class='col-md-12'><label class='idObjeto' style='font-size:10px; margin:-0.5em; display:none'>"+k.id_Objeto+"</label>"+
                    "<button class='btn btn-outline-danger barButObj btnEditObj' id='btnEditObj' data-toggle='modal' data-target='#modEditObj'><i class='fa fa-pencil'></i> Editar</button></div>"+
                    "<div class='col-md-12'> <button class='btn btn-outline-danger barButObj btnDeleteObj'id='btnDeleteObj' data-toggle='modal' data-target='#confirmDeleteObj'><i class='fa fa-trash'></i> Eliminar</button>"+
                    "</div><div class='col-md-12'><button class='btn btn-outline-danger barButObj' id='btnObtenidoObj'><i class='fa fa-check-square'></i>"+ estado+"</button>"+
                    "</div></div></div></div></div>"
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

function getUserData(displayUserID){
    var req=new XMLHttpRequest();
    req.onreadystatechange = function(data) {   
        if(req.readyState==4&&req.status==200){
            var datos=data.target.response;
            var parse=JSON.parse(datos);
            //var valor=parse.length;
            if (parse){
                parse[0].forEach((k,v)=>{
                    document.getElementById("userPerfil").value = k.nombre_Usuario;
                    document.getElementById("emailPerfil").value = k.correo_Usuario;
                    document.getElementById("pwdPerfil").value = k.password_Usuario;

                    if(k.tipo_Cuenta == "private"){
                        document.getElementById("publicUser").checked=false;
                        document.getElementById("privateUser").checked=true;                      
                    }                       
                    if(k.tipo_Cuenta == "public"){
                        document.getElementById("publicUser").checked=true;
                        document.getElementById("privateUser").checked=false;  
                    }
                });
            }
        }
       
    }
    req.open('POST','http://localhost:3000/getUserData');
    req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    req.send(
        JSON.stringify({id:displayUserID})
    );  
}

function deleteMyAccount(){   
    var currentUser = localStorage.getItem("currentUser");
    var req=new XMLHttpRequest();
    req.onreadystatechange = function() {   
        if(req.readyState==4&&req.status==200){
        var data=req.responseText;
        
        if (data=="1"){
          alert("¡Perfil eliminado!")
          $('#confirmDelete').modal('toggle'); 
          window.location.href='landing.html';
          logOut();
        }
        else
          alert("Error en el proceso")
        }
       
    }
    req.open('DELETE','http://localhost:3000/bajaMyUser');
    req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    req.send(
        JSON.stringify({id:currentUser})
    ); 
}

function updateUserData(){
    let updateForm = document.querySelector('form#formProfile');
   
    var currentUser = localStorage.getItem("currentUser");
    var user = updateForm.userPerfil.value;
    var mail = updateForm.emailPerfil.value;
    var pass = updateForm.pwdPerfil.value;
    var passConfirm = updateForm.rpwdPerfil.value;
    var typeC=1;
    
    var radioButt = document.getElementsByName('tipoCuentaRB');           
    for(i = 0; i < radioButt.length; i++) { 
        if(radioButt[i].checked) 
            typeC=parseFloat(radioButt[i].value); 
    } 
    
    if(user.length >= 5 && user.length <= 45
       && pass.length >= 5 && pass.length <= 15
       && mail.length >= 5 && mail.length <= 50){
        if(pass == passConfirm){
            if((!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail.value)))){
                 var req=new XMLHttpRequest();
                 req.onreadystatechange = function() {   
                     if(req.readyState==4&&req.status==200){
                         var data=req.responseText;
                         
                     if (data=="1") {
                         //window.location.replace("http://127.0.0.1:5501/myLists.html");
                         //Sign in con credenciales.
                         alert("Datos actualizados correctamente!");
                         location.reload();
                         }
                     else
                         alert("Usuario o correo ya registrado.")
                         }    
                 }//HERE
                 req.open('PUT','http://localhost:3000/updateMyData');
                 req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
                 req.send(
                     JSON.stringify({id:currentUser, user:user, email:mail, password:pass, type:typeC})
                 );
     
             }
             else
                 alert("Ingrese un correo valido.");
        }
        else
            alert("Las contraseñas no coinciden.")
    }
    else
        alert("Verifique sus datos.");
}

function getUserListstoProfile(userDisplay){
    var req=new XMLHttpRequest();
    req.onreadystatechange = function(data) {   
        if(req.readyState==4&&req.status==200){
            var datos=data.target.response;
            var parse=JSON.parse(datos);
            //var valor=parse.length;
            if (parse)
                parse.forEach((k,v)=>{
                    
                    if(k.tipo_Lista=="private")
                        tipoMensaje="Privada"
                    else
                        tipoMensaje="Pública"
                    $("#containerUserLists").append(
                        "<div class='col-md-12'> <div class='card myList'> <div class='row no-gutters'>"+
                        "<div class='col-md-2'> <img class='card-img imgList' src='Imagenes/default-image-list.png'>"+
                        "</div> <div class='col-md-10'> <div class='card-body'>"+
                        "<label class='idLista' style='font-size:10px;'>"+k.id_Lista+"</label>"+//DISPLAY NONE PENDIENTE
                        "<h2 class='col-md-12 titleList'>"+k.nombre_Lista+"</h2>"+
                        "<h6 class='col-md-12 privacyList'>"+tipoMensaje+"</h6>"+
                        "<p class='descrList'>"+k.descrip_Lista+"</p>"+
                        "<div class='buttons'>"+
                        "<button class='btnSeeList btn btn-outline-danger barBut'"+
                        "id='btnSeeList'><i class='fa fa-eye'></i> Ver mi lista</button>"+
                        "</div></div></div></div></div> </div>"

                    );


                });
        }
       
    }
    req.open('POST','http://localhost:3000/allUserLists');
    req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    req.send(
        JSON.stringify({id:userDisplay})
    );  
}

function gotoSearch(keyword){
    localStorage.setItem("busqueda",keyword);
    window.location.href = "http://127.0.0.1:" + livePort + "/searchResult.html";
}

function getSearching(keyword){
    if(keyword != null){
        var req=new XMLHttpRequest();
        req.onreadystatechange = function(data) {   
            if(req.readyState==4&&req.status==200){
                var datos=data.target.response;
                var parse=JSON.parse(datos);
                if (parse[0].length > 0){
                var skipping = parse.length;
                    parse[0].forEach((element, index, array)=>{ 
                        if(element.tipo_Lista=="private")
                            tipoMensaje="Privada"
                        else
                            tipoMensaje="Pública"
                        $("#displayResults").append(
                            "<div class='col-md-6'> <div class='card resultList'> <div class='row no-gutters'>"+
                            "<div class='col-md-2'> <img class='card-img imgList' src='Imagenes/default-image-list.png'>"+
                            "</div> <div class='col-md-10'> <div class='card-body'>"+
                            "<label class='idLista' style='font-size:10px;'>"+element.id_Lista+"</label>"+//DISPLAY NONE PENDIENTE
                            "<h2 class='col-md-12 titleList'>"+element.nombre_Lista+"</h2>"+
                            "<h6 class='col-md-12 privacyList'> Creada por: "+element.nombre_Usuario+"</h6>"+
                            "<p class='descrList'>"+element.descrip_Lista+"</p>"+
                            "<div class='buttons'>"+
                            "<button class='btnSeeList btn btn-outline-danger barBut'  data-toggle='modal' data-target='#editorNoticia'"+
                            "type='submit' id='btnSeeList'><i class='fa fa-eye'></i> Ver mi lista</button>"+
                            "</div></div></div></div></div> </div>"
    
                        );
                    });
                }
            }
        
        }
        req.open('GET', `http://localhost:3000/searching-lists/${keyword}`);
        req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        req.send(        
            JSON.stringify({buscando: keyword})
        );
    }
}

function getSearchData(){  
    var palBusq =document.getElementById("BRSearch").value;
    localStorage.setItem("busqueda",palBusq);
    document.getElementById("palabraB").innerHTML="Resultados de: " + palBusq;
    document.getElementById("displayResults").innerHTML = "";

    var goTo;
    if($("#filtList").prop("checked")){
        goTo = `http://localhost:3000/searching-lists/${palBusq}`;

        if(palBusq.length < 20){
            var req=new XMLHttpRequest();
            req.onreadystatechange = function(data) {   
                if(req.readyState==4&&req.status==200){
                    var datos=data.target.response;
                    var parse=JSON.parse(datos);
                    if (parse[0].length > 0){
                        parse[0].forEach((element, index, array)=>{ 
                            $("#displayResults").append(
                                "<div class='col-md-6'> <div class='card resultList'> <div class='row no-gutters'>"+
                                "<div class='col-md-2'> <img class='card-img imgList' src='Imagenes/default-image-list.png'>"+
                                "</div> <div class='col-md-10'> <div class='card-body'>"+
                                "<label class='idLista' style='font-size:10px;'>"+element.id_Lista+"</label>"+//DISPLAY NONE PENDIENTE
                                "<h2 class='col-md-12 titleList'>"+element.nombre_Lista+"</h2>"+
                                "<h6 class='col-md-12 privacyList'> Creada por: "+element.nombre_Usuario+"</h6>"+
                                "<p class='descrList'>"+element.descrip_Lista+"</p>"+
                                "<div class='buttons'>"+
                                "<button class='btnSeeList btn btn-outline-danger barBut'  data-toggle='modal' data-target='#editorNoticia'"+
                                "type='submit' id='btnSeeList'><i class='fa fa-eye'></i> Ver mi lista</button>"+
                                "</div></div></div></div></div> </div>"
                            );
                        });
                    }
                }
            
            }
            req.open('GET',goTo);
            req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
            req.send(        
                JSON.stringify({buscando: palBusq})
            ); 
        }
        else
            alert("El filtro es muy largo!");
    }
    if($("#filtUser").prop("checked")){
        goTo = `http://localhost:3000/searching-users/${palBusq}`;

        if(palBusq.length < 20){
            var req=new XMLHttpRequest();
            req.onreadystatechange = function(data) {   
                if(req.readyState==4&&req.status==200){
                    var datos=data.target.response;
                    var parse=JSON.parse(datos);
                    if (parse[0].length > 0){
                        parse[0].forEach((element, index, array)=>{ 
                            $("#displayResults").append(
                                "<div class='col-md-3'> <div class='card resultList'> <div class='row no-gutters'>"+
                                "<div class='col-md-12'> <img class='card-img imgUser' src='Imagenes/default-image.png'>"+
                                "</div> <div class='col-md-12'> <div class='card-body'>"+
                                "<label class='idUser' style='font-size:10px; display:none;'>"+element.id_Usuario+"</label>"+
                                "<h2 class='col-md-12 userName'>"+element.nombre_Usuario+"</h2>"+
                                "<div class='col-md-12 buttonsUser'>"+
                                "<button class='btnSeeUser btn btn-outline-danger barButUser'"+
                                "id='btnSeeUser'><i class='fa fa-eye'></i> Ver usuario</button>"+
                                "</div></div></div></div></div> </div>"
                            );
                        });
                    }
                }
            
            }
            req.open('GET',goTo);
            req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
            req.send(        
                JSON.stringify({buscando: palBusq})
            ); 
        }
        else
            alert("El filtro es muy largo!");
    }
}

function isTheOwner(){
    var currentUser = localStorage.getItem("currentUser");
    var idLista = localStorage.getItem("lista");
    isOwner = false;

    var req=new XMLHttpRequest();
    req.onreadystatechange = function(data) {   
        if(req.readyState==4&&req.status==200){
            var datos=data.target.response;
            var parse=JSON.parse(datos);
            if (parse[0].length > 0){
                parse[0].forEach((element, index, array)=>{ 
                        if (element.id_Lista == idLista && !isOwner){
                            isOwner = true;
                        }
                });

                if(!isOwner){
                    document.getElementById("btnBarList").hidden=true;
                    document.getElementById("btnEditObj").hidden=true;
                    document.getElementById("btnDeleteObj").hidden=true;
                }
                else{
                    document.getElementById("btnBarList").hidden=false;
                    document.getElementById("btnEditObj").hidden=false;
                    document.getElementById("btnDeleteObj").hidden=false;
                }
            }
        }
    
    }
    req.open('GET', `http://localhost:3000/isOwner/${currentUser}`);
    req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    req.send(        
        JSON.stringify({current: currentUser})
    ); 

}
