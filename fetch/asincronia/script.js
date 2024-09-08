const $fragment = document.createDocumentFragment()
const $contenedorPersonajes = document.querySelector(".personajes")
const $parrafoError = document.querySelector(".error")

const funcionAsincrona = async () => {
    try {
        const response = await fetch("https://dragonball-api.com/api/characters")
        const responseJson = await response.json()
        
        if (!response.ok) {
            throw {
                status: response.status,
                textoError: response.statusText || "Recurso no encontrado"
            }
        }
        
        let personajes = responseJson.items

        for (let i = 0; i < personajes.length; i++) {
            let $contenedorPersonaje = document.createElement("div")
            let $titulo = document.createElement("h3") // personaje # ?
            let $imagen = document.createElement("img")

            let $parrafoNombre = document.createElement("p")
            let $parrafoDescripcion = document.createElement("p")
            let $parrafoRaza = document.createElement("p") 
            let $parrafoGenero = document.createElement("p") 
            let $parrafoKi = document.createElement("p") 
            let $parrafoMaxKi = document.createElement("p") 

            $titulo.innerText = `Personaje #${personajes[i].id}`
            $imagen.src = personajes[i].image
            $parrafoNombre.innerText = `Nombre: ${personajes[i].name}`
            $parrafoDescripcion.innerText = `Descripción: ${personajes[i].description}`
            $parrafoRaza.innerText = `Raza: ${personajes[i].race}`
            $parrafoGenero.innerText = `Genero: ${personajes[i].gender}`
            $parrafoKi.innerText = `Ki: ${personajes[i].ki}`
            $parrafoMaxKi.innerText = `Max Ki: ${personajes[i].maxKi}`

            $contenedorPersonaje.append($titulo, $imagen, $parrafoNombre, $parrafoDescripcion, $parrafoRaza, $parrafoGenero, $parrafoKi, $parrafoMaxKi)

            $fragment.append($contenedorPersonaje)

        }

        $contenedorPersonajes.appendChild($fragment)

    
    } catch (error) {
        $parrafoError.style.cssText = `
            color: red;
            font-weight: bold;
            font-size: 25px;
        `
        $parrafoError.innerText = `Error ${error.status}: ${error.textoError}`
    }
}

funcionAsincrona()