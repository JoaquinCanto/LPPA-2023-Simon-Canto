'use strict'

//Variables
var nombre = document.getElementById('nombreContacto');
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
nombre.addEventListener('blur', checkearNombre);
nombre.addEventListener('focus', hide);

email.addEventListener('blur', checkearEmail);
email.addEventListener('focus', hide);

mensaje.addEventListener('blur', checkearMensaje);
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


var obtenerListaPartidas = function()
{
	var listaPartidas = localStorage.getItem("Partidas");
	if (!listaPartidas)	
	{
		return [];
	}

	return JSON.parse(listaPartidas);
}

function mostrar(id)
{
	id.classList.toggle('mostrar');

	if(id === modalTopDiez)
	{
		fDes.style.display = 'none';
		fAsc.style.display = 'none';

		pDes.style.display = 'inline';
		pAsc.style.display = 'none';
		var top = mejoresDiez();
		llenarTabla(top);
	}
}

var llenarTabla = function(top)
{
	contenidoTabla.innerHTML = '';

	top.forEach((partida) =>{
		var fila = document.createElement('tr');
		fila.innerHTML ='<td>'+partida.fecha+'</td>'+
						'<td>'+partida.nombre+'</td>'+
						'<td>'+partida.nivel+'</td>'+
						'<td>'+partida.puntaje+'</td>';
		contenidoTabla.appendChild(fila);
	});
}

var mejoresDiez = function()
{
	var listaPartidas = obtenerListaPartidas();
	listaPartidas.sort((a, b) => b.puntaje - a.puntaje);
	var top = listaPartidas.slice(0, 10);
	return top;
}

function ordenarTablaFecha()
{
	var top = mejoresDiez()

	if (direccionFecha == 'des')
	{
		top.sort(function (a, b) { return b.fecha.localeCompare(a.fecha)});

		fDes.style.display = 'inline';
		fAsc.style.display = 'none';

		pDes.style.display = 'none';
		pAsc.style.display = 'none';

		direccionFecha = 'asc';
	}
	else
	{
		top.sort(function (a, b) { return a.fecha.localeCompare(b.fecha)});
		fDes.style.display = 'none';
		fAsc.style.display = 'inline';

		pDes.style.display = 'none';
		pAsc.style.display = 'none';

		direccionFecha = 'des';
	}

	llenarTabla(top);
}

function ordenarTablaPuntaje()
{
	var top = mejoresDiez()

	if (direccionPuntaje == 'des')
	{
		top.sort((a, b) => b.puntaje - a.puntaje);;

		pDes.style.display = 'inline';
		pAsc.style.display = 'none';

		fDes.style.display = 'none';
		fAsc.style.display = 'none';

		direccionPuntaje = 'asc';
	}
	else
	{
		top.sort((a, b) => a.puntaje - b.puntaje);

		pDes.style.display = 'none';
		pAsc.style.display = 'inline';

		fDes.style.display = 'none';
		fAsc.style.display = 'none';

		direccionPuntaje = 'des';
	}

	llenarTabla(top);
}

//Validaciones
function checkearNombre()
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

function checkearEmail()
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

function checkearMensaje()
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
	if (checkearNombre() && checkearEmail() && checkearMensaje())
	{
		var subject = 'LPPA - Simon Dice';
		var body = `¡Soy ${nombre.value} !\n${mensaje.value}.`;

		var mailToLink = `mailto:${email.value}?subject=${encodeURIComponent(subject)} &body=${encodeURIComponent(body)}`;

		window.location.href = mailToLink;	// Abre el cliente de correo predeterminado
	}
}