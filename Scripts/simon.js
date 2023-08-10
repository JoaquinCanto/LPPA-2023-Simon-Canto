'use strict'

//Botones
var jugar = document.getElementById('jugarBtn');
var reset = document.getElementById('reiniciarBtn');

var instruccionesBtn = document.getElementById('instruccionesBtn');
var cerrarModalI = document.getElementById('cerrarI');

var topBtn = document.getElementById('topBtn');
var cerrarModalTD = document.getElementById('cerrarTD');

var rojo = document.getElementById('rojo');
var amarillo = document.getElementById('amarillo');
var verde = document.getElementById('verde');
var azul = document.getElementById('azul');

//Partes de la pagina
var nombre = document.getElementById('nombre');
var nombreAlerta = document.getElementById('nombreAlerta');

var puntosText = document.getElementById('puntos');
var nivelText = document.getElementById('nivel');
var tiempoText = document.getElementById('contador');
var puntajeFinalText = document.getElementById('puntajeFinal');

var modalJuegoTerminado = document.getElementById('modalJT');
var contenidoTabla = document.getElementById('tablaContenido');
var modalInstrucciones = document.getElementById('modalI');
var modalTopDiez = document.getElementById('modalTD');

var ordenarFecha = document.getElementById('ordenFecha');
var fDes = document.getElementById('fDes');
var fAsc = document.getElementById('fAsc');

var ordenarPuntaje = document.getElementById('ordenPuntaje');
var pDes = document.getElementById('pDes');
var pAsc = document.getElementById('pAsc');

//Regular Expresion
var alfRegEx = /^[a-zA-Z]+$/;

//Variables globales
var puntos = 0;
var puntajeFinal = 0;
var nivel = 0;
var tiempo = 0;								//Tiempo transcurrido en el juego.
var contador;								//contiene el ID de setInterval para despues poder detenerlo.
var secuencia = [];
var jugador = [];
var colores = ['rojo', 'amarillo', 'azul', 'verde'];
var enJuego = false; 						//variable global para indicar el estado del juego.
var i = 0; 									//variable global que se usa en checkColor()
var direccionFecha = "des";
var direccionPuntaje = "asc";

//Eventos
nombre.addEventListener('blur', checkNombre);
nombre.addEventListener('focus', esconder);

instruccionesBtn.addEventListener('click', function(){ mostrar(modalInstrucciones) });
cerrarModalI.addEventListener('click', function(){ mostrar(modalInstrucciones) });
topBtn.addEventListener('click', function(){ mostrar(modalTopDiez) });
cerrarModalTD.addEventListener('click', function(){ mostrar(modalTopDiez) });
ordenarFecha.addEventListener('click', ordenarTablaFecha);
ordenarPuntaje.addEventListener('click', ordenarTablaPuntaje);

jugar.addEventListener('click', jugarEventHandler);
reset.addEventListener('click', resetEventHandler);

rojo.addEventListener('click', rojoEventHandler);
amarillo.addEventListener('click', amarilloEventHandler);
verde.addEventListener('click', verdeEventHandler);
azul.addEventListener('click', azulEventHandler);

//Funciones
function checkNombre()
{
	if (!(nombre.value.length >= 3 && alfRegEx.test(nombre.value)))
	{
		nombreAlerta.style.visibility = 'visible';
		return false;
	}
	else
	{
		return true;
	}
}

function esconder()
{
	nombreAlerta.style.visibility = 'hidden';
}

function mostrar(id)
{
	id.classList.toggle('mostrar');

	if(id === modalTopDiez)
	{
		fDes.style.display = "none";
		fAsc.style.display = "none";

		pDes.style.display = "inline";
		pAsc.style.display = "none";
		var top = mejoresDiez();
		llenarTabla(top);
	}
}



var interruptor = function(id)
{
	id.classList.toggle('iluminar');
}

var parpadeo = function(id, tiempo)
{
	interruptor(id);
	setTimeout(function(){ interruptor(id)}, tiempo);
}

var iluminarColor = function(color)
{
	switch(color) {
		case 'rojo':
			parpadeo(rojo, 250);
			break;
		case 'amarillo':
			parpadeo(amarillo, 250);
			break;
		case 'verde':
			parpadeo(verde, 250);
			break;
		case 'azul':
			parpadeo(azul, 250);
			break;
	}
}

var prenderColor = function(color, i)
{
    setTimeout(function(){ iluminarColor(color)}, 500 * i);
}

var mostrarSecuencia = function()
{
    secuencia.forEach(prenderColor);
	console.log(secuencia);
}

var generarSecuencia = function()
{
	var colorPos = Math.floor(Math.random() * 4);
	var nColor = colores[colorPos];
	secuencia.push(nColor);

	nivel = secuencia.length;
	nivelText.textContent = nivel;

	mostrarSecuencia();
}

