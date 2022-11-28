

import { productos } from "./productos.js";

window.onload = function () {

    //creo un fragment para meter el contenido del main en cada iteraccion recorriendo el json de productos y añadir el fragment al main al final de las iteraciones para reducir los recalculamientos a la hora de añadir los elementos al dom, así añade todo cuando esta creado los productos
    let fragmentMain = new DocumentFragment();

    //llamo a la funcion crear el esqueleto del dom, dinamicamente
    creaEsqueletoDom();

    function creaEsqueletoDom() {

        //creo la estructura principal del dom
        let header = document.createElement("header");
        let h1 = document.createElement("h1");
        h1.textContent = "Productos Clasificados";
        header.appendChild(h1);
        //añado el header  al dom
        document.body.appendChild(header);

        let main = document.createElement("main");
        let div1 = document.createElement("div");
        let div2 = document.createElement("div");
        div1.classList = "productos";
        div2.classList = "grupos";
        //creo el contenedor de los productos seleccionados con innerhtml por variar
        div2.innerHTML = ` 
            <div id="grupoa">
                <h2>Grupo A</h2>
                <div id="prodA">
                </div>
            </div>
            <div id="grupob">
                <h2>Grupo B</h2>
                 <div id="prodB">
                </div>
            </div>
        `;
        main.appendChild(div1);
        main.appendChild(div2);
        //añado los elemtnos al dom
        document.body.appendChild(main);

        //llamo a la funcion pintaproductos y le paso el div donde van a ir los productos
        pintaProductos(div1);
    }

    function pintaProductos(divmain) {
        for (const producto of productos) {

            //creacion de los elementos del div izquierdo de los productos
            let divProducto = document.createElement("div");
            let div1 = document.createElement("div");
            divProducto.classList = "producto";
            divProducto.setAttribute("id", `id${producto.id}`);
            let div2 = document.createElement("div");
            let img = document.createElement("img");
            let h2 = document.createElement("h2");
            let texto = document.createElement("p");
            let divboton = document.createElement("div");
            divboton.setAttribute("id", `bot${producto.id}`);
            let grupoa = document.createElement("button");
            let grupob = document.createElement("button");
            //cojo la ruta de la foto + la ruta relativa
            img.src = `./imagenes/${producto.foto}`;
            img.alt = producto.denominacion;
            div1.appendChild(img);
            h2.textContent = producto.denominacion;
            texto.textContent = producto.comentario;
            grupoa.textContent = "Grupo A";
            grupob.textContent = "Grupo B";
            div2.appendChild(h2);
            div2.appendChild(texto);
            divboton.appendChild(grupoa);
            divboton.appendChild(grupob);
            div2.appendChild(divboton);
            divProducto.appendChild(div1);
            divProducto.appendChild(div2);
            fragmentMain.appendChild(divProducto);


            //si apreto el boton a le paso como parametros el boton para saber el texto que contiene luego y el producto entero que estoy seleccionando, asi puedo voler a acceder a sua propiedades
            grupoa.addEventListener("click", () => { mueve(producto, grupoa) });
            grupob.addEventListener("click", () => { mueve(producto, grupob) });
        }
        divmain.appendChild(fragmentMain);

    }

    function mueve(producto, boton) {
        //selecciono el contenedor del boton que apreté y lo cambio por un span con el texto del boton que apreté , asi quito los 2 botones dependiendo del boton que aprete sin necesidad de primero hacer removeElementListener
        document.querySelector(`#bot${producto.id}`).innerHTML = `<span class="spanDespues">${boton.textContent}</span>`;



        //creo los elementos que va a tener el contenedor de los productos seleccionados
        let divSelect = document.createElement("div");
        let img = document.createElement("img");
        let texto = document.createElement("p");
        texto.textContent = producto.denominacion;
        img.src = `./imagenes/${producto.foto}`;
        img.alt = producto.denominacion;
        divSelect.appendChild(img);
        divSelect.appendChild(texto);


        //operador ternario Si el boton que se apretó tiene el texto GrupoA se va al div GrupoA , sino al div GrupoB
        boton.textContent == "Grupo A" ? document.querySelector("#prodA").appendChild(divSelect) : document.querySelector("#prodB").appendChild(divSelect);


    }



}