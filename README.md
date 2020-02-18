# Welcome to My mode7 repository
Hola! espero serte claro en esta documentación sobre la utilizacion del motor grafico! Happy Hacking.. 

## Motor Grafico
Uno de los aspectos más importantes a la hora de desarrollar un videojuego es la elección del **motor gráfico** que se va a utilizar. El motor gráfico es la base sobre la que se construye todo el videojuego. El nombre de “motor” no es aleatorio, pues podríamos verlo como el conjunto de piezas que forman el motor de un coche, que es lo que hace que funcione. Luego ya depende de cada cual ponerle una carrocería más o menos bonita y decidir cómo se va a comportar el coche, siempre sujeto a los límites impuestos por el motor.

## El modo7

El modo 7 es un sistema de procesamiento gráfico desarrollado por Nintendo para la consola de Super Nintendo, en la cual manipula una textura para que sea rotada y escalada, para crear una perspectiva de profundidad en una superficie 2D .
## Codigo base

Todo codigo base de un motor grafico se compone de una serie de funciones que se ejecutan formando un bucle, asi es, como un motor giratorio este se buclea para que en cada ciclo se ejecute una accion determinada que actualize al estado anterior, un frame, creando una animacion.

    main()
    {
		
		
		init()
		{
			frame()
			{
				update()
				{
					//actualizar estados
				}
				render()
				{
					//renderizar estados
				}
				frame()
				{
					//se vuelve a llamar frame para buclear
				}
			}	
		}
    }


# Estructura de proyecto y utilizacion de modulo
Utilizaremos un proyecto base alojado en github que tiene la siguiente estructura:
+ node_modules
 + build
	 + css
		 + style.css
	 + js
		 + bundle.js
	 + img
		 + ejemplo.png
		 + ejemplo2.png
	 + sounds
		 + ejemplosound.mp3  
	 + index.html    
+ src
	+ index.html  
	+ app
		+ index.js
		+ loadEntities.js
+ packaje.json
+ webpack.config.js
+ .babelrc

## NPM

Una vez con nuestra estructura necesitaremos el modulo que contiene todo el código del motor gráfico.  lo puedes descargar con la siguiente linea de comando en el directorio base de tu proyecto

>sudo npm i --save-dev seven-mode

Gracias a esto nosotros solo nos preocuparemos en programar los niveles, eventos, animaciones...


## Webpack y babel

Como estamos utilizando versiones de ECMASCRIPT que el navegador no soporta, utilizaremos webpack y babel para convertir nuestro codigo en un solo archivo .js que nuestro navegador comprenda sin problemas. para ello utilizaremos el proyecto base que puedes encontrar en este repositorio:
[https://github.com/PipoLucido/webpack-babel-ES10](https://github.com/PipoLucido/webpack-babel-ES10)


## Load Entities

Para cargar entidades(sprites) y posterior mente ubicarlos en alguna ubicacion de el plano pseudo3D de el motor grafico debemos prodecer de la siguiente manera:
En el archivo :
+ index.html 
		Debemos crear una etiqueta img con la imagen que deseamos utilizar, display:none en style y un id para identificarla. 
	
Ejemplo:
		

`<img style="display:none"id="enemies"src="img/alien.png">`

Luego en el archivo :
+ loadEntities.js
debemos agregar un nuevo atributo con el nombre que deseemos dentro de ese objeto y asignarle por el id la imagen en que cargamos en el html

Ejemplo:

`enemies : document.getElementById('enemies')`

## Render Entities

Luego de cargar nuestras entidades estamos listos para mostrarla en pantalla 
en el archivo :
+ index.js
encontramos una funcion llamada _createEntities() en la que en un array hacemos varios push de objetos, estos objetos son nuestras entidades.
Hay 3 tipos de entidades en esta version del motor grafico. 

+ Flat : En donde plasmaremos una imagen en el plano(piso) en la ubicacion que le especifiquemos por parametros
 `propiedad.entidades.push(new  modo7.Flat(0,  0,  -163,  entities.entities.skyDown,  propiedad));`
 donde los parametros significan:
  `modo7.Flat(X,  Y,  Z,  IMAGEN_CARGADA_DESDE_LOADENTITIES.JS,  PROPIEDADES_DE_CANVAS_IMPORTADO_DESDE_MODULO)`

+ Sprite : En donde plasmaremos un sprite(a modo de personaje, enemigo o objeto) en la ubicacion que le especifiquemos por parametros
 `propiedad.entidades.push(new  modo7.Sprite(-6,  0,  -299,  entities.entities.enemies,  propiedad,15,15));`
 donde los parametros significan:
  `modo7.Sprite(X,  Y,  Z,  IMAGEN_CARGADA_DESDE_LOADENTITIES.JS,  PROPIEDADES_DE_CANVAS_IMPORTADO_DESDE_MODULO,ANCHO,LARGO)`
 los parametros ANCHO y LARGO tienen problemas y estan en desarrollo, por tanto se encuentran desactivados.
 
+ Entity : En donde plasmaremos un cuadrado de color en la ubicacion que le especifiquemos por parametros
 `propiedad.entidades.push(new  modo7.Entity(90,  0,  -220,  'yellow',  propiedad,5,5));`
 donde los parametros significan:
  `modo7.Entity(X,  Y,  Z,  IMAGEN_CARGADA_DESDE_LOADENTITIES.JS,  PROPIEDADES_DE_CANVAS_IMPORTADO_DESDE_MODULO,ANCHO,LARGO)`
   los parametros ANCHO y LARGO funcionan correctamente.
