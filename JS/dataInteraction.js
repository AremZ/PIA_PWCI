/*
//////////
AL CARGAR EL HTML MANDA CONSOLE LOG CON LA INFO
/////////
*/

function getLogged(){
    var currentUser = sessionStorage.getItem("currentUser");
    alert(currentUser);
}
function logOut(){
    sessionStorage.setItem("currentUser", 0);
}

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
}



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
        
        if (data=="1")
          //window.location.replace("http://127.0.0.1:5501/myLists.html");
          alert("¡Registro exitoso! Por favor inicia sesión.")
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
            sessionStorage.setItem("currentUser", id);
            window.location.replace("http://127.0.0.1:5501/myLists.html");
        }
    }
        else
          alert("Verifique los datos.")
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

function validateList(mode){
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
    createList();
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

    var currentUser = sessionStorage.getItem("currentUser");
    /*
    var ele = document.getElementsByName('tipoCuentaRB');           
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) 
            typeC=parseFloat(ele[i].value); 
    } */


    if(nameL.length>3&&descL.length>10&&typeC!=0){
    //e.preventDefault();
    console.log(newListForm);
    //console.log(e);
    var req=new XMLHttpRequest();
    req.onreadystatechange = function() {   
        if(req.readyState==4&&req.status==200){
        var data=req.responseText;
        
        if (data=="1")
          //window.location.replace("http://127.0.0.1:5501/myLists.html");
          alert("¡Lista creada!")
        else
          alert("Usuario o correo ya registrado.")
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
    var currentUser = sessionStorage.getItem("currentUser");
    //falta recuperar id de lista
    var req=new XMLHttpRequest();
    req.onreadystatechange = function(data) {   
        if(req.readyState==4&&req.status==200){
            var datos=data.target.response;
            console.log(datos);
            var parse=JSON.parse(datos);
            var valor=parse.length;
            console.log(parse);
            console.log(valor);
        }
       
    }
    req.open('POST','http://localhost:3000/allUserLists');
    req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    req.send(
        JSON.stringify({id:currentUser})
    );

    
}