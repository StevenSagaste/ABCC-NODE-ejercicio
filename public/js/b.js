
let sku = document.getElementById("sku");
let res = document.querySelector("#res"); 
let guardar = document.getElementById("Eliminar");

async function verificar() {
    await obtenerArticulo();
    // $("#articulo").focus();
}

async function obtenerArticulo(){

    let sku_value = sku.value; // console.log(sku_value);
    let articulo;
    if (sku_value.length > 5) {
        await fetch(`http://localhost:3030/api/articulo/${sku_value}`)
        .then(response => response.json())
        .then(data => {
            articulo = data; // console.log(data); // alert(articulos);
        })
        .catch(error => console.log(error));
        if (articulo.msg) {
            alert(articulo.msg);
            // await obtenerDepartamentos();    
        } else if (articulo) {
            
            await showArticuloDetails();
            
            return true;
        }
    } else {
        alert('El sku debe tener 6 caracteres', 'alerta');
    }

    async function showArticuloDetails() {
        //.find(a => a.sku === sku_value);
        console.log(articulo);
        await getDepClsFamNames( articulo.departamento, articulo.clase, articulo.familia);
        
    }

    async function getDepClsFamNames(dep,cls,fam) {
        const body = {
            dep: dep,
            cls: cls,
            fam: fam
        }
        await fetch(`http://localhost:3030/api/articulo/dcf`, {
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
                return 0;
            } else {
                console.log(data);
                res.innerHTML = '';
                var p = document.createElement("p");
                p.innerHTML =   `Articulo: ${articulo.articulo} <br>` + 
                            `Marca: ${articulo.marca} <br>` +
                            `Modelo: ${articulo.modelo} <br>`+
                            `Departamento: ${data[0].departamento} <br>`+
                            `Clase: ${data[0].clase} <br>`+
                            `Familia: ${data[0].familia} <br>`+
                            `Descontinuado: ${articulo.descontinuado} <br>`+
                            `Cantidad: ${articulo.cantidad} <br>`+
                            `Stock: ${articulo.stock} <br>`+
                            `Fecha de Alta: ${articulo.fechaAlta} <br>`+
                            `Fecha de Baja: ${articulo.fechaBaja} <br>`
                ;
                res.appendChild(p);            
            };
        })
    }

}
