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

function modificarDatos(){
    $("#btnModDat").toggle();
    $("#btnSaveDat").toggle();
    $("#btnCancelDat").toggle();
    $("#btnDelAcc").toggle();
    $("#btnCambiarFoto").toggle();
    $("#rpwdPerfil").toggle();
    $("#lblrpwdPerfil").toggle();

    document.getElementById("fnamePerfil").disabled=false;
    document.getElementById("snamePerfil").disabled=false;
    document.getElementById("lnamePerfil").disabled=false;
    document.getElementById("emailPerfil").disabled=false;
    document.getElementById("userPerfil").disabled=false;
    document.getElementById("pwdPerfil").disabled=false;

    document.getElementById("rpwdPerfil").value="";
}

function cleanTextarea(idTxt){
    document.getElementById(idTxt).className=document.getElementById(idTxt).className.replace(" error","");
}

function verificarDatos(){

    var error = 0;
    var campo;
    campo = document.getElementById("fnamePerfil");
    if(campo.value == ""){
        document.getElementById("fnamePerfil").className=document.getElementById("fnamePerfil").className+" error";
        error = 1;
    }

    campo = document.getElementById("snamePerfil");
    if(campo.value == ""){
        document.getElementById("snamePerfil").className=document.getElementById("snamePerfil").className+" error";
        error = 1;
    }

    campo = document.getElementById("lnamePerfil");
    if(campo.value == ""){
        document.getElementById("lnamePerfil").className=document.getElementById("lnamePerfil").className+" error";
        error = 1;
    }

    campo = document.getElementById("emailPerfil");
    if(campo.value == ""){
        document.getElementById("emailPerfil").className=document.getElementById("emailPerfil").className+" error";
        error = 1;
    }
    else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(campo.value))){
        document.getElementById("emailPerfil").className=document.getElementById("emailPerfil").className+" error";
        alert("Dirección de correo inválida.")
        error = 1;
    }

    campo = document.getElementById("userPerfil");
    if(campo.value == ""){
        document.getElementById("userPerfil").className=document.getElementById("userPerfil").className+" error";
        error = 1;
    }

    campo = document.getElementById("pwdPerfil");
    if(campo.value == ""){
        document.getElementById("pwdPerfil").className=document.getElementById("pwdPerfil").className+" error";
        error = 1;
    }

    campoRep = document.getElementById("rpwdPerfil");
    if(campoRep.value == ""){
        document.getElementById("rpwdPerfil").className=document.getElementById("rpwdPerfil").className+" error";
        error = 1;
    }
    else if (campo.value != campoRep.value){
        document.getElementById("rpwdPerfil").className=document.getElementById("rpwdPerfil").className+" error";
        alert("Las contraseñas no son iguales.")
        error = 1;
    }

    if (error == 0){
        alert("Datos cambiados exitosamente.")

        $("#btnModDat").toggle();
        $("#btnSaveDat").toggle();
        $("#btnCancelDat").toggle();
        $("#btnDelAcc").toggle();
        $("#btnCambiarFoto").toggle();
        $("#rpwdPerfil").toggle();
        $("#lblrpwdPerfil").toggle();

        document.getElementById("fnamePerfil").disabled=true;
        document.getElementById("snamePerfil").disabled=true;
        document.getElementById("lnamePerfil").disabled=true;
        document.getElementById("emailPerfil").disabled=true;
        document.getElementById("userPerfil").disabled=true;
        document.getElementById("pwdPerfil").disabled=true;
    }
}

function cancelarDatos(){
    $("#btnModDat").toggle();
    $("#btnSaveDat").toggle();
    $("#btnCancelDat").toggle();
    $("#btnDelAcc").toggle();
    $("#btnCambiarFoto").toggle();
    $("#rpwdPerfil").toggle();
    $("#lblrpwdPerfil").toggle();

    document.getElementById("fnamePerfil").disabled=true;
    document.getElementById("snamePerfil").disabled=true;
    document.getElementById("lnamePerfil").disabled=true;
    document.getElementById("emailPerfil").disabled=true;
    document.getElementById("userPerfil").disabled=true;
    document.getElementById("pwdPerfil").disabled=true;
}