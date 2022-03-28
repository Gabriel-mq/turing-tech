console.log("probando");  
const formulario = document.getElementById("formulario-login");
const inputs = document.querySelectorAll("#formulario-login input")

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{1,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,50}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{8,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{10,14}$/, // 7 a 14 numeros.
	dni: /^\d{8,8}$/,
	zipcode: /^\d{1,5}$/
}

let errores = [];



const validarFormulario = (e) => {
    switch (e.target.name){
        case "userEmail":
            
            if (expresiones.correo.test(e.target.value)) {
                    
                document.getElementById("p_error1").classList.remove("error_activo")
                document.getElementById("userMail").classList.add("borde_correcto_activo")
                document.getElementById("userMail").classList.remove("borde_incorrecto_activo")
                while (errores.length >= 1) {
                    errores.pop()	
                }
                
            } else {
                document.getElementById("p_error1").classList.add("error_activo")
                document.getElementById("userMail").classList.add("borde_incorrecto_activo")
                document.getElementById("userMail").classList.remove("borde_correcto_activo")
             errores.push("1")
            console.log(errores);
                
            }
        break;
        case "userLock":
            
            if (expresiones.password.test(e.target.value)) {
                    
                document.getElementById("p_error2").classList.remove("error_activo")
                document.getElementById("userPass").classList.add("borde_correcto_activo")
                document.getElementById("userPass").classList.remove("borde_incorrecto_activo")
                while (errores.length >= 1) {
                    errores.pop()	
                }
            } else {
                document.getElementById("p_error2").classList.add("error_activo")
                document.getElementById("userPass").classList.remove("borde_correcto_activo")
                document.getElementById("userPass").classList.add("borde_incorrecto_activo")
                errores.push("2")
            }
        break;
        
    };
}




inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
  });
  
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
  
  
    if (errores.length >= 1) {
  
      alert("Revise el formulario, contiene errores.");
        
    }else {
        formulario.submit();
    }
  
      
  
  });
  
  