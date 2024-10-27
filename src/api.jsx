import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Cambia esto si tu backend tiene otra URL
});

export const verificarLector = () => {
    return api.get('/verificar-lector');
};

export const registrarUsuario = (nombre) => {
    return api.post('/usuarios', { nombre });
};
