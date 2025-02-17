const btnInicioSesion = document.querySelector('#inicio-sesion');
const inputUsername = document.querySelector('#input-username');
const inputPassword = document.querySelector('#input-password');

const inputRegistroUsername = document.querySelector('#registro-username');
const inputRegistroEmail = document.querySelector('#registro-email');
const inputRegistroPassword = document.querySelector('#registro-password');
const btnRegistrar = document.querySelector('#btn-registrar');


let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
console.log(usuarios)
if (usuarios.length == 0){
    
    fetch("/js/usuarios.json")
    .then(response => response.json())
    .then(data => {
        usuarios = data;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    });
}

function mensaje (text){
    Toastify({
        text: text,
        duration: 3000,
        close: false,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right,rgb(104, 34, 83),rgb(163, 10, 18))",
            borderRadius: "1.2rem",
            textTransform: "uppercase",
            fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem',
            y: '1.5rem'
        },
        onClick: function() {
        }
    }).showToast();
}

if (btnInicioSesion){
    btnInicioSesion.addEventListener("click", (e) => {
        e.preventDefault();
    
        const username = inputUsername.value;
        const password = inputPassword.value;
        
        if (!username || !password){
            mensaje("Debes completar todos los campos");
            return;
        }
    
        const usuario = usuarios.filter(usuario => usuario.username == username);
    
        if(usuario.length == 0 || usuario[0]['password'] != password){
            mensaje("Usuario o contraseña incorrecto");
            return;
        };

        localStorage.setItem('usuario', username);
        window.location.href = '../pages/productos.html';
    })
}

if(btnRegistrar){
    btnRegistrar.addEventListener("click", (e) => {
        e.preventDefault();

        const username = inputRegistroUsername.value;
        const email = inputRegistroEmail.value;
        const password = inputRegistroPassword.value;

        if (!username || !password || !email){
            mensaje("Debes completar todos los campos");
            return;
        }

        const usuariosCorreoIdentico = usuarios.filter(usuario => usuario.email == email);
        if(usuariosCorreoIdentico.length > 0){
            mensaje("Ya existe un usuario con ese correo electrónico");
            return;
        }

        const nuevoUsuario = {
            username,
            password,
            email
        }

        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        mensaje("Usuario registrado correctamente");
        setTimeout(() => {
            window.location.href = 'inicio-sesion.html';    
        }, 2000);
        
    });
}

