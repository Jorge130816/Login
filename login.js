let baseDeDatosLogin = JSON.parse (localStorage.getItem ("sistema-de-inicio-sesion"));

if (!baseDeDatosLogin) {
        cargarDatosInicialesDeLaBaseDeDatosLogin ();  
}
function guardarDatosDeLaBaseDeDatoslogin (){
        localStorage.setItem("sistema-de-inicio-sesion", JSON.stringify(baseDeDatosLogin))
}

function cargarDatosInicialesDeLaBaseDeDatosLogin () {
    baseDeDatosLogin = {
        1234567890 : {
            contraseña: "abc",
    
        },
        0987654321 : {
            contraseña: "def",
    
        },
        98765434567 : {
            contraseña: "ghi",
    
        }
    
    };
}

async function menuBasico(){
    opción_menuBasico =-1;

    await swal.fire ({
        
        title: "Menú",
        showConfirmButton: false,
        html:`
        <button class ="swal2-confirm  swal2-styled" onclick='opción_menuBasico=0; Swal.close()'>
        Registrar nuevo usuario
        </button>
<br>
        <button class ="swal2-confirm  swal2-styled" onclick ='opción_menuBasico=1; Swal.close()'>
        Iniciar Sesión
        </button>
        `,
        
    });
    switch (opción_menuBasico) {
        case 0:
            registrarNuevoUsuario();
            break;
        case 1:
            login ();
            break;
        default:
            await menuBasico();
            break;
    }
}

async function registrarNuevoUsuario(){
    opción_registrarNuevoUsuario =-1;
    await swal.fire({

        title: "Registrar",
        showConfirmButton:false,
        html:`
        <input class="swal2-input" placeholder="usuario" id="usuario">
        <input type="password" class="swal2-input" placeholder="contraseña" id="contraseña">
        <button class ="swal2-confirm  swal2-styled" onclick='opción_registrarNuevoUsuario=0; Swal.clickConfirm()'>
        Crear
        </button>
        <button class ="swal2-confirm  swal2-styled" onclick ='opción_registrarNuevoUsuario=1; Swal.close()'>
        Cancelar
        </button>
        `,
        preConfirm:()=>{
            let usuario = document.getElementById("usuario").value;
            let contraseña = document.getElementById("contraseña").value;
            
            if (!usuario) {
                swal.showValidationMessage ("No hay usuario");
                return false;  
            }
            if (!contraseña) {
                swal.showValidationMessage ("No hay contraseña");
                return false;  
            }
            baseDeDatosLogin[usuario] = {};
            baseDeDatosLogin[usuario].contraseña=contraseña;
            guardarDatosDeLaBaseDeDatoslogin();
            return true;
        },
    });
    switch (opción_registrarNuevoUsuario) {
        case 0:
            menuBasico();
            
            break;
        case 1:
            menuBasico();
        default:
            break;
    }
}


async function login () {
    
    let {value: datos} = await swal.fire ({

        title: "Bienvenido",
        confirmButtonText: "Acceder",
        html: `
    <div style = "margin: 5px">
        <input class="swal2-input" placeholder= "usuario" id= "usuario">
        <input type="password" class="swal2-input" placeholder= "contraseña" id= "contraseña">
    </div>

        `,
        preConfirm: ()=>{
            let usuario = document.getElementById("usuario").value;
            let contraseña = document.getElementById("contraseña").value;
            
            if (!usuario) {
                swal.showValidationMessage ("No hay usuario");
                return false;  
            }
            if (!contraseña) {
                swal.showValidationMessage ("No hay contraseña");
                return false;  
            }

            let datos = baseDeDatosLogin [usuario]
            if (!datos) {
                swal.showValidationMessage ("El usuario no existe");
                return false;  
            }
            if (datos.contraseña != contraseña) {
                swal.showValidationMessage ("Contraseña Incorrecta");
                return false;

            }

        },
    });
    alert("Bienvenido al juego de apuestas 2.0")
    location.href="https://www.google.com/?hl=es"
    return datos;
}