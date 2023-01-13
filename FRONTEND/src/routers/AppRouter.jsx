import React from 'react';
import { Routes, Route } from "react-router-dom";
import Dashboard from '../components/layout/Dashboard';
import HomeContent from '../pages/home';
import SettingsPage from '../pages/settings';
import PersonasPage from '../pages/personas';
import LoginPage from '../pages/auth/Login';
import NotFoundPage from '../pages/404/NotFoundPage';
import RegisterPage from '../pages/auth/Register';
import PrivateRoutes from './PrivateRoutes';
import PublicRoute from './PublicRoute';
import ForgotPasswordPage from '../pages/auth/ForgotPassword';
import LibrosPage from '../pages/libros';
import GradosPage from '../pages/grados';
import UniformesPage from '../pages/uniformes';
import CarpetasPage from '../pages/carpetas';
import { ActivosPage, AgregarActivoPage, DetallesActivosPage, EditarActivoPage } from '../pages/activos';
import MiPerfilPage from '../pages/perfil';
import EstudiantesPage from '../pages/estudiantes';
import PagosPage from '../pages/pagos';
import CategoriasEquipoPage from '../pages/activos/categorias';
import { DocentesPage, DocentesPageDetalles, DocentesPageAgregar } from '../pages/docentes';

export default function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<PrivateRoutes />} >
                <Route path="/" element={<Dashboard />} />
                <Route path="/inicio" element={<HomeContent />} />
                <Route path='/settings' element={<SettingsPage />} />
                <Route path='/profile' element={<MiPerfilPage />} />
                <Route path='/usuarios' element={<PersonasPage />} />
                <Route path="/grados" element={<GradosPage />} />

                {/* Routes EBR */}

                <Route path='/ebr/libros/' element={<LibrosPage />} />
                <Route path='/ebr/uniformes/' element={<UniformesPage />} />
                <Route path='/ebr/inmobiliarios/' element={<CarpetasPage />} />
                <Route path='/ebr/equipos/' element={<ActivosPage />} />
                <Route path='/ebr/equipos/:id' element={<DetallesActivosPage />} />
                <Route path='/ebr/equipos/agregar' element={<AgregarActivoPage />} />
                <Route path='/ebr/equipos/editar/:id' element={<EditarActivoPage />} />
                <Route path='/ebr/equipos/categorias' element={<CategoriasEquipoPage />} />
                <Route path='/ebr/estudiantes/' element={<EstudiantesPage />} />
                <Route path='/ebr/docentes/' element={<DocentesPage />} />
                <Route path='/ebr/docentes/agregar' element={<DocentesPageAgregar />} />
                <Route path='/ebr/docentes/:id' element={<DocentesPageDetalles />} />
                <Route path='/ebr/pagos/' element={<PagosPage />} />

                {/* Routes CEBA */}

                <Route path='/ceba/estudiantes/' element={<CarpetasPage />} />
                <Route path='/ceba/pagos/' element={<CarpetasPage />} />

                {/* Routes RESIDENCIA */}

                <Route path='/residencia/estudiantes/' element={<CarpetasPage />} />
                <Route path='/residencia/pagos/' element={<CarpetasPage />} />

            </Route>
            <Route element={<PublicRoute />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="forgot-password" element={<ForgotPasswordPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}