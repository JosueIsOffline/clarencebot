 # ClarenceBot

![Node.js](https://img.shields.io/badge/Node.js-v21.2.0-green.svg)
![Dioscord.js](https://img.shields.io/badge/Discord.js-v14.8.0-blue.svg)
[![License](https://img.shields.io/badge/License-MIT-brightgreen.svg)](LICENSE)


## Descripción 

ClarenceBot es un bot de discord creado para servir en un servidor de discord llamado “Dominican Devs”, en este documento se estará explicando un poco sobre el bot, algunas funciones y todo lo necesario que debes saber si quieres entender este proyecto.

# Pre-requesitos

- [Node.js](https://nodejs.org/en).
- [Nodemon](https://www.npmjs.com/package/nodemon).


# Como activar el bot

## Paso 1. Clonar el repositorio

```
git clone https://github.com/JosueIsOffline/clarencebot.git

cd clarencebot
```

## Paso 2. Instalar las dependencias

```
npm install
```

## Paso 3. Instalar nodemon

```
npm install nodemon -g
```

## Paso 4.Crear archivo .env

- Crear un archivo .env
- Abre el archivo .env y añade el siguiente código:

```
TOKEN=YourDiscordTokenHere
PREFIX=YourCommandPrefix
GUILD_ID=YourGuildID
etc...
```
 
## Paso 5. Correr el proyecto

```
npm run dev
```
