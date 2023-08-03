'use strict'

//Botones
var play = document.getElementById('jugarBtn');
var reset = document.getElementById('reiniciarBtn');
var rojo = document.getElementById('rojo');
var amarillo = document.getElementById('amarillo');
var verde = document.getElementById('verde');
var azul = document.getElementById('azul');

//Variables
var nombre = document.getElementById('nombre');
var nombreAlerta = document.getElementById('nombreAlerta');

var alfRegEx = /^[a-zA-Z]+$/;

var secuencia = [];
var colores = ['rojo', 'amarillo', 'azul', 'verde']; //'rojo','rojo','rojo',

//EventListeners
nombre.addEventListener('blur', checkNombre);
nombre.addEventListener('focus', esconder);

play.addEventListener('click', playEventHandler);
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
	}
}

function esconder()
{
	nombreAlerta.style.visibility = 'hidden';
}

var cambio = function(id)
{
	id.classList.toggle('iluminar');
}

var iluminarColor = function(color){
	switch(color) {
		case 'rojo':
			cambio(rojo);
			setTimeout(function(){ cambio(rojo)}, 1000);
			break;
		case 'amarillo':
			cambio(amarillo);
			setTimeout(function(){ cambio(amarillo)}, 1000);
			break;
		case 'verde':
			cambio(verde);
			setTimeout(function(){ cambio(verde)}, 1000);
			break;
		case 'azul':
			cambio(azul);
			setTimeout(function(){ cambio(azul)}, 1000);
			break;
	}
}

var prenderColor = function(color, i) {
    setTimeout(function(){ iluminarColor(color)}, 2000 * i);
}

var mostrarSecuencia = function() {
    secuencia.forEach(prenderColor);
	console.log(secuencia);
}

function playEventHandler()
{
	var colorPos = Math.floor(Math.random() * 4);
	var nColor = colores[colorPos];
	secuencia.push(nColor);
	mostrarSecuencia();
}

function resetEventHandler()
{
	console.log('click en reset');
}

function rojoEventHandler()
{
	console.log('click en rojo');
}

function amarilloEventHandler()
{
	console.log('click en amarillo');
}

function verdeEventHandler()
{
	console.log('click en verde');
}

function azulEventHandler()
{
	console.log('click en azul');
}