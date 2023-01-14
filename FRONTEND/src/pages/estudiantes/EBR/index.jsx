import React from 'react';
import Estudiantes from '../../../components/estudiantes/EBR/Estudiantes';
import Dashboard from '../../../components/layout/Dashboard';
import AgregarEstudiante from '../../../components/estudiantes/EBR/AgregarEstudiante';
import DetallesEstudiante from '../../../components/estudiantes/EBR/DetallesEstudiante';
import EditarEstudiante from '../../../components/estudiantes/EBR/EditarEstudiante';

export const EstudiantesPage = () => {
    return ( <Dashboard componente={<Estudiantes />} /> )
}

export const EstudiantesPageAgregar = () => {
    return ( <Dashboard componente={<AgregarEstudiante />} /> )
}

export const EstudiantesPageDetalles = () => {
    return ( <Dashboard componente={<DetallesEstudiante />} /> )
}

export const EstudiantesPageEditar = () => {
    return ( <Dashboard componente={<EditarEstudiante />} /> )
}
