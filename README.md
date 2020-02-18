# Welcome to My mode7 repository
Hola! espero serte claro en esta documentación sobre el funcionamiento del motor grafico! Happy Hacking.. 

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


## NPM

You can open a file from **Google Drive**, **Dropbox** or **GitHub** by opening the **Synchronize** sub-menu and clicking **Open from**. Once opened in the workspace, any modification in the file will be automatically synced.

## Webpack y babel

You can save any file of the workspace to **Google Drive**, **Dropbox** or **GitHub** by opening the **Synchronize** sub-menu and clicking **Save on**. Even if a file in the workspace is already synced, you can save it to another location. StackEdit can sync one file with multiple locations and accounts.
