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
    var typeC=2;


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