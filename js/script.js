// // Referente Pagina - "compra_planos"
window.onload = function (){
  
    var oCep    = document.getElementById("cep");
    var oMsgUsuario = document.getElementById("msgCep");

//   //Teste de verificação (cep) 
   
     oCep.onblur = function(){
      var oRegExp = new RegExp("^[0-9]{5}-[0-9]{3}$");
        if (oRegExp.test(oCep.value) == true) {
        oCep.style.borderColor = "#008000";
          oMsgUsuario .style.color = "#008000";
          oMsgUsuario .innerHTML = "Campo preenchido com sucesso!";
        } else {
          oCep.style.borderColor = "#FF0000";
          oMsgUsuario .style.color = "#FF0000";
          oMsgUsuario .innerHTML = "CEP inválido! Informe novamente!";
         }
     }
  
//     //"Limpar"
   oCep.onfocus = function(){
     oCep.style.borderColor = "";
     oMsgUsuario .style.color = "";
      oMsgUsuario .innerHTML = "";
     }
  
    }


  //Referente Pagina - "calorias"
  

  document.getElementById('formulario').addEventListener('submit', cadastraAlimento);

   function cadastraAlimento(e){
     let tipoAlimento = document.getElementById('tipoAlimento').value;
     let valorCaloria = document.getElementById('valorCaloria').value;
     let time = new Date();

     if(!tipoAlimento && !valorCaloria ){
       alert('Por favor, preencha os campos em branco');
       return false;
     }

     refeicao= {
       alimento: tipoAlimento,
       caloria: valorCaloria,
       dia: time.getDate(),
       hora: time.getHours(),
       minutos: time.getMinutes()
     }

     if (localStorage.getItem('lista2') === null){
    let alimentos = [];
    alimentos.push(refeicao);
    localStorage.setItem('lista2', JSON.stringify(alimentos));
    }else{
      let alimentos = JSON.parse(localStorage.getItem('lista2'));
      alimentos.push(refeicao);
     localStorage.setItem('lista2', JSON.stringify(alimentos));
    }
    document.getElementById('formulario').reset();
    mostraLista();

     e.preventDefault();
  }

 function apagarAlimento(alimento){
   let alimentos = JSON.parse(localStorage.getItem('lista2'));

   for( let i = 0; i < alimentos.length; i++){
     if(alimentos[i].alimento == alimento){
       alimentos.splice(i, 1);
     }
      localStorage.setItem('lista2', JSON.stringify(alimentos));
   }
          mostraLista();
 }

  function mostraLista(){
    let alimentos = JSON.parse(localStorage.getItem('lista2'));
    let alimentosResultado = document.getElementById('resultados');

    alimentosResultado.innerHTML = ' ';

    for( let i = 0; i < alimentos.length; i++){
      let alimento = alimentos[i].alimento;
      let caloria = alimentos[i].caloria;
      let dia = alimentos[i].dia;
      let hora = alimentos[i].hora;
      let minutos = alimentos [i].minutos;

      alimentosResultado.innerHTML +=  '<tr><td>' + alimento +
                                                 '</td><td> '+ caloria +
                                                 '</td><td> '+dia+ 
                                                 '</td><td> '+ hora+' : '+ minutos +
                                                 '</td><td><button class= "btn btn-danger" style="width: 10vw; height: 7vh; text-align: center; justify-content-center align-items-center" onclick="apagarAlimento(\'' +alimento+ '\')">Excluir</button></td>'+
                                                 '</tr>';
                                   
                                             

    }
  }



