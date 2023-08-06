'use strict'

//Botones
var jugar = document.getElementById('jugarBtn');
var reset = document.getElementById('reiniciarBtn');
var test = document.getElementById('test');				//boton de testeo 

var rojo = document.getElementById('rojo');
var amarillo = document.getElementById('amarillo');
var verde = document.getElementById('verde');
var azul = document.getElementById('azul');

//Variables
var nombre = document.getElementById('nombre');
var nombreAlerta = document.getElementById('nombreAlerta');

var puntosText = document.getElementById('puntos');
var nivelText = document.getElementById('nivel');
var contadorText = document.getElementById('contador');
var puntajeFinalText = document.getElementById('puntajeFinal');

var modalJuegoTerminado = document.getElementById('modalJT');

var alfRegEx = /^[a-zA-Z]+$/;

var puntos = 0;
var puntajeFinal = 0;
var nivel = 0;
var tiempo = 0;								//tiempo transcurrido en el juego
var contador;								//contiene el ID de setInterval para despues poder detenerlo
var secuencia = [];
var jugador = [];
var colores = ['rojo', 'amarillo', 'azul', 'verde'];
var enJuego = false; 						//variable global para indicar el estado del juego
var i = 0; 									//variable global que se usa en checkColor()

//Eventos
nombre.addEventListener('blur', checkNombre);
nombre.addEventListener('focus', esconder);

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
	contadorText.textContent = tiempo;
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
		enJuego = true;
		generarSecuencia();
		contador = setInterval(temporizador, 1000);
	}
}

function resetEventHandler()
{
	modalJuegoTerminado.style.display = 'none';
	enJuego = false;

	puntos = 0;
	nivel = 0;
	tiempo = 0;

	nivelText.textContent = '-';
	puntosText.textContent = puntos;
	contadorText.textContent = tiempo;

	secuencia = [];
	resetearJugador();
	clearInterval(contador);
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

var calcularPuntajeFinal = function()
{
	puntajeFinal = puntos - (Math.floor(tiempo/5));
	puntajeFinalText.textContent = puntajeFinal;
}

//Local Storage

var juegoTerminado = function()
{
	calcularPuntajeFinal();
	
	var resPartida = new Object();
	cargarPartida(resPartida);

	var listaPartidas = obtenerListaPartidas();
	listaPartidas.push(resPartida);

    localStorage.setItem("Partidas", JSON.stringify(listaPartidas));
	console.log(JSON.stringify(listaPartidas))
	modalJuegoTerminado.style.display = 'block';
}

test.addEventListener('click', generarFecha)

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
	objeto.nombre = nombre.value;
	objeto.puntaje = puntajeFinal;
	objeto.nivel = nivel;
	objeto.fecha = generarFecha();
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
