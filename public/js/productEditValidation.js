// window.addEventListener('load', function(){
//     let formulario = document.getElementById('form-editt');


//     formulario.addEventListener('submit', function(e){
        
//         let errores = [];

//         let campoNombre = document.querySelector('.main__register-name');
        
//         if (campoNombre.value == '') {
//             errores.push('El campo de Nombre tiene que estar completado');
//         }else if(campoNombre.value.length <5){
//             errores.push('El campo de Nombre tiene que tener al menos 5 caracteres');
//         }

//         let description = document.querySelector('.main__register-surname');
//         if (description.value == '') {
//             errores.push('El campo de descripción tiene que estar completado');

//         }else if(description.value.length < 20){
//             errores.push('El campo de descripción tiene que tener al menos 20 caracteres');

//         }
        
//         let campoImage = document.querySelector('.main__register-avatar');

//         let extencionesValidas = this.files[0], image= new Image();
//         if(extencionesValidas.value == ''){
//             errores.push('El campo de Imagen tiene que estar completado')
//         }else if (/.(jpg|jpeg|png|gif)$/i.test(extencionesValidas.value)) {
            
//             errores.push('Comprueba la extensión de tus imagenes, recuerda que los formatos aceptados son .gif, .jpeg, .jpg y .png')
//         }

//         if (errores.length > 0) {
//             e.preventDefault();
            
//             let ulErrores = document.querySelector('.errores ul')
//             for (let i = 0; i < errores.length; i++) {
                
//                 ulErrores.innerHTML += '<li>' + errores[i] + '</li>'
                
//             }
//         }
//     })
// })

const formulario = document.getElementById('form-edit');
const inputs = document.querySelectorAll('#form-edit input');
// Expresiones Regulares
const expresiones = {
    //usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    productName: /^[a-zA-ZÀ-ÿ\s0-9]{5,40}$/, // Letras y espacios, pueden llevar acentos.
    productDescription: /^[a-zA-ZÀ-ÿ\s]{20,50}$/, //  Letras y espacios, pueden llevar acentos, igual que productName
    productDescriptionLong: /^[a-zA-ZÀ-ÿ\s]{10,40}$/, //  Letras y espacios, pueden llevar acentos, igual que productName pero mayor cantidad de carecteres.
    productPrice: /^\d{2,14}$/, // 2 a 14 numeros
    productStock: /^\d{1,14}$/, // 1 a 14 numeros
    productFees: /^\d{1,12}$/, // 0 a 12 numeros
};
const campos = {
    productName: false,
    productDescription: false,
    productDescriptionLong: false,
    productPrice: false,
    productStock: false,
    productFees: false
};


