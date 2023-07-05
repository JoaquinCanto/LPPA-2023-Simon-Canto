//SELECTORES
var rojo = document.getElementById('rojo');
var amarillo = document.getElementById('amarillo');
var verde = document.getElementById('verde');
var azul = document.getElementById('azul');

//FUNCIONES

rojo.addEventListener('mousedown', encender);
rojo.addEventListener('mouseup', apagar);

amarillo.addEventListener('mousedown', encender);
amarillo.addEventListener('mouseup', apagar);

verde.addEventListener('mousedown', encender);
verde.addEventListener('mouseup', apagar);

azul.addEventListener('mousedown', encender);
azul.addEventListener('mouseup', apagar);

function encender(id)
{
	var aux;
	if (typeof id === 'string')
	{
		aux = id;
	}
	else
	{
		aux = id.target.id;
	}
	switch(aux)
	{
		case 'rojo':
			rojo.style.backgroundColor = '#ff9090';
			break;
		case 'amarillo':
			amarillo.style.backgroundColor = '#fdfd9a';
			break;
		case 'verde':
			verde.style.backgroundColor = '#4e804e';
			break;
		case 'azul':
			azul.style.backgroundColor = '#8f8fff';
			break;
	}
}

function apagar(id)
{
	var aux;
	if (typeof id === 'string')
	{
		aux = id;
	}
	else
	{
		aux = id.target.id;
	}
	switch(aux)
	{
		case 'rojo':
			rojo.style.backgroundColor = 'red';
			break;
		case 'amarillo':
			amarillo.style.backgroundColor = 'yellow';
			break;
		case 'verde':
			verde.style.backgroundColor = 'green';
			break;
		case 'azul':
			azul.style.backgroundColor = 'blue';
			break;
	}
}

var lightUP = function(n)
{
	switch(n)
	{
		case 0:
			encender(rojo.id);
			break;
		case 1:
			encender(amarillo.id);
			break;
		case 2:
			encender(verde.id);
			break;
		case 3:
			encender(azul.id);
			break;
	}
}

var lightOUT = function (n)
{
	switch(n)
	{
		case 0:
			apagar(rojo.id);
			break;
		case 1:
			apagar(amarillo.id);
			break;
		case 2:
			apagar(verde.id);
			break;
		case 3:
			apagar(azul.id);
			break;
	}
}

var n;
var loopty = function ()
{
	n = Math.floor(Math.random() * 4);
	console.log(n)
	lightUP(n);
	setTimeout(lightOUT, 1000, n);
}
	
setInterval(loopty, 4000);