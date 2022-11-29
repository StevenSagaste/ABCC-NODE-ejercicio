let sku = document.getElementById("sku");
let articulo = document.getElementById("articulo");
let marca = document.getElementById("marca");
let modelo = document.getElementById("modelo");
let departamento = document.querySelector("#departemento");
let clase = document.getElementById("clase");
let fam = document.getElementById("familia");
let fechaAlta = document.getElementById("fechaAlta");
let fechaBaja = document.getElementById("fechaBaja");
let stock = document.getElementById("stock");
let cantidad = document.getElementById("cantidad"); 
let guardar = document.getElementById("guardar");

const date = new Date();
let fecha = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
fechaAlta.setAttribute('value', fecha);
fechaBaja.setAttribute('value', '1900-01-01');

async function verificar() {
    await obtenerArticulo();
    // $("#articulo").focus();
}

async function obtenerArticulo(){

    let sku_value = sku.value; // console.log(sku_value);
    let articulos;
    if (sku_value.length > 5) {
        await fetch(`http://localhost:3030/api/articulo/${sku_value}`)
        .then(response => response.json())
        .then(data => {
            articulos = data; // console.log(data); // alert(articulos);
        })
        .catch(error => console.log(error));
        if (articulos.msg) {
            console.log(articulos.msg);
            ableInputs();
            await obtenerDepartamentos();
            
        } else if (articulos) {
            articulo = articulos//.find(a => a.sku === sku_value);
            alert('El sku: '+ sku_value +' ya esta en uso: ' + articulo.articulo, "alerta");
            return true;
        }
    } else {
        alert('El sku debe tener 6 caracteres', 'alerta');
    }

}

function ableInputs() {
    sku.setAttribute("disabled", true);
    document.querySelector("#verificador").setAttribute("disabled", true);
    document.getElementById("cancelar").removeAttribute("disabled");
    document.getElementById("articulo").removeAttribute("disabled");
    marca.removeAttribute("disabled");
    modelo.removeAttribute("disabled");
    document.getElementById("articulo").focus();
}

async function obtenerDepartamentos() {
    
    dep = [];
    await fetch(`http://localhost:3030/api/departamento`)
    .then( response => response.json())
    .then( data => {
        console.log(data);
        if (data.msg) {
            alert(data.msg);
            reload();
        } else {
            dep = data;
            fillDept();
        }
    })
    .catch(error => console.log(error));
    
    function fillDept() {

        var opt0 = document.createElement('option'); // let htmlData = `<option for="departamento" value="0"></option>`;
            opt0.setAttribute("value", '0');
            departamento.appendChild(opt0);
        dep.forEach(element => {
            var opt = document.createElement('option'); // htmlData = htmlData + `<option for="departamento" value="${element.id}">${element.departamento}</option>`;
            opt.setAttribute("value", element.id);
            opt.text = element.departamento;
            departamento.appendChild(opt); // console.log(opt);
        });
        departamento.removeAttribute("disabled"); // departamento.innerHTML = htmlData;
    }
}

async function obtenerClases() {
    
    console.log(`${departamento.value}`);

    cls = [];
    if (departamento.value > 0) {

        await fetch(`http://localhost:3030/api/clase/${departamento.value}`)
        .then( response => response.json())
        .then( data => {
            console.log(data);
            if (data.msg) {
                emptClaseFam();
                alert(data.msg)
            } else {
                cls = data;
                fillClase();
            }
        })
        .catch(error => console.log(error));
        
    } else emptClaseFam();

    function fillClase() {
        
        emptClaseFam();
        var opt0 = document.createElement('option');
        opt0.setAttribute("value", '0');
        clase.appendChild(opt0);
        cls.forEach(element => {
            var opt = document.createElement('option');
            opt.setAttribute("value", element.id);
            opt.text = element.clase;
            clase.appendChild(opt);
        });
        clase.removeAttribute("disabled");
    }
    
}

async function obtenerFamilias() {

    console.log(`${clase.value}`);

    fams = [];
    if (clase.value > 0 && departamento.value > 0) {
        
        await fetch(`http://localhost:3030/api/familia/${clase.value}`)
        .then( response => response.json())
        .then( data => {
            console.log(data);
            if (data.msg) {
                emptFamilia();
                alert(data.msg);
            } else {
                fams = data;
                fillFamilia();
            }
        })
        .catch( error => console.log(error));
        
    } else emptFamilia();

    function fillFamilia() {

        emptFamilia();
        var opt0 = document.createElement('option');
        opt0.setAttribute("value", '0');
        fam.appendChild(opt0);
        fams.forEach( elemnt => {
            var opt = document.createElement('option');
            opt.setAttribute("value", elemnt.id);
            opt.text = elemnt.familia;
            fam.appendChild(opt);
        });
        fam.removeAttribute("disabled");

    }

}

function emptClaseFam() {
    clase.innerHTML = ``; //<option for="clase" value="0"></option>
    clase.setAttribute("disabled", true);
    emptFamilia();
    ableStockCant();
    departamento.focus();
}

function emptFamilia() {
    fam.innerHTML = ``;
    fam.setAttribute("disabled", true);
    ableStockCant();
}

function ableStockCant() {
    
    if (fam.value && fam.value > 0) {
        stock.removeAttribute("disabled");
        cantidad.removeAttribute("disabled");
        guardar.removeAttribute("disabled");
    }else disableStockCant();

    function disableStockCant() {
    
        stock.setAttribute("disabled", true);
        cantidad.setAttribute("disabled", true);
        guardar.setAttribute("disabled", true);
    }

}

async function guardarArticulo() {
    
    // alert('guardado')
    body = {
        sku: sku.value,
        articulo: articulo.value,
        marca: marca.value,
        modelo: modelo.value,
        departamento: departamento.value,
        clase: clase.value,
        familia: fam.value,
        stock: stock.value,
        cantidad: cantidad.value
    }
    if (stock.value < cantidad.value) {

        alert('El stock debe ser mayor o igual que la cantidad', 'alerta');

    } else {
        console.log(body);
        await fetch(`http://localhost:3030/api/articulo`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(body)
        })
        .then( resp => resp.json())
        .then( data => {
            if (data.msg) {
                alert(data.msg);
                return
            }
        })
        .catch(error => alert("error" + error));
        return reload();
    }
}

function reload() {
    location.reload();
}