import React, { useState, useEffect } from 'react';
import { verificarLector, registrarUsuario } from './api'; // Importar funciones

const RegistroUsuario = () => {
    const [nombre, setNombre] = useState("");
    const [estado, setEstado] = useState("Verificando conexión con el lector...");

    useEffect(() => {
        verificarLector()
            .then((response) => {
                if (response.data.lectorConectado) {
                    setEstado("Lector de huellas conectado. Coloque su dedo en el lector.");
                } else {
                    setEstado("Lector de huellas no conectado. Por favor, verifique.");
                }
            })
            .catch((error) => setEstado("Error al verificar el lector de huellas."));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEstado("Registrando usuario...");

        try {
            const response = await registrarUsuario(nombre);
            setEstado(response.data.message || "Usuario registrado con éxito.");
        } catch (error) {
            setEstado("Error en el registro. Intente nuevamente.");
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100vh',
            padding: '1em',
            textAlign: 'center'
        }}>
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre del usuario"
                    required
                    style={{ padding: '0.5em', width: '100%', marginBottom: '1em' }}
                />
                <button type="submit" style={{ padding: '0.5em 1em' }}>Registrar Usuario</button>
            </form>
            <p>{estado}</p>
        </div>
    );
};

export default RegistroUsuario;
