const conexion = require("../conexion");

module.exports = {
    // insertar categorias
// http://localhost:3000/app/insertar_categoria
// enviar JSON por postman
    insertarCategoria(nombre, precio) {
        return new Promise((resolve, reject) => {
            conexion.query(`insert into categoria (id_categoria, nombre) values (?, ?)`,
                [nombre, precio], (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados.insertId);
                });
        });
    },
    //http://localhost:3000/productos
    obtener() {
        return new Promise((resolve, reject) => {
            conexion.query(`select Id_producto, Nombre, Precio from producto`,
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    },

    // consultar producto por id
// http://localhost:3000/app/obtener/142365
    obtenerPorId(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`select Id_producto, Nombre, Precio from producto where Id_producto = ?`,
                [id],
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados[0]);
                });
        });
    },
    // productos segun la categoria
    productosPorCategoria(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`select p.Id_producto,p.Precio,c.Id_categoria,p.Descripcion
            from tienda.categoria c inner join tienda.producto p on p.id_categoria = c.id_categoria 
            where c.Id_categoria = ?`,
                [id],
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados[0]);
                });
        });
    },
    // modificar cliente
// http://localhost:3000/app/modificar_cliente/10
    ingresoUsuario(Id_cliente, Nombre,Email,Contrasena,Telefono,Ciudad,Estado) {
        return new Promise((resolve, reject) => {
            conexion.query(`update tienda.cliente
            set Nombre = ?,Email = ?,Contrasena=?,Telefono=?,Ciudad=?,Estado=?
            where Id_cliente = ?`,
                [ Nombre,Email,Contrasena,Telefono,Ciudad,Estado,Id_cliente],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },
    eliminarCategoria(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`delete from tienda.categoria
            where Id_categoria = ?`,
                [id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },

    //Insertar cliente
    // http://localhost:3000/app/registro
    insertarCliente(Nombre, Email, Contrasena, Telefono, Ciudad) {
        return new Promise((resolve, reject) => {
            conexion.query(`insert into tienda.cliente (Nombre, Email, Contrasena, Telefono, Ciudad) values (?, ?, ?, ?, ?)`,
                [Nombre, Email, Contrasena, Telefono, Ciudad ], (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados.insertId);
                });
        });
    },

    // http://localhost:3000/app/login/
    login(Email,Contrasena,Estado) {
        return new Promise((resolve, reject) => {
            conexion.query(`update tienda.cliente
            set Estado=1
            where Email = ?,Contrasena=?`,
                [ Email,Contrasena,Estado],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },

    //http://localhost:3000/app/obtenerUsuario/esteban1@gmail.com
    obtenerUsuarioPorId(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`select Id_cliente, Nombre, Email, Contrasena, Telefono, Ciudad, Estado from cliente 
            where Email = ?`,
                [id],
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados[0]);
                });
        });
    },

}