import React from 'react';
import Estudiantes from '../../components/estudiantes/Estudiantes';
import Dashboard from '../../components/layout/Dashboard';

const EstudiantesPage = () => {
    return ( <Dashboard componente={<Estudiantes />} /> )
}

export default EstudiantesPage;