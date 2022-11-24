let sku = document.getElementById('sku');
let articulo = document.getElementById('articulo');
let marca = document.getElementById('marca');
let modelo = document.getElementById('modelo');
let fechaAlta = document.getElementById('fechaAlta');
let fechaBaja = document.getElementById('fechaBaja');
let stock = document.getElementById('stock');
let cantidad = document.getElementById('cantidad'); 
sku.setAttribute('maxLength', 6);
sku.setAttribute('minLength', 6);
articulo.setAttribute('maxLength', 15);
marca.setAttribute('maxLength', 15);
modelo.setAttribute('maxLength', 20);
stock.setAttribute('max', 999999999);
stock.setAttribute('min', 1);
cantidad.setAttribute('max', 999999999);
cantidad.setAttribute('min', 1);
const date = new Date();
let fecha = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
fechaAlta.setAttribute('value', fecha);
fechaBaja.setAttribute('value', '1900-01-01');

async function verificar() {
    await obtenerArticulo();
    $("#articulo").focus();
}

async function obtenerArticulo(){

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
            $("#sku").attr('disabled',true);
            $("#verificador").attr('disabled',true);
            $("#cancelar").removeAttr('disabled');
            $('#articulo').removeAttr('disabled');
            $('#marca').removeAttr('disabled');
            $('#modelo').removeAttr('disabled');
            await obtenerDepartamentos();
            
        } else if (articulos) {
            articulo = articulos.find(a => a.sku === sku_value);
            alert('El sku: '+ sku_value +' ya esta en uso: ' + articulo.articulo, "alerta");
            return true;
        }
    } else {
        alert('El sku debe tener 6 caracteres', 'alerta');
    }

}

async function obtenerDepartamentos() {
    
    dep = [];
    await fetch(`http://localhost:3030/api/departamento`)
    .then( response => response.json())
    .then( data => {
        console.log(data);
        dep = data;
    })
    .catch(error => console.log(error));

    dep_id = []
    dep_name = []
    let htmlData = `<option for="departamento" value="0"></option>`;
    dep.forEach(element => {
        dep_id.push(element.id);
        dep_name.push(element.departamento);
        htmlData = htmlData + `<option for="departamento" value="${element.id}">${element.departamento}</option>`;
    });
    $("#departemento").html(htmlData).removeAttr('disabled');
    console.log({dep_id,dep_name});

}

async function obtenerClases() {

    dep = $("#departemento option:selected").text();
    dep_val = $("#departemento option:selected").val();
    
    console.log(`${dep_val},${dep}`);

    cls = [];
    if (dep_val>0) {

        await fetch(`http://localhost:3030/api/clase/${dep_val}`)
        .then( response => response.json())
        .then( data => {
            console.log(data);
            if (data.msg) {
                emptClase();
                alert(data.msg)
            } else {
                cls = data;
                fillClase();
            }
        })
        .catch(error => console.log(error));
        
    } else emptClase();

    function fillClase() {
        
        cls_id = []
        cls_name = []
        let htmlData = `<option for="clase" value="0"></option>`;
        cls.forEach(element => {
            cls_id.push(element.id);
            cls_name.push(element.clase);
            htmlData = htmlData + `<option for="clase" value="${element.id}">${element.clase}</option>`;
        });
        $("#clase").html(htmlData).removeAttr('disabled');
        console.log({dep_id,dep_name});
    }

    function emptClase() {
        let htmlData = `<option for="clase" value="0"></option>`;
        $("#clase").html(htmlData).attr('disabled',true);
    }
    
}

async function obtenerFamilias() {

    cls = $("#clase option:selected").text();
    cls_id = $("#clase option:selected").val();
    console.log(`${cls_id},${cls}`);

    fam = [];
    if (cls_id > 0) {
        
        await fetch(`http://localhost:3030/api/familia/${cls_id}`)
        .then( response => response.json())
        .then( data => {
            console.log(data);
            if (data.msg) {
                emptFamilia();
                alert(data.msg);
            } else {
                fam = data;
                fillFamilia();
            }
        })
        .catch( error => console.log(error));
        
    } else emptFamilia();

    function fillFamilia() {

        fam_id = [];
        fam_name = [];
        let htmlData = `<option for="clase" value="0"></option>`
        fam.forEach( elemnt => {
            htmlData = htmlData + `<option for="clase" value=${elemnt.id}>${elemnt.familia}</option>`;
        });
        $("#familia").html(htmlData).removeAttr('disabled');

    }

    function emptFamilia() {
        let htmlData = `<option for="clase" value="0"></option>`
        $("#familia").html(htmlData).attr('disabled',true);
    }

}

function enableStockCant() {
    
    fam_val = $("#familia option:selected").val();
    if (fam_val > 0) {
        $("#stock").removeAttr('disabled');
        $("#cantidad").removeAttr('disabled');
        $("#guardar").removeAttr('disabled');
    }else disableStockCant();

    function disableStockCant() {
    
        $("#stock").attr('disabled',true);
        $("#cantidad").attr('disabled',true);
        $("#guardar").attr('disabled',true);
    }

}

async function guardarArticulo() {

    let sku_val = $('#sku').val();
    let art_val = $('#articulo').val();
    let mar_val = $('#marca').val();    
    let mod_val = $('#modelo').val();
    dep_val = $("#departemento option:selected").val();
    let cls_val = $("#clase option:selected").val();
    let fam_val = $("#familia option:selected").val();
    let stock_val = $("#stock").val();
    let cant_val = $("#cantidad").val();    
    // alert('guardado')
    body = {
        sku: sku_val,
        articulo: art_val,
        marca: mar_val,
        modelo: mod_val,
        stock: stock_val,
        cantidad: cant_val,
        departamento: dep_val,
        clase: cls_val,
        familia: fam_val
    }
    if (stock_val < cant_val) {
        alert('El stock debe ser mayor o igual que la cantidad', 'alerta');
    } 
    else if (art_val.length <=0 || mar_val.length <=0 || mod_val.length <=0) {
        alert('Campos vacios')
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
        return
    }
}

const cancelar = () => {
    location.reload();
}