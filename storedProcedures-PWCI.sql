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