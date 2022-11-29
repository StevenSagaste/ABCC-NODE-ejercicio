
------------------------------------------------------------------------------------------------
-- ARTICULOS
------------------------------------------------------------------------------------------------

CREATE DEFINER=`user`@`host` PROCEDURE `get_articuloBySku`(

    p_sku VARCHAR(6)

)
BEGIN
 SELECT * FROM `mydb2`.articulo WHERE sku=p_sku;
END

CREATE DEFINER=`user`@`host` PROCEDURE `get_articulos`()
BEGIN
  SELECT * FROM `mydb2`.articulo;
END

CREATE DEFINER=`user`@`host` PROCEDURE `save_articulos`(
	p_sku VARCHAR(6),
    p_articulo VARCHAR(15),
    p_marca VARCHAR(15),
    p_modelo VARCHAR(20),
    p_stock INT,
    p_cantidad INT,
    p_departamento INT,
    p_clase INT,
    p_familia INT

)
BEGIN
  INSERT INTO `mydb2`.articulo(sku,articulo,marca,modelo,stock,cantidad,departamento,clase,familia) VALUES (p_sku,p_articulo,p_marca,p_modelo,p_stock,p_cantidad,p_departamento,p_clase,p_familia);
END

CREATE DEFINER=`user`@`host` PROCEDURE `update_articulos`(

    p_articulo VARCHAR(15),
    p_marca VARCHAR(15),
    p_modelo VARCHAR(20),
    p_stock INT,
    p_cantidad INT,
    p_departamento INT,
    p_clase INT,
    p_familia INT,
    p_sku VARCHAR(6)

)
BEGIN
  UPDATE `mydb2`.articulo set articulo=p_articulo,marca=p_marca,modelo=p_modelo,stock=p_stock, cantidad=p_cantidad,departamento=p_departamento,clase=p_clase,familia=p_familia WHERE sku=p_sku;
END

CREATE DEFINER=`user`@`host` PROCEDURE `d_update_articulos`(

    p_articulo VARCHAR(15),
    p_marca VARCHAR(15),
    p_modelo VARCHAR(20),
    p_stock INT,
    p_cantidad INT,
    p_departamento INT,
    p_clase INT,
    p_familia INT,
    p_desc TINYINT,
    p_fechaBaja DATE,
    p_sku VARCHAR(6)

)
BEGIN
  UPDATE `mydb2`.articulo set articulo=p_articulo,marca=p_marca,modelo=p_modelo,stock=p_stock, cantidad=p_cantidad,departamento=p_departamento,clase=p_clase,familia=p_familia,descontinuado=p_desc,fechaBaja=p_fechaBaja WHERE sku=p_sku;
END

CREATE DEFINER=`user`@`host` PROCEDURE `delete_articulos`(

    p_sku VARCHAR(6)

)
BEGIN
 DELETE FROM `mydb2`.articulo WHERE sku=p_sku;
END

------------------------------------------------------------------------------------------------
-- DEPARTAMENTOS
------------------------------------------------------------------------------------------------

CREATE DEFINER=`user`@`host` PROCEDURE `get_departamentos`()
BEGIN
  SELECT * FROM `mydb2`.departamento;
END

CREATE DEFINER=`user`@`host` PROCEDURE `save_departamentos`(
 
    p_id INT,
    p_dep VARCHAR(45)

)
BEGIN
 INSERT INTO `mydb2`.departamento(id,departamento) VALUES (p_id,p_dep);
END

------------------------------------------------------------------------------------------------
-- CLASES
------------------------------------------------------------------------------------------------

CREATE DEFINER=`user`@`host` PROCEDURE `get_claseByDep`(

    p_dep INT(1)

)
BEGIN
 SELECT * FROM `mydb2`.clase WHERE `mydb2`.clase.departamento=p_dep;
END

------------------------------------------------------------------------------------------------
-- FAMILIAS
------------------------------------------------------------------------------------------------

CREATE DEFINER=`user`@`host` PROCEDURE `get_famByClass`(

    p_cls INT(2)

)
BEGIN
 SELECT * FROM `mydb2`.familia WHERE `mydb2`.familia.clase=p_cls;
END

------------------------------------------------------------------------------------------------
-- DEPARTAMENTO, CLASE Y FAMILIA
------------------------------------------------------------------------------------------------

CREATE DEFINER=`USER`@`host` PROCEDURE `get_DepClsFam`(
	p_dep INT(1),
	p_cls INT(2),
	p_fam INT(3)
)
BEGIN
select `mydb2`.departamento.departamento,`mydb2`.clase.clase,`mydb2`.familia.familia FROM `mydb2`.departamento,`mydb2`.clase,`mydb2`.familia WHERE `mydb2`.departamento.id = p_dep AND `mydb2`.clase.id = p_cls AND `mydb2`.familia.id = p_fam;
END