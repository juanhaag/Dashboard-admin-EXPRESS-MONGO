
# Dashboard admin panel inmobiliaras
Panel simple desarrollado con express, con el fin de poder cargar propiedades y luego a través de una serie de endpoints consumir esas propiedades en el front.



## Instalacion

Se utilizo npm como gestor de paquetes

```bash
  npm install 
```
    
## Stack que se utilizo

**Client:** 
![](https://img.shields.io/badge/Javascript-yellow)
 ![](https://img.shields.io/badge/Bootsrap-violet) 
 ![](https://img.shields.io/badge/EJS-green)

**Server:** 
![](https://img.shields.io/badge/NodeJs-green)
![](https://img.shields.io/badge/Express-black)

**Base de datos:** 
🍃MongoDB

**JWT:**  para poder autenticar a los usuarios y validarlos.
**bcrypt:**  para poder encriptar las contraseñas de los usuarios y poder guardar las mismas de forma segura en un documento en mongo.
**Mongoose:** para poder manejar los modelos, schemas con mas facilidad.
**dotenv:** para poder utilizar un archivo .env 
**cors:** para el manejo de las mismas.



## Deploy

Es necesario configurar un archivo .env para que funcione correctamente

```bash
    npm index
```

