console.log("=== CEP ===");

// Actions

const catalog = [];
const id = 0;

function onlyNumbers(event) {
    event.preventDefault();
    // console.log(arguments[0]);
    // console.log(e.target.value);
    // console.log(this.value, this.value.match(/\d+/));
    // console.log(this.value, /\d+/.test(this.value));
    this.value = this.value.replace(/\D+/g, "");

}

function validateEntry() {
    if (this.value.length === 8) {
        // this.style.borderColor = ""; 
        // this.style.borderWidth = "";
        // this.style.backgroundColor = "";
        this.classList.remove("error");
        document.querySelector("#botao-enviar").innerHTML = '<button id="enviar" type="button" class="btn btn-primary mb-3">Consultar</button>'
        //getAddress(this.value);
        document.querySelector("#enviar").addEventListener('click', getAddress);
    } else {
        // this.style.borderColor = "red";
        // this.style.borderWidth = "2px";
        // this.style.backgroundColor = "yellow";
        this.classList.add("error");
        this.focus();
        document.querySelector("#botao-enviar").innerHTML = '<button id="enviar" type="button" class="btn btn-primary mb-3" disabled>Consultar</button>'
    }

}

function getAddress(e) {
    event.preventDefault();

    const postalCode = document.querySelector("#cep").value;



    // endpoint
    // const endpoint = "https://viacep.com.br/ws/" + postalCode + "/json/";
    const endpoint = `https://viacep.com.br/ws/${postalCode}/json/`;

    // config
    const config = {
        method: "GET"
    };

    // request
    /*
    
                  Promise
                    |
                 <pending>
                /         \
           fulfilled     rejected
           .then()       .catch()
    */
   console.log(endpoint);
   console.log(config);
   const teste = fetch(endpoint,config);
   console.log(teste);
    fetch(endpoint, config)
        .then(function (resp) {
                console.log("teste"); 
                console.log(resp);
                return resp.json(); 
            })
        .then(getAddressSuccess)
        .catch(getAddressError);
}

function getAddressSuccess(address) {
    if(address.error){
        getAddressError();
    }else{

        
        console.log(address);
        
        
        const { logradouro, cep, localidade, uf, bairro } = address;
        
        catalog.push(address);
        //console.log(catalog.length);
        
        const linhas = catalog.map(function (address) {
            return `<div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${address.logradouro}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">
            ${address.bairro} - ${address.localidade} - ${uf}
            </h6>
            <p class="card-text">${address.cep}</p>
            </div>
            </div><br>`
        }).join("");
        
        document.querySelector(".cards").innerHTML = linhas;
    }



}

function getAddressError(msg) {
    console.log(msg);
}



// Mapping Events
document.querySelector("#cep").addEventListener("input", onlyNumbers); // onlyNumbers(InputEvent)
document.querySelector("#cep").addEventListener("focusout", validateEntry);