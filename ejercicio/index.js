const { UserManager } = require("./mangers/UserManager.js");

const manager = new UserManager('./files/usuarios.json'); 

const env = async () => {
    const usuarios = await manager.getUsers();
    console.log(usuarios);

    const user = {
        nombre: 'juan',
        apellido: 'sandero',
        edad: 20,
        curso: 'react'
    };

    await manager.createUser(user);

    const usuariosResultadoFinal = await manager.getUsers();
    console.log(usuariosResultadoFinal);
}

env();