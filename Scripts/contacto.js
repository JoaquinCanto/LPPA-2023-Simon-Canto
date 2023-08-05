'use strict'

//Variables
var nombre = document.getElementById('nombre');
var alertaNombre = document.getElementById('alertaNombre');

var email = document.getElementById('email');
var alertaEmail = document.getElementById('alertaEmail');

var mensaje = document.getElementById('mensaje');
var alertaMensaje = document.getElementById('alertaMensaje');

var btnEnviar = document.getElementById('enviar');

//Eventos
nombre.addEventListener('blur', checkNombre);
nombre.addEventListener('focus', hide);

email.addEventListener('blur', checkEmail);
email.addEventListener('focus', hide);

mensaje.addEventListener('blur', checkMensaje);
mensaje.addEventListener('focus', hide);

//RegEx
var alfNumRegEx = /^[a-zA-Z0-9]+$/;
var mailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//Validaciones
function checkNombre()
{
	if (!(nombre.value.length >= 3 && alfNumRegEx.test(nombre.value)))
	{
		show(alertaNombre);
		return false;
	}
	else
	{
		return true;
	}
}

function checkEmail()
{
	if (!(mailRegEx.test(email.value)))
	{
		show(alertaEmail);
		return false;
	}
	else
	{
		return true;
	}
}

function checkMensaje()
{
	if (!(mensaje.value.length > 5))
	{
		show(alertaMensaje);
		return false;
	}
	else
	{
		return true;
	}
}

//Funciones
function hide(id)
{
	var next = id.currentTarget.nextElementSibling;
	if (next.style.visibility !== 'hidden')
	{
		next.style.visibility = 'hidden';
	}
}

function show(id)
{
	id.style.visibility = 'visible';
}

//Envio
btnEnviar.addEventListener('click', enviar);

function enviar()
{
	if (checkNombre() && checkEmail() && checkMensaje())
	{
		var subject = 'LPPA - Simon Dice';
		var body = `¡Soy ${nombre.value} !\n${mensaje.value}.`;

		var mailToLink = `mailto:${email.value}?subject=${encodeURIComponent(subject)} &body=${encodeURIComponent(body)}`;

		window.location.href = mailToLink;	// Abre el cliente de correo predeterminado
	}
}