# Mini Challenge

## Descripción

En este reto, tienes que trabajar sobre una pequeña aplicación en React que se conecta a la API de Disney para mostrar un listado de personajes. El código que te proporcionamos tiene un error en la implementación de búsqueda. Tu tarea es identificar el problema y corregirlo.

## Requisitos

Node.js v20.17.0

## Instrucciones

1. Levanta la aplicación
2. Corrige el error
3. Responde la pregunta de GetOnBoard.

¡Buena suerte!

---

## Notas de Solución

### Identificación del Error
El problema principal era que la búsqueda iba "una letra por detrás". Esto sucedía porque el estado en React (`filterText`) es **asíncrono**. Al llamar a `setFilterText` y ejecutar el `fetch` inmediatamente después usando esa misma variable, la petición se disparaba con el valor previo al renderizado, no con el nuevo carácter ingresado.

### Corrección aplicada
1. **Acceso directo al evento**: Modifiqué la función `handleChange` para que el `fetch` utilice directamente `event.target.value`. Esto asegura que la API reciba el texto real que el usuario acaba de escribir.
2. **Consistencia de datos**: Al separar el valor de la petición del estado del componente, se garantiza que la interfaz y la lógica de búsqueda estén sincronizadas.

> **Nota técnica:** Otra alternativa para solucionar esto de forma más robusta en aplicaciones más grandes sería utilizar un `useEffect` que observe los cambios de `filterText`, idealmente acompañado de un *debounce* para optimizar el rendimiento de la red.
