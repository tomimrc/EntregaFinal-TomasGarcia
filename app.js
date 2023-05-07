
let cardExistente
let reducir = 0
let mainEnDom = document.getElementById("main")
let divCarrito = document.getElementById("carrito")
let divComprar = document.getElementById("divComprar")
let comprar = document.getElementById("comprar")
const vaciar = document.getElementById("vaciar")
const iconoDark = document.getElementById("i-dark") 
const iconoBright = document.getElementById("i-bright")
const divDark = document.getElementById("div-dark")
const body = document.getElementById("body")








class Zapatilla{
    constructor(){
        this.listaZapatillas = []
}


async Pedir(){
    const resp = await fetch("./zapatillas.json")
    this.listaZapatillas = await resp.json()
    this.mostrarEnDom()
    carritoController.agregarYMostrarCarrito()
    carritoController.obtenerDeJson()
    carritoController.toastify()
}

mostrarEnDom(){
        this.listaZapatillas.forEach( element =>{
            mainEnDom.innerHTML += `
            <div class="card" id="${element.id} card">
            <img src="${element.img}" alt="Zapatilla ${element.id}">
            <h2>${element.nombre}</h2>
            <div class ="textos">
            <p>Precio $${element.precio}</p>
            <button class="boton" id="boton${element.id}">Agregar</button>
            </div>
            </div>`
            
        })
}
}



let zapatillas = new Zapatilla()
zapatillas.Pedir()



class Carrito {
    constructor() {
    this.listaCarrito = [];
}



agregarYMostrarCarrito() {
    const listaZapatillas = zapatillas.listaZapatillas;
    listaZapatillas.forEach((element) => {
    const boton = document.getElementById(`boton${element.id}`);
    boton.addEventListener("click", () => {
        this.listaCarrito.push(element);
        this.listaCarrito.forEach((element) => {
            cardExistente = document.getElementById(`carrito${element.id}`);
            
        });
        if (cardExistente) {
            element.k++
            
        const cantidad = cardExistente.querySelector(".cantidad");
        cantidad.innerText = `Cantidad: ${element.k}`
        } else {
        divCarrito.innerHTML += `
                        
                                <div class="cardCarrito" id="carrito${element.id}">
                                <img src="${element.img}" alt="Zapatilla ${element.id}">
                                <h2>${element.nombre}</h2>
                                <div class ="textos">
                                <p>Precio $${element.precio}</p>
                                <p class ="cantidad" id="pCard${element.id}">Cantidad: ${element.k}</p>
                                </div>
                                </div>
                                `;
        }
        this.pasarAJson()
    });
    });
}

obtenerDeJson(){
        if (localStorage.getItem("zapatillas")){
          let listaCarritoEnJson = localStorage.getItem("zapatillas")
          let listaCarrito = JSON.parse(listaCarritoEnJson)
          this.listaCarrito = listaCarrito.map((item) => {
            let zapatilla = zapatillas.listaZapatillas.find((zapatilla) => zapatilla.id === item.id);
            zapatilla.k = item.k;
            return zapatilla;
          });
          this.listaCarrito.forEach((element) => {
            cardExistente = document.getElementById(`carrito${element.id}`);
                if (cardExistente) {
                    element.k++
                    
                const cantidad = cardExistente.querySelector(".cantidad");
                cantidad.innerText = `Cantidad: ${element.k}`
                }else {
                    element.k = 1
                    divCarrito.innerHTML += `
                                    
                                            <div class="cardCarrito" id="carrito${element.id}">
                                            <img src="${element.img}" alt="Zapatilla ${element.id}">
                                            <h2>${element.nombre}</h2>
                                            <div class ="textos">
                                            <p>Precio $${element.precio}</p>
                                            <p class ="cantidad" id="pCard${element.id}">Cantidad: ${element.k}</p>
                                            </div>
                                            </div>
                                            `;
                    }
                
            
          });
        } else {
          this.listaCarrito = []
        }
}

pasarAJson(){
        let zapatillaEnJson = JSON.stringify(this.listaCarrito)
            localStorage.setItem("zapatillas",zapatillaEnJson)
}

totalCarrito(){
    comprar.addEventListener("click",() =>{
        if(this.listaCarrito.length == 0){
            total.innerText = "Total: " + "0"  
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'El carrito está vacío',
                showConfirmButton: false,
                timer: 1500,
                color: "black",
                background:"dimgrey"
              })
            
        }else{
                reducir = this.listaCarrito.reduce((acc,item) =>{
                return acc += item.precio
            }, 0)
            
            let total = document.getElementById("total")
            total.innerText = "Total: " + reducir 
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'La compra se realizó con éxito',
                showConfirmButton: false,
                timer: 1500,
                color: "black",
                background:"dimgrey"
              })
        } 
    }) 
}

toastify(){
    zapatillas.listaZapatillas.forEach((element) => {
    const boton = document.getElementById(`boton${element.id}`)
    boton.addEventListener("click", ()=>{
        setTimeout(() => {
            Toastify({
                text: `Agregaste:  ${element.nombre} al carrito` ,
                duration: 2000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: false, // Prevents dismissing of toast on hover
                offset: {
                    x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                    y: 50 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                  },
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
              }).showToast();
        }, 700);
        
    })
})
}

eliminarDeCarrito(){
    vaciar.addEventListener("click",()=>{
        this.listaCarrito.forEach(element =>{
            element.k = 1 
        })
        this.listaCarrito = []
        divCarrito.innerHTML = ""
        total.innerText = "Total: " 
        localStorage.clear()
        
    })
}

}



let carritoController = new Carrito()
carritoController.totalCarrito()
carritoController.eliminarDeCarrito()


const card = document.getElementById("card")
iconoDark.addEventListener("click",()=>{
    body.classList.add("dark")
    body.classList.remove("bright")
})
    
    

iconoBright.addEventListener("click",() =>{
    body.classList.add("bright")
    body.classList.remove("dark")
    
})











