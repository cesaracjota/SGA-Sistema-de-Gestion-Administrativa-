import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import categoriaReducer from "../features/categoriaSlice";
import fraseReducer from "../features/fraseSlice";
import personaReducer from "../features/personaSlice";
import libroReducer from "../features/libroSlice";
import gradoReducer from "../features/gradoSlice";
import modalidadReducer from "../features/modalidadSlice";
import uniformeReducer from "../features/uniformeSlice";
import categoriaUniformeReducer from "../features/categoriaUniformeSlice";
import inmobiliarioReducer from "../features/inmobiliarioSlice";
import activoReducer from "../features/activoSlice";
import tipoActivoReducer from "../features/tipoActivoSlice";
import estudiante_ebrReducer from "../features/estudiantes/EBR/estudianteSlice";
import pagoReducer from "../features/pagoSlice";
import docenteReducer from "../features/docenteSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        categorias: categoriaReducer,
        frases: fraseReducer,
        personas : personaReducer,
        libros: libroReducer,
        grados: gradoReducer,
        modalidades: modalidadReducer,
        uniformes: uniformeReducer,
        categoria_uniformes: categoriaUniformeReducer,
        inmobiliarios: inmobiliarioReducer,
        activos: activoReducer,
        tipo_activos: tipoActivoReducer,
        estudiantes_ebr: estudiante_ebrReducer,
        pagos: pagoReducer,
        docentes: docenteReducer,
    },
})