var checkColor = function()
{
	if (secuencia[i] === jugador[i])
	{
		puntos++;
		puntosText.textContent = puntos;
		i++;
		console.log('largo secuencia: ' + secuencia.length);
		console.log('i'+i);
		if (i == secuencia.length)
		{
			resetearJugador();
			setTimeout(generarSecuencia, 1000);
		}
	}
	else
	{
		resetearJugador();
		juegoTerminado();
	}
}

var temporizador = function()
{
	tiempo++;
	tiempoText.textContent = tiempo;
}

var resetearJugador = function()
{
	i = 0;
	jugador = [];
}

function jugarEventHandler()
{
	if (!enJuego && checkNombre())
	{
		nombre.disabled = true;
		enJuego = true;
		generarSecuencia();
		contador = setInterval(temporizador, 1000);
	}
}

function resetEventHandler()
{
	mostrar(modalJuegoTerminado);
	nombre.disabled = false;
	enJuego = false;

	puntos = 0;
	puntajeFinal = 0;
	nivel = 0;
	tiempo = 0;

	nivelText.textContent = '-';
	puntosText.textContent = puntos;
	tiempoText.textContent = tiempo;

	secuencia = [];
	resetearJugador();
	
	console.log('click en reset');
}

function rojoEventHandler()
{
	if (enJuego)
	{
		jugador.push('rojo');
		console.log(jugador);
		checkColor();
	}
	parpadeo(rojo, 250);
	console.log('click en rojo');
}

function amarilloEventHandler()
{
	if (enJuego)
	{
		jugador.push('amarillo');
		console.log(jugador);
		checkColor();
	}
	parpadeo(amarillo, 250);
	console.log('click en amarillo');
}

function verdeEventHandler()
{
	if (enJuego)
	{
		jugador.push('verde');
		console.log(jugador);
		checkColor();
		
	}
	parpadeo(verde, 250);
	console.log('click en verde');
}

function azulEventHandler()
{
	if (enJuego)
	{
		jugador.push('azul');
		console.log(jugador);
		checkColor();
		
	}
	parpadeo(azul, 250);
	console.log('click en azul');
}

var mejoresDiez = function()
{
	var listaPartidas = obtenerListaPartidas();
	listaPartidas.sort((a, b) => b.puntaje - a.puntaje);
	var top = listaPartidas.slice(0, 10);
	return top;
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

var calcularPuntajeFinal = function()
{
	puntajeFinal = puntos - (Math.floor(tiempo/5));
	puntajeFinalText.textContent = puntajeFinal;
}

//Local Storage
var juegoTerminado = function()
{
	calcularPuntajeFinal();
	clearInterval(contador);

	var resPartida = new Object();
	cargarPartida(resPartida);

	var listaPartidas = obtenerListaPartidas();
	listaPartidas.push(resPartida);

    localStorage.setItem("Partidas", JSON.stringify(listaPartidas));
	console.log(JSON.stringify(listaPartidas))

	mostrar(modalJuegoTerminado);
}

var obtenerListaPartidas = function()
{
	var listaPartidas = localStorage.getItem("Partidas");		//si no existe devuelve una lista vacia
	if (!listaPartidas)	
	{
		return [];
	}

	return JSON.parse(listaPartidas);
}

var cargarPartida = function(objeto)
{
	objeto.fecha = generarFecha();
	objeto.nombre = nombre.value;
	objeto.nivel = nivel;
	objeto.puntaje = puntajeFinal;
}

function generarFecha()
{
	var fecha = new Date();

	var dia = String(fecha.getDate()).padStart(2, "0");
	var mes = String(fecha.getMonth() + 1).padStart(2, "0");
	var anio = String(fecha.getFullYear());

	var hora = String(fecha.getHours()).padStart(2, "0");
	var minutos = String(fecha.getMinutes()).padStart(2, "0");
	var segundos = String(fecha.getSeconds()).padStart(2, "0");

	var stringFecha = dia+"/"+mes+"/"+anio+" - "+hora+":"+ minutos+":"+segundos;

	return stringFecha;
}

function ordenarTablaFecha()
{
	var top = mejoresDiez()

	if (direccionFecha == "des")
	{
		top.sort(function (a, b) { return b.fecha.localeCompare(a.fecha)});

		fDes.style.display = "inline";
		fAsc.style.display = "none";

		pDes.style.display = "none";
		pAsc.style.display = "none";

		direccionFecha = "asc";
	}
	else
	{
		top.sort(function (a, b) { return a.fecha.localeCompare(b.fecha)});
		fDes.style.display = "none";
		fAsc.style.display = "inline";

		pDes.style.display = "none";
		pAsc.style.display = "none";

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

		pDes.style.display = "inline";
		pAsc.style.display = "none";

		fDes.style.display = "none";
		fAsc.style.display = "none";

		direccionPuntaje = "asc";
	}
	else
	{
		top.sort((a, b) => a.puntaje - b.puntaje);

		pDes.style.display = "none";
		pAsc.style.display = "inline";

		fDes.style.display = "none";
		fAsc.style.display = "none";

		direccionPuntaje = "des";
	}

	llenarTabla(top);
}
