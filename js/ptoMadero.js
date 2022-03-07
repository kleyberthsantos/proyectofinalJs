let listArs = [];

//ready
$(()=>{
    console.log(("DOM listo para procesar"));

    //botón procesar a través de Jquery
    $('#btnProcesar').on('click', ()=>{
        viewElementsList();
        const pDebCred = document.querySelector('#debCred').value,
            pEfectivo = document.querySelector('#efectivo').value,
            pTransferencias = document.querySelector('#transferencias').value,
            pCheques = document.querySelector('#cheques').value,
            pRegCaja = document.querySelector('#regCaja').value,
            pSumaTotal = parseFloat(pDebCred) + parseFloat(pEfectivo) + parseFloat(pTransferencias) + parseFloat(pCheques),
            pDiferenciaBruta = (pSumaTotal-pRegCaja).toFixed(2),
            pFecha = document.querySelector('#fecha').value;


        saveClose(pFecha, pDebCred, pEfectivo, pTransferencias, pCheques, pRegCaja, pDiferenciaBruta);


        $('#datosResultado').addClass('activo');
        $('#formularioN').removeClass('activo');

        viewElementsList();
        localStorage.setItem('savedLocal', JSON.stringify(listArs));

    });


        function saveClose(fecha, debCred, efectivo, transferencias, cheques, regCaja, difrenciBruta){
            let newClose = {
                fecha: (fecha),
                debCred :("$" + debCred),
                efectivo : ("$" + efectivo),
                transferencias : ("$" + transferencias),
                cheques : ("$" + cheques),
                registroCaja : ("$" + regCaja),
                diferencia : ("$" + difrenciBruta)
            };
            console.log(newClose);
            listArs.push(newClose);
            localStorageListArs(listArs);
        }
          function localStorageListArs(listOne){
            sessionStorage.setItem('savedLocal', JSON.stringify(listOne));
        }

        $('#btnGuardar').on('click', async(e)=>{
            const formulario = document.getElementById('form');
            e.preventDefault();
            console.log("guardado exitoso");
            localStorage.setItem('savedLocal', JSON.stringify(listArs));

            await fetch('https://sheet.best/api/sheets/62d6e237-a7b9-452c-b809-fa6bda477327', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "Fecha Pto.M": bFecha = document.querySelector('#fecha').value,
                "Debito/Credito Pto.M": bDebCred = document.querySelector('#debCred').value,
                "Efectivo Pto.M": bEfectivo = document.querySelector('#efectivo').value,
                "Transferencia Pto.M": bTransferencias = document.querySelector('#transferencias').value,
                "Cheques Pto.M": bCheques = document.querySelector('#cheques').value,
                "Registro en Caja Pto.M": bRegCaja = document.querySelector('#regCaja').value,
                "Diferencia Bruta Pto.M": bSumaTotal = parseFloat(bDebCred) + parseFloat(bEfectivo) + parseFloat(bTransferencias) + parseFloat(bCheques)-parseFloat(bRegCaja)
                })
            })
        })

        $('#btnVolver').on('click', ()=>{
            console.log("presionaste volver");

            $(datosResultado).removeClass('activo');
            $(formularioN).addClass('activo');
            });


        function getDateNewClose(){
            var storageClose = sessionStorage.getItem('savedLocal');
            if(storageClose == null){
                listArs = [];
            }else{
                listArs = JSON.parse(storageClose);
            }
            return listArs;
        }

        function viewElementsList(){
            let list = getDateNewClose();
                tbody = document.querySelector('#summaryTable tbody');
                tbody.innerHTML = '';
           for(let i = 0; i < list.length; i++) {
                let rows = tbody.insertRow(i);
                    fechaCell = rows.insertCell(0)
                    debCredCell = rows.insertCell(1),
                    efectivoCell = rows.insertCell(2),
                    transferenciasCell = rows.insertCell(3),
                    chequesCell = rows.insertCell(4),
                    registroCajaCell = rows.insertCell(5),
                    diferenciaCell = rows.insertCell(6)

                    fechaCell.innerHTML = list[i].fecha;
                    debCredCell.innerHTML = list[i].debCred;
                    efectivoCell.innerHTML = list[i].efectivo;
                    transferenciasCell.innerHTML = list[i].transferencias;
                    chequesCell.innerHTML = list[i].cheques;
                    registroCajaCell.innerHTML = list[i].registroCaja
                    diferenciaCell.innerHTML = list[i].diferencia;

            tbody.appendChild(rows);
            }
        }

});