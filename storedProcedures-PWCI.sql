USE pwcidb;


DELIMITER //
CREATE PROCEDURE sp_userSignUp(
	IN in_usuario varchar(20),
    IN in_Email varchar(50),
    IN in_Password varchar(15),
    IN in_Tipo tinyint
    )
    BEGIN
	INSERT INTO  usuarios(nombre_Usuario,correo_Usuario,password_Usuario,tipo_Cuenta)
SELECT in_usuario,in_Email,in_Password, in_Tipo
FROM dual
WHERE NOT EXISTS (SELECT nombre_Usuario, correo_Usuario FROM usuarios WHERE correo_Usuario =in_Email OR nombre_Usuario= in_usuario);
    END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE sp_altaLista(
	IN in_nombreLista varchar(30),
    IN in_descrip varchar(100),
    IN in_Tipo tinyint,
    IN in_idUsuario int
    )
    BEGIN
	INSERT INTO  lista(nombre_Lista,descrip_Lista,tipo_Lista,usuario_Dueno)
SELECT in_nombreLista, in_descrip, in_Tipo, in_idUsuario
FROM dual
WHERE NOT EXISTS (SELECT nombre_Lista FROM lista WHERE nombre_Lista=in_nombreLista AND usuario_Dueno= in_idUsuario);
    END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_editarLista(
	IN in_nombreLista varchar(30),
    IN in_descrip varchar(100),
    IN in_Tipo tinyint,
    IN in_Lista int
    )
    BEGIN
	UPDATE lista SET nombre_Lista=in_nombreLista, descrip_Lista=in_descrip, tipo_Lista=in_Tipo
    WHERE id_lista=in_Lista;
    END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_addObjeto(
	IN in_nombreObjeto varchar(30),
    IN in_descrip varchar(100),
    IN in_estado int,
    IN in_idLista int
    )
    BEGIN
	INSERT INTO objeto(nombre_Objeto,descrip_Objeto,estado_Objeto,lista_Duena)
    VALUES(in_nombreObjeto,in_descrip,in_estado,in_idLista);
    END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_editarObjeto(
	IN in_idObjeto int,
	IN in_nombreObjeto varchar(30),
    IN in_descrip varchar(100),
    IN in_estado int
    )
    BEGIN
	UPDATE objeto SET nombre_Objeto=in_nombreObjeto, descrip_Objeto=in_descrip, estado_Objeto=in_estado WHERE id_Objeto=in_idObjeto;
    END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_getListObjects(
    IN in_idLista int
    )
    BEGIN
	SELECT id_Objeto, nombre_Objeto,descrip_Objeto,estado_Objeto
    FROM objeto 
    WHERE lista_Duena=in_idLista;
    END //
DELIMITER ;



/*----------------TRIGGER LISTA---------------*/
DELIMITER //
CREATE TRIGGER t_deleteListaObjeto
BEFORE DELETE
ON lista FOR EACH ROW
BEGIN
   DELETE FROM objeto WHERE lista_Duena=OLD.id_Lista;
END//
DELIMITER ;
