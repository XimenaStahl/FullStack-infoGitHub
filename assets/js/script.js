import { getUser, getRepo } from './infoAPI.js';


const genera_tabla = (datos, repo) => {
    const tabla = document.createElement('table');
    const resultado = document.getElementById('resultados');

    let tr = document.createElement('tr');

    let td1 = document.createElement('th');
    let td2 = document.createElement('th');
    td2.className = "tituloRepo";
    let text1 = document.createTextNode('Datos de Usuario');
    let text2 = document.createTextNode('Nombre de Repositorios');

    td1.appendChild(text1);
    td2.appendChild(text2);
    tr.appendChild(td1);
    tr.appendChild(td2);

    tabla.appendChild(tr);

    tr = document.createElement('tr');

    td1 = document.createElement('td');
    td2 = document.createElement('td');
    td2.className = "listaRepo";

    // Datos Columna 1
    let img = document.createElement('img');
    img.setAttribute('src', datos.avatar_url);
    img.setAttribute('width', 200);
    td1.appendChild(img);
    td1.appendChild(document.createElement('br'));
    text1 = document.createTextNode(`Nombre de Usuario: ${datos.name}`);
    td1.appendChild(text1);
    td1.appendChild(document.createElement('br'));
    text1 = document.createTextNode(`Nombre de Login: ${datos.login}`);
    td1.appendChild(text1);
    td1.appendChild(document.createElement('br'));
    text1 = document.createTextNode(`Cantidad de Repositorios: ${datos.public_repos}`);
    td1.appendChild(text1);
    td1.appendChild(document.createElement('br'));
    text1 = document.createTextNode(`Localidad: ${datos.location}`);
    td1.appendChild(text1);
    td1.appendChild(document.createElement('br'));
    text1 = document.createTextNode(`Tipo de Usuario: ${datos.type}`);
    td1.appendChild(text1);
    td1.appendChild(document.createElement('br'));

    // Datos columna 2
    repo.forEach(item => {
        text2 = document.createTextNode(`${item.name}`);
        td2.appendChild(text2);
        td2.appendChild(document.createElement('br'));
    });

    // Agregar a fila
    tr.appendChild(td1);
    tr.appendChild(td2);

    tabla.appendChild(tr);

    // document.body.appendChild(tabla);
    resultado.appendChild(tabla)
    return tabla
};

const mostrarInfoDOM = () => {
    const cuerpo = document.body;
    let btnEnviar = document.getElementById('btnEnviar');

    btnEnviar.addEventListener('click', async(event) => {
        event.preventDefault();
        let nombreUsuario = document.getElementById('nombreUsuario');
        let nroPaginas = document.getElementById('pagina');
        let repoPagina = document.getElementById('repoPagina');
        // Revisar si había otra tabla y eliminarla antes de llamar a la función
        try {
            var removeTab = document.getElementsByTagName('table')[0];
            removeTab.remove()
        } catch (error) {
            console.log(error);
        }

        // Revisar que los datos sean ingresados 
        let regexAlf = new RegExp(/^[a-z]*?$/, 'gm'); // Expresión regular que sólo admite letras
        let regexNum = new RegExp(/^([1-9]\d{0,2})?$/, 'gm'); // Expresión regular que sólo admite números entre 1 y 999


        let esAlfabetico = regexAlf.test(nombreUsuario.value.toLowerCase());
        let esNumeroPag = regexNum.test(parseInt(nroPaginas.value));
        let rep = repoPagina.value;
        let esNumeroRep = rep.match(regexNum);

        if (!esAlfabetico || !esNumeroPag || (esNumeroRep === null || esNumeroRep > 100)) {
            nombreUsuario.value = '';
            nroPaginas.value = '';
            repoPagina.value = '';
        }
        if (!esAlfabetico) {
            throw alert('El nombre de usuario debe contener sólo letras')
        }
        if (!esNumeroPag) {
            throw alert('El número de página debe ser un número  mayor a 0')
        }
        if (esNumeroRep === null || esNumeroRep > 100) {
            throw alert('El número de repositorios debe ser un número entre 1 y 100')
        }

        // Si el usuario no existe datos tendrá el valor '404' y si  es así no debe continuar la ejecución
        try {
            const datos = await getUser(nombreUsuario.value);
            if (datos === '404') { throw 'Usuario no existe !!' };

            const repo = await getRepo(nombreUsuario.value, nroPaginas.value, repoPagina.value);
            genera_tabla(datos, repo);

        } catch (error) {
            console.log(error);
        }

        // Limpia datos de búsqueda
        nombreUsuario.value = '';
        nroPaginas.value = '';
        repoPagina.value = '';
    });
};

let llamadaFunciones = async() => {
    const datos = await mostrarInfoDOM();
    return datos;
};

llamadaFunciones()