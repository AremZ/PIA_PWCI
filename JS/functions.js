function limpiarCampo(idCampo){
    document.getElementById(idCampo).className=document.getElementById(idCampo).className.replace(" error","");
}

function setupImage(input, display, theClass){
    const addPhoto = document.getElementById(input);
    const container =  document.getElementById(display);
    const previewImage = container.querySelector(theClass);

    addPhoto.addEventListener("change", function(){
        const file = this.files[0];

        if(file){
            const reader = new FileReader();
            changedPhoto = true;

            reader.addEventListener("load", function(){
                previewImage.setAttribute("src", this.result);
            });

            reader.readAsDataURL(file);

        }
    });
}

function modificarDatos(){
    $("#btnModDat").toggle();
    $("#btnSaveDat").toggle();
    $("#btnCancelDat").toggle();
    $("#btnDelAcc").toggle();
    $("#btnCambiarFoto").toggle();
    $("#rpwdPerfil").toggle();
    $("#lblrpwdPerfil").toggle();

    document.getElementById("userPerfil").disabled=false;
    document.getElementById("emailPerfil").disabled=false;
    document.getElementById("pwdPerfil").disabled=false;
    document.getElementById("publicUser").disabled=false;
    document.getElementById("privateUser").disabled=false;

    document.getElementById("rpwdPerfil").value="";

    $("#containerPwd").removeClass('col-md-12');
    $("#containerPwd").addClass('col-md-6');
    
    return false;
}

function cleanTextarea(idTxt){
    document.getElementById(idTxt).className=document.getElementById(idTxt).className.replace(" error","");
}

function cancelarDatos(){ 
    getUserData();
    $("#btnModDat").toggle();
    $("#btnSaveDat").toggle();
    $("#btnCancelDat").toggle();
    $("#btnDelAcc").toggle();
    $("#btnCambiarFoto").toggle();
    $("#rpwdPerfil").toggle();
    $("#lblrpwdPerfil").toggle();

    document.getElementById("userPerfil").disabled=true;
    document.getElementById("emailPerfil").disabled=true;
    document.getElementById("pwdPerfil").disabled=true;
    document.getElementById("publicUser").disabled=true;
    document.getElementById("privateUser").disabled=true;

    $("#containerPwd").removeClass('col-md-6');
    $("#containerPwd").addClass('col-md-12');
}

function isLoggedUser(logged, current){
    if(current != logged){
        document.getElementById("userType").hidden=true;
        document.getElementById("containerPwd").hidden=true;
        document.getElementById("btnModDat").hidden=true;
        document.getElementById("btnDelAcc").hidden=true;
        document.getElementById("imgProfile").hidden=true;
        getUserPubstoProfile(current);
    }
    else  
        getUserListstoProfile(logged);
}

function cancelObjeto(){
    $('#modNewObj').modal('toggle');
    document.getElementById("descrObj").value='';
    document.getElementById("nameObj").value='';
}

function toggleEditList(){ 
    document.getElementById("nameList").value = document.getElementById("titleLista").innerText;
    document.getElementById("descrNewList").value = document.getElementById("displayDescrList").innerText;

    var type = document.getElementById("tipoLista").innerText
        
    if(type == 'Privada'){
        document.getElementById("tipoListaE").selectedIndex = 0;
    }
    else{
        document.getElementById("tipoListaE").selectedIndex = 1;
    }

    $('#modEditList').modal('toggle');
}