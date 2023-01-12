const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');


const login = async (req, res = response) => {

    try {

        const { correo, password, modalidad } = req.body;

        const usuarioDB = await Usuario.findOne({ correo });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Verificar el password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            msg: 'login',
            usuario : {
                uid: usuarioDB.id,
                nombre: usuarioDB.nombre,
                correo: usuarioDB.correo,
                password: usuarioDB.password,
                img: usuarioDB.img,
                rol: usuarioDB.rol,
                modalidad: modalidad
            },
            menu: getMenuFrontEnd( usuarioDB.rol, modalidad ),
            token
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generarJWT( uid );

    // Obtener el usuario por UID
    const usuario = await Usuario.findById( uid );

    res.json({
        ok: true,
        token,
        usuario,
        menu: getMenuFrontEnd( usuario.role )
    });

}

module.exports = {
    login,
    renewToken
}