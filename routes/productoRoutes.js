const express = require("express");
const router = express.Router();

const productoModel = require("../models/producto");

// consultar todos los productos
// http://localhost:3000/productos
router.get("/", async (request, response) => {
  const productos = await productoModel.obtener({});

  try {
    response.send(productos);
  } catch (error) {
    response.status(500).send(error);
  }
});

// http://localhost:3000/app/insertar_categoria
// enviar JSON por postman
router.post("/insertar_categoria", function (req, res, next) {

  const { Nombre, Id_categoria } = req.body;
  if (!Nombre || !Id_categoria) {
    return res.status(500).send("No hay nombre o id_categoria");
  } else {
    // Si todo va bien, seguimos
    productoModel.insertarCategoria(Id_categoria, Nombre);
    return res.send({ message: `Categoria Insertada!` });
  }
});

// eliminar categoria
// http://localhost:3000/app/eliminar_categoria/112
router.delete("/eliminar_categoria/:id", function (req, res, next) {
    
  productoModel
    .eliminarCategoria(req.params.id)
    .then(() => {
      res.send({ message: `Categoria Eliminada!` });
    })
    .catch((err) => {
      return res.status(500).send("Error eliminando");
    });
});

// modificar cliente
// http://localhost:3000/app/ingresoUsuario/1
// se modifican todos los campos 
router.put("/ingresoUsuario/:id", function (req, res, next) {
    const { Id_cliente, Nombre,Email,Contrasena,Telefono,Ciudad,Estado } = req.body;
  productoModel
    .ingresoUsuario( req.params.id,Nombre,Email,Contrasena,Telefono,Ciudad,Estado,Id_cliente)
    .then(() => {
      res.send({ message: `Bienvenido!!` });
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

// consultar producto por id
// http://localhost:3000/app/obtener/142365
router.get("/obtener/:id", async (req, res) => {
  try {
    const productos = await productoModel.obtenerPorId(req.params.id);
    res.send(productos);
  } catch (error) {
    response.status(500).send(error);
  }
});

//  productos segun la categoria
// http://localhost:3000/app/productos_categoria/101
router.get("/productos_categoria/:id", async (req, res) => {
  try {
    const productos = await productoModel.productosPorCategoria(req.params.id);
    res.send(productos);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Registrar cliente
// http://localhost:3000/app/registro
router.post("/registro/", function (req, res, next) {

  const { Nombre, Email, Contrasena, Telefono, Ciudad } = req.body;
  if (!Nombre || !Email || !Contrasena|| !Telefono || !Ciudad) {
    return res.status(500).send("Debe de enviar todos los campos");
  } else {
    // Si todo va bien, seguimos
    productoModel.insertarCliente(Nombre, Email, Contrasena, Telefono, Ciudad );
    return res.send({ message: `Registro exitoso!` });
  }
});

// consultar usuario por id
// http://localhost:3000/app/obtenerUsuario/142365
router.get("/obtenerUsuario/:id", async (req, res) => {
  try {
    const productos = await productoModel.obtenerUsuarioPorId(req.params.id);
    res.send(productos);
  } catch (error) {
    response.status(500).send(error);
  }
});


module.exports = router;
