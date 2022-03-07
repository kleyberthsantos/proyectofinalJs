//ready

$(()=>{
        viewElementsList();
          function localStorageListArs(listOne){
            localStorage.getItem('savedLocal', JSON.stringify(listOne));
        }



        function getDateNewClose(){
            var storageClose = localStorage.getItem('savedLocal');
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