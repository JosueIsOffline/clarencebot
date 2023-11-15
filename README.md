 # ClarenceBot

## Descripción 

ClarenceBot es un bot de discord creado para servir en un servidor privado llamado “Dominican Devs”, en este documento se estará explicando un poco sobre el bot, algunas funciones y todo lo necesario que debes saber si quieres entender este proyecto.

# Pre-requesitos

- Visual Studio Code (https://code.visualstudio.com/)
- Node.js (https://nodejs.org/en)
- Nodemon (https://www.npmjs.com/package/nodemon)


# Como activar el bot

## Paso 1. Clonar el repositorio
‘‘‘Bash

git clone https://github.com/JosueIsOffline/clarencebot.git
cd clarencebot

‘‘‘

## Paso 2. Instalar las dependencias
‘‘‘bash

npm install

‘‘‘
## Paso 3. Instalar nodemon
‘‘‘bash

npm install nodemon -g

‘‘‘


## Paso 4.Crear archivo .env


- Crear un archivo .env
- Abre el archivo .env y añade el siguiente código:

‘‘‘Bash

TOKEN=YourDiscordTokenHere
PREFIX=YourCommandPrefix
GUILD_ID=YourGuildID
etc...

‘‘‘
 
## Paso 5. Correr el proyecto

'''Bash

    npm run dev

'''

