const $fragment = document.createDocumentFragment()
const $contenedorPersonajes = document.querySelector(".personajes")
const $parrafoError = document.querySelector(".error")
const xmlHttpRequest = new XMLHttpRequest() 

xmlHttpRequest.addEventListener("readystatechange", (e) => { 
    const elementoTarget = e.target 
    const elementoStatus = elementoTarget.status
    

    if (elementoTarget.readyState !== 4) {
        return 
    }

    if (elementoStatus >= 100 && elementoStatus < 400) {
        // console.log(`Estado: ${elementoTarget.statusText}`)
        // console.log(elementoTarget)

        const responseText = elementoTarget.responseText
        let responseJson = JSON.parse(responseText)
        let personajes = responseJson.items

        console.log(personajes)

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
        
        
    }else {
        console.log(`Error: ${elementoTarget.statusText}`)
        $parrafoError.style.cssText = `
            color: red;
            font-weight: bold;
            font-size: 25px;
        `
        $parrafoError.innerText = `Error: ${elementoTarget.statusText}`
    }
    
})


xmlHttpRequest.open("GET", "https://dragonball-api.com/api/characters")
xmlHttpRequest.send()




