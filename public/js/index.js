let sku = document.getElementById('sku');
let articulo = document.getElementById('articulo');
let marca = document.getElementById('marca');
let modelo = document.getElementById('modelo');
sku.setAttribute('maxLength', 6);
articulo.setAttribute('maxLength', 15);
marca.setAttribute('maxLength', 15);
modelo.setAttribute('maxLength', 20);

function enable_AMM() {
    articulo.setAttribute('disiable', false);
    marca.setAttribute('disiable', false);
    modelo.setAttribute('disiable', false);
}

async function fetchArticulo(){

    let sku_value = $('#sku').val();
    let articulos = [];
    // console.log(sku_value);
    if (sku_value.length > 5) {
        await fetch(`http://localhost:3030/api/articulo/${sku_value}`)
        .then(response => response.json())
        .then(data => {
            articulos = data;
            console.log(data);
            // alert(articulos);
        })
        .catch(error => console.log(error));
        if (articulos.msg) {
            // alert(articulos.msg);
            $('#articulo');
            $('#marca');
            $('#modelo');
            enable_AMM();
            
        } else if (articulos) {
            articulo = articulos.find(a => a.sku === sku_value);
            alert('El sku ya esta en uso: ' + articulo.articulo, "alerta");
            return true;
        }
    } else {
        alert('El sku debe tener 6 caracteres', 'alerta');
    }

}