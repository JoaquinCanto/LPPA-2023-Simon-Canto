'use strict'

//Variables
var nombre = document.getElementById('nombre');
var alertaNombre = document.getElementById('alertaNombre');

var email = document.getElementById('email');
var alertaEmail = document.getElementById('alertaEmail');

var mensaje = document.getElementById('mensaje');
var alertaMensaje = document.getElementById('alertaMensaje');

//Botones
var btnEnviar = document.getElementById('enviar');

var instruccionesBtn = document.getElementById('instruccionesBtn');
var cerrarModalI = document.getElementById('cerrarI');

var topBtn = document.getElementById('topBtn');
var cerrarModalTD = document.getElementById('cerrarTD');

//Modales
var contenidoTabla = document.getElementById('tablaContenido');
var modalInstrucciones = document.getElementById('modalI');
var modalTopDiez = document.getElementById('modalTD');
var ordenarFecha = document.getElementById('ordenFecha');
var ordenarPuntaje = document.getElementById('ordenPuntaje');

//Eventos
nombre.addEventListener('blur', checkNombre);
nombre.addEventListener('focus', hide);

email.addEventListener('blur', checkEmail);
email.addEventListener('focus', hide);

mensaje.addEventListener('blur', checkMensaje);
mensaje.addEventListener('focus', hide);

instruccionesBtn.addEventListener('click', function(){ mostrar(modalInstrucciones) });
cerrarModalI.addEventListener('click', function(){ mostrar(modalInstrucciones) });

topBtn.addEventListener('click', function(){ mostrar(modalTopDiez) });
cerrarModalTD.addEventListener('click', function(){ mostrar(modalTopDiez) });
ordenarFecha.addEventListener('click', ordenarTablaFecha);
ordenarPuntaje.addEventListener('click', ordenarTablaPuntaje);

//RegEx
var alfNumRegEx = /^[a-zA-Z0-9]+$/;
var mailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


//Variables
var direccionFecha = "des";
var direccionPuntaje = "asc";

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

//Llenar tabla de puntuaciones
var llenarTabla = function(top)
{
	contenidoTabla.innerHTML = "";

	top.forEach((partida) =>{
		var fila = document.createElement('tr');
		fila.innerHTML ="<td>"+partida.fecha+"</td>"+
						"<td>"+partida.nombre+"</td>"+
						"<td>"+partida.nivel+"</td>"+
						"<td>"+partida.puntaje+"</td>";
		contenidoTabla.appendChild(fila);
	});
}

var obtenerListaPartidas = function()
{
	var listaPartidas = localStorage.getItem("Partidas");
	if (!listaPartidas)	
	{
		return [];
	}

	return JSON.parse(listaPartidas);
}

var mejoresDiez = function()
{
	var listaPartidas = obtenerListaPartidas();
	listaPartidas.sort((a, b) => b.puntaje - a.puntaje);
	var top = listaPartidas.slice(0, 10);
	return top;
}

function mostrar(id)
{
	id.classList.toggle('mostrar');

	if(id === modalTopDiez)
	{
		var top = mejoresDiez();
		llenarTabla(top);
	}
}

function ordenarTablaFecha()
{
	var top = mejoresDiez()

	if (direccionFecha == "des")
	{
		top.sort(function (a, b) { return b.fecha.localeCompare(a.fecha)});
		direccionFecha = "asc";
	}
	else
	{
		top.sort(function (a, b) { return a.fecha.localeCompare(b.fecha)});
		direccionFecha = "des";
	}

	llenarTabla(top);
}

function ordenarTablaPuntaje()
{
	var top = mejoresDiez()

	if (direccionPuntaje == "des")
	{
		top.sort((a, b) => b.puntaje - a.puntaje);;
		direccionPuntaje = "asc";
	}
	else
	{
		top.sort((a, b) => a.puntaje - b.puntaje);
		direccionPuntaje = "des";
	}

	llenarTabla(top);
}

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