function validateLogin(){
    
    
    document.getElementById("user").value="";
    document.getElementById("pass").value="";
    window.location.replace("http://127.0.0.1:5500/myLists.html");

}

function validateList(mode){
    var content=document.getElementById("nameList");
    var content2=document.getElementById("descrList");
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
    content.value="";
    content2.value="";
    }
}

function limpiarCampo(mode){
    
    if(mode==0){
        document.getElementById("nameContainerList").className=document.getElementById("nameContainerList").className.replace(" error","");
        document.getElementById("descrContainerList").className=document.getElementById("descrContainerList").className.replace(" error","");
    }
    else{
        document.getElementById("nameContainerObj").className=document.getElementById("nameContainerObj").className.replace(" error","");
        document.getElementById("descrContainerObj").className=document.getElementById("descrContainerObj").className.replace(" error","");
    }
}