import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

const getAllEstudiantes = async () => {
    const response = await axios.get(`${API_URL}/estudiantes`);
    return response.data;
}

const getEstudiante = async (id) => {
    const response = await axios.get(`${API_URL}/estudiantes/${id}`);
    return response.data;
}

const createEstudiante = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.post(`${API_URL}/estudiantes`, data, config);
    if (response.status === 201 || response.status === 200) {
        ToastChakra('ESTUDIANTE REGISTRADO', 'El estudiante ha creado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

const updateEstudiante = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.put(`${API_URL}/estudiantes/${data._id}`, data, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('ESTUDIANTE MODIFICADO', 'El estudiante ha sido modificada correctamente', 'success', 1500, 'bottom');
    }
    return response.data;
}

const deleteEstudiante = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    };
    const response = await axios.delete(`${API_URL}/estudiantes/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('ESTUDIANTE ELIMINADO', 'El estudiante se ha eliminado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

const estudianteService = {
    getAllEstudiantes,
    getEstudiante,
    createEstudiante,
    updateEstudiante,
    deleteEstudiante,
}

export default estudianteService;