const { response } = require('express');
const Frase = require('../models/frase');

const getFrases = async (req, res = response) => {

    try {

        const frases = await Frase.find().populate('categoria', 'nombre descripcion estado createdAt updatedAt');

        res.json({
            ok: true,
            frases
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const getFrase = async (req, res = response) => {

    try {

        const frase = await Frase.findById(req.params.id).populate('categoria', 'nombre descripcion estado createdAt updatedAt');

        if (!frase) {
            return res.status(404).json({
                ok: false,
                msg: 'Frase no encontrada'
            });
        }

        res.json({
            ok: true,
            frase
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const getFraseRandom = async (req, res = response) => {

    try {

        const frases = await Frase.find({ estado: true }).populate('categoria', 'nombre descripcion estado createdAt updatedAt');
        const frase = frases[Math.floor(Math.random() * frases.length)];
        
        res.json({
            ok: true,
            frase
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const crearFrase = async (req, res = response) => {
    
        try {
    
            const { categoria, contenido, autor } = req.body;
    
            const fraseDB = await Frase.findOne({ contenido });
            
            if (fraseDB) {
                return res.status(400).json({
                    ok: false,
                    msg: 'La frase ya existe'
                });
            }
    
            const data = {
                categoria,
                contenido,
                autor
            }
    
            const frase = new Frase(data);
    
            await frase.save();
    
            res.json({
                ok: true,
                frase
            });
    
        } catch (error) {
    
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
    
        }
    
    }

const actualizarFrase = async (req, res = response) => {
    try {

        const { id } = req.params;
        const { categoria, contenido, autor } = req.body;

        const data = {
            categoria,
            contenido,
            autor
        }

        const frase = await Frase.findByIdAndUpdate(id, data, { new: true });

        res.json({
            ok: true,
            frase
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const getFrasesByCategoria = async (req, res = response) => {

    try {

        const { categoria } = req.params;
        const frases = await Frase.find({ categoria }).populate('categoria', 'nombre descripcion estado createdAt updatedAt');;
        res.json({
            ok: true,
            frases
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

const getFrasesByAutor = async (req, res = response) => {
    
        try {
    
            const { autor } = req.params;
            const frases = await Frase.find({ autor }).populate('categoria', 'nombre descripcion estado createdAt updatedAt');;
            res.json({
                ok: true,
                frases
            });
    
        } catch (error) {
    
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
    
        }
    
}

const inactivarFrase = async (req, res = response) => {
    try {

        const { id } = req.params;
        const frase = await Frase.findByIdAndUpdate(id, { estado: false }, { new: true }).populate('categoria', 'nombre descripcion estado createdAt updatedAt');;
        res.json({
            ok: true,
            frase
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const activarFrase = async (req, res = response) => {
    try {

        const { id } = req.params;
        const frase = await Frase.findByIdAndUpdate(id, { estado: true }, { new: true }).populate('categoria', 'nombre descripcion estado createdAt updatedAt');;
        res.json({
            ok: true,
            frase
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const borrarFrase = async (req, res = response) => {
    try {

        const { id } = req.params;
        const frase = await Frase.findByIdAndDelete(id).populate('categoria', 'nombre descripcion estado createdAt updatedAt');;
        res.json({
            ok: true,
            frase
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

module.exports = {
    getFrases,
    getFrase,
    getFraseRandom,
    crearFrase,
    actualizarFrase,
    getFrasesByCategoria,
    getFrasesByAutor,
    inactivarFrase,
    activarFrase,
    borrarFrase,
}