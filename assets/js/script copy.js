import { getUser, getRepo } from './infoAPI.js';

const mostrarInfoDOM = () => {
    const cuerpo = document.body;
    let btnEnviar = document.getElementById('btnEnviar');

    // btnAgregar.addEventListener('click', (event) => {
    //             event.preventDefault();

    btnEnviar.addEventListener('click', async(event) => {
        event.preventDefault();
        let nombreUsuario = document.getElementById('nombreUsuario').value;
        console.log(nombreUsuario.value)
        let nroPaginas = document.getElementById('pagina').value;
        let repoPagina = document.getElementById('repoPagina').value;

        const datos = await getUser(nombreUsuario);
        const repo = await getRepo(nombreUsuario, nroPaginas, repoPagina);
        // let li = document.createElement('li');
        // li.textContent = `${i} - ${datos.title}`;
        // console.log(li.textContent)
        // cuerpo.appendChild(li);
        console.log(datos)

        // nombre datos.name
        // Nombre de login datos.login
        // Cantidad de Repositorios datos.public_repos
        // Localidad datos.location
        // Tipo de Usuario datos.type

        console.log(repo)
            // recorrer arreglo repo[i].name
        genera_tabla(datos, repo);
    });
    // resultados.appendChild(botonSolicitud);
};


let llamadaFunciones = async() => {
    const datos = await mostrarInfoDOM();
    return datos;
}

const genera_tabla = (datos, repo) => {
    const tabla = document.createElement('table');
    console.log(tabla)
    const resultado = document.getElementById('resultados');
    console.log(resultado)
    resultado.appendChild(tabla)

    // Encabezados
    let cuerpoTabla = tabla.createTHead();
    let fila = cuerpoTabla.insertRow();
    // Columna de Datos de Usuario
    let th = document.createElement("th");
    let text = document.createTextNode('Datos de Usuario');
    th.appendChild(text);
    fila.appendChild(th);
    fila = cuerpoTabla.insertRow();
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');

    // Avatar datos.avatar_url
    let img = document.createElement('img');
    img.setAttribute('src', datos.avatar_url)
    td1.appendChild(img);
    // Nombre Usuario
    // fila = cuerpoTabla.insertRow();
    // td = document.createElement('td');
    text = document.createTextNode(`Nombre de Usuario: ${datos.name}`);
    td1.appendChild(text);
    // fila.appendChild(td1);
    // text = document.createTextNode('');
    // td1.appendChild(text);
    // fila.appendChild(td1);
    // Nombre de login datos.login
    // fila = cuerpoTabla.insertRow();
    // td1 = document.createElement('td1');
    text = document.createTextNode(`Nombre de Login: ${datos.login}`);
    td1.appendChild(text);
    // fila.appendChild(td1);
    // text = document.createTextNode('');
    // td1.appendChild(text);
    // fila.appendChild(td1);
    // Cantidad de Repositorios datos.public_repos
    // fila = cuerpoTabla.insertRow();
    // td1 = document.createElement('td1');
    text = document.createTextNode(`Cantidad de Repositorios: ${datos.public_repos}`);
    td1.appendChild(text);
    // fila.appendChild(td1);
    // text = document.createTextNode('');
    // td1.appendChild(text);
    // fila.appendChild(td1);
    // Localidad datos.location
    // fila = cuerpoTabla.insertRow();
    // td1 = document.createElement('td');
    text = document.createTextNode(`Localidad: ${datos.location}`);
    td1.appendChild(text);
    // fila.appendChild(td1);
    // text = document.createTextNode('');
    // td1.appendChild(text);
    // fila.appendChild(td1);
    // Tipo de Usuario datos.type
    // fila = cuerpoTabla.insertRow();
    // td1 = document.createElement('td1');
    text = document.createTextNode(`Tipo de Usuario: ${datos.type}`);
    td1.appendChild(text);
    // fila.appendChild(td1);
    // text = document.createTextNode('');
    // td1.appendChild(text);
    // fila.appendChild(td1);


    // Columna de Repositorios de Usuario
    th = document.createElement('th');
    text = document.createTextNode('Nombre de Repositorios');
    th.appendChild(text);
    fila.appendChild(th);


    // Filas de datos Columna 2 con los Repositorios
    console.log(repo)
    repo.forEach(item => {
        // fila = cuerpoTabla.insertRow();
        td2 = document.createElement('td');
        text = document.createTextNode(`${item.name}`);
        td2.appendChild(text);
        fila.appendChild(td2);
        text = document.createTextNode('');
        td2.appendChild(text);
        fila.appendChild(td2);
    });



    return tabla
}


// document.write(`
//         <table>
//             <tr>
//             <th>Datos de Usuario</th>
//             <th>Nombre de Repositorios</th>
//             </tr>
//       `)
// let li = document.createElement('li');
// // li.textContent = `${i} - ${datos.title}`;
// // console.log(li.textContent)
// // cuerpo.appendChild(li);
// for (i = 0; i < arrLength; i++) {
//     document.write(`
//             <tr>
//                 <td> ${arreglo[i].hora} </td>
//                 <td> ${arreglo[i].rut} </td>
//                 <td> ${arreglo[i].paciente} </td>
//                 <td> ${arreglo[i].prevision} </td>
//                 <td> ${arreglo[i].especialista} </td>
//             </tr>
//             `)
// };
// document.write(` 
//         </table>
//         `)
// };

// }

llamadaFunciones();