'use strict'



var urlBase = "https://sylvia.104cubes.com/MySQL/"
var endpoint = "api/select.php";
var urlImages = "https://sylvia.104cubes.com/MySQL/noticiasForm/img/.1711449668-person-reading-newspaper.jpg.";



  fetch(urlBase+endpoint)

  .then(objectLoop)
  .catch()




async function objectLoop(response) {

  let datos = await response.json();
  console.log(datos);

  document.getElementById('print-container').innerHTML =  datos.map(printData).join(''); //map te mete comas entre items y join te permite removerla

}


function printData(item) {

  let content = item.texto;


  return [

    `<div class="card" style="width: 22rem;">
    <img src="${urlImages}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${item.titulo}</h5>
      <p class="card-text">Fecha:${item.fecha}</p>
      <p class="card-text">Autor:${item.autor}</p>
      <p class="card-text">Categoria${item.categoria}</p>
      <p class="card-text">${content.length >= 50 ? content.substring(0, 50) + '...' : content}</p>
      <a href="#" class="btn btn-primary">Ver Noticia</a>
    </div>
  </div>`];


    
}



let currentDate = new Date();
 const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
 
 document.getElementById("fecha-actual").innerHTML = currentDate.toLocaleDateString(undefined, options);