const validarFormulario = (e) => {
    switch (e.currentTarget.name){
        case 'productName':
            if(expresiones.productName.test(e.target.value)){
                document.getElementById('div__name').classList.remove('main__container-rol-incorrecto');
                document.getElementById('div__name').classList.add('main__container-rol-correcto');
                document.querySelector('#div__name i').classList.remove('fa-circle-xmark');
                document.querySelector('#div__name i').classList.add('fa-check-circle');
                document.querySelector('#div__name .form__input-error').classList.remove('form__input-error-activo');
                campos.productName = true;
            } else {
                document.getElementById('div__name').classList.add('main__container-rol-incorrecto');
                document.getElementById('div__name').classList.remove('main__container-rol-correcto');
                document.querySelector('#div__name i').classList.add('fa-circle-xmark');
                document.querySelector('#div__name i').classList.remove('fa-check-circle');
                document.querySelector('#div__name .form__input-error').classList.add('form__input-error-activo');
                campos.productName = false;
            }
            // validarCampo(expresiones.productName, e.target, 'productName')// o e.target.name en el parametro campo
        break;
        case 'productDescription': 
        if(expresiones.productDescription.test(e.target.value)){
            document.getElementById('div__description').classList.remove('main__container-rol-incorrecto');
            document.getElementById('div__description').classList.add('main__container-rol-correcto');
            document.querySelector('#div__description i').classList.remove('fa-circle-xmark');
            document.querySelector('#div__description i').classList.add('fa-check-circle');
            document.querySelector('#div__description .form__input-error').classList.remove('form__input-error-activo');
            campos.productDescription = true;
        } else {
            document.getElementById('div__description').classList.add('main__container-rol-incorrecto');
            document.getElementById('div__description').classList.remove('main__container-rol-correcto');
            document.querySelector('#div__description i').classList.add('fa-circle-xmark');
            document.querySelector('#div__description i').classList.remove('fa-check-circle');
            document.querySelector('#div__description .form__input-error').classList.add('form__input-error-activo');
            campos.productDescription = false;
        }
        break;
        case 'productDescriptionLong':
            if(expresiones.productDescriptionLong.test(e.target.value)){
                document.getElementById('div__descriptionLong').classList.remove('main__container-rol-incorrecto');
                document.getElementById('div__descriptionLong').classList.add('main__container-rol-correcto');
                document.querySelector('#div__descriptionLong i').classList.remove('fa-circle-xmark');
                document.querySelector('#div__descriptionLong i').classList.add('fa-check-circle');
                document.querySelector('#div__descriptionLong .form__input-error').classList.remove('form__input-error-activo');
                campos.productDescriptionLong = true;
            } else {
                document.getElementById('div__descriptionLong').classList.add('main__container-rol-incorrecto');
                document.getElementById('div__descriptionLong').classList.remove('main__container-rol-correcto');
                document.querySelector('#div__descriptionLong i').classList.add('fa-circle-xmark');
                document.querySelector('#div__descriptionLong i').classList.remove('fa-check-circle');
                document.querySelector('#div__descriptionLong .form__input-error').classList.add('form__input-error-activo');
                campos.productDescriptionLong = false;
            }
        break;
        case 'productPrice':
            if(expresiones.productPrice.test(e.target.value)){
                document.getElementById('div__price').classList.remove('main__container-rol-incorrecto');
                document.getElementById('div__price').classList.add('main__container-rol-correcto');
                document.querySelector('#div__price i').classList.remove('fa-circle-xmark');
                document.querySelector('#div__price i').classList.add('fa-check-circle');
                document.querySelector('#div__price .form__input-error').classList.remove('form__input-error-activo');
                campos.productPrice = true;
            } else {
                document.getElementById('div__price').classList.add('main__container-rol-incorrecto');
                document.getElementById('div__price').classList.remove('main__container-rol-correcto');
                document.querySelector('#div__price i').classList.add('fa-circle-xmark');
                document.querySelector('#div__price i').classList.remove('fa-check-circle');
                document.querySelector('#div__price .form__input-error').classList.add('form__input-error-activo');
                campos.productPrice = false;
            }
        break;
        case 'productStock':
            if(expresiones.productStock.test(e.target.value)){
                document.getElementById('div__stock').classList.remove('main__container-rol-incorrecto');
                document.getElementById('div__stock').classList.add('main__container-rol-correcto');
                document.querySelector('#div__stock i').classList.remove('fa-circle-xmark');
                document.querySelector('#div__stock i').classList.add('fa-check-circle');
                document.querySelector('#div__stock .form__input-error').classList.remove('form__input-error-activo');
                campos.productStock = true;
            } else {
                document.getElementById('div__stock').classList.add('main__container-rol-incorrecto');
                document.getElementById('div__stock').classList.remove('main__container-rol-correcto');
                document.querySelector('#div__stock i').classList.add('fa-circle-xmark');
                document.querySelector('#div__stock i').classList.remove('fa-check-circle');
                document.querySelector('#div__stock .form__input-error').classList.add('form__input-error-activo');
                campos.productStock = false;
            }
        break;
        case 'productFees':
            if(expresiones.productFees.test(e.target.value)){
                document.getElementById('div__fees').classList.remove('main__container-rol-incorrecto');
                document.getElementById('div__fees').classList.add('main__container-rol-correcto');
                document.querySelector('#div__fees i').classList.remove('fa-circle-xmark');
                document.querySelector('#div__fees i').classList.add('fa-check-circle');
                document.querySelector('#div__fees .form__input-error').classList.remove('form__input-error-activo');
                campos.productFees = true;
            } else {
                document.getElementById('div__fees').classList.add('main__container-rol-incorrecto');
                document.getElementById('div__fees').classList.remove('main__container-rol-correcto');
                document.querySelector('#div__fees i').classList.add('fa-circle-xmark');
                document.querySelector('#div__fees i').classList.remove('fa-check-circle');
                document.querySelector('#div__fees .form__input-error').classList.add('form__input-error-activo');
                campos.productFees = false;
            }
        break;
    }
}       
        
// const validarCampo = (expresion, input, campo) => {
//     if(expresion.test(input.value)){
//         document.getElementById(`div__${campo}`).classList.remove('main__container-rol-incorrecto');
//         document.getElementById(`div__${campo}`).classList.add('main__container-rol-correcto');
//         document.querySelector(`#div__${campo}` ).classList.remove('fa-circle-xmark');
//         document.querySelector(`#div__${campo}`).classList.add('fa-check-circle');
//         document.querySelector(`#div__${campo} .form__input-error`).classList.remove('form__input-error-activo');
//         campos[campo] = true;
//     } else {
//         document.getElementById(`div__${campo}`).classList.add('main__container-rol-incorrecto');
//         document.getElementById(`div__${campo}`).classList.remove('main__container-rol-correcto');
//         document.querySelector(`#div__${campo} i`).classList.add('fa-circle-xmark');
//         document.querySelector(`#div__${campo} i`).classList.remove('fa-check-circle');
//         document.querySelector(`#div__${campo} .form__input-error`).classList.add('form__input-error-activo');
//         campos[campo] = false;
//     }
// }

inputs.forEach((input) =>{
    input.addEventListener('keyup',validarFormulario)
    //console.log('tecla levantada')
    input.addEventListener('blur',validarFormulario)
    //console.log('click fuera del input')
    
})


formulario.addEventListener('submit', function(e){

    e.preventDefault() 
    if(campos.productName && campos.productDescription && campos.productDescriptionLong && campos.productPrice && campos.productStock && campos.productFees ){
        formulario.reset();
        document.getElementById('form__msj-exito').classList.add('form__msj-exito-activo')
        setTimeout(() => {
            document.getElementById('form__msj-exito').classList.remove('form__msj-exito-activo')
        }, 5000);

        document.querySelectorAll('.main__container-rol-correcto').forEach((icono)  => {

            icono.classList.remove('.main__container-rol-correcto');
        })
    }else {
        document.getElementById('form__mensaje').classList.add('form__mensaje-activo')
    }
})




