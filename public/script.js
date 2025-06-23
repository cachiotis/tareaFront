// const URL_BACK = "http://localhost:3000";
const URL_BACK = "https://tareaback-actualizado.onrender.com";

document.getElementById('tarea').addEventListener('submit', async (e) => {
    e.preventDefault();

const nombre = document.getElementById('nombre').value;
const descripcion = document.getElementById('descripcion').value;


const tarea = { nombre, descripcion };

try {
    const response = await fetch(`${URL_BACK}/tareas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarea),
    });
    const data = await response.json();
    alert('Tarea creada: ' + JSON.stringify(data));
    cargarTareas();
    } catch (err) {
        console.error('Error creando usuario:', err);
    }

    limpiarFormulario();
});

async function cargarTareas() {
    try {
        const response = await fetch(`${URL_BACK}/tareas`);
        const tareas = await response.json();
        const tareasList = document.getElementById('tareaList');
        tareasList.style.display = "yes";
        tareasList.innerHTML = tareas.map(tarea => `
            <li>${tarea.nombre}<br>${tarea.descripcion}</li>
            <hr>
            <br>
        `).join('');
    } catch (err) {
        console.error('Error cargando usuarios:', err);
    }
}

function limpiarFormulario() {
    document.getElementById("tarea").reset();
}

cargarTareas();