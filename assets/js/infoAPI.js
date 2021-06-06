// https://api.github.com/users/{user}

// https://api.github.com/users/{user}/repos?page={pagina}&per_page={cantidad_repos}


// Función request para hacer peticiones a la API
// Funciones getUser y getRepo enían información a request

export const getUser = async(usuario) => {
    const endPointUser = `https://api.github.com/users/${usuario}`;
    try {
        const respuesta = await fetch(endPointUser);
        if (respuesta.ok) {
            const infoUsuario = await respuesta.json();
            return infoUsuario;
        }
        throw new Error('Usuario no encontrado');
    } catch (error) {
        console.log(error);
        alert('Usuario no encontrado');
        return '404'
    }
}

export const getRepo = async(usuario, pagina, cantidad_repos) => {
    const endPointRepo = `https://api.github.com/users/${usuario}/repos?page=${pagina}&per_page=${cantidad_repos}`;
    try {
        const resp = await fetch(endPointRepo);
        if (resp.ok) {
            const infoRepo = await resp.json();
            return infoRepo;
        }
        throw new Error('Repositorio no encontrado');
    } catch (error) {
        console.log(error);
    }
}