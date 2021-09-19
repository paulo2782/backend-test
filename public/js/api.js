server = 'https://back-end-test-app.herokuapp.com/'

// LISTA DE COMPETIDORES
var settings = {
  "url": server+"/read",
  "method": "GET",
  "timeout": 0,
  "headers": {
     "Content-Type": "application/x-www-form-urlencoded"
  }
};

$.ajax(settings).done(function (response) {
  url = window.location.href
  for(i = 0 ; i <= response.data.length-1 ; i++){
    name  = response.data[i].name
    email = response.data[i].email
    link  = response.data[i].link
    point = response.data[i].point
    $('#list').append(
      "<tr>"+
      "<td>"+name+"</td>"+
      "<td>"+email+"</td>"+
      "<td><a href='/special/"+link+"'>"+url+link+"</a></td>"+
      "<td>"+point+"</td>"
    ) 
  }   
})


// BOTAO CADASTRAR 
$('#register').submit(function(e){
  e.preventDefault()
  var settings = {
    "url": server+"/create",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
      "name":  $('#name').val(),
      "email": $('#email').val(),
      "phone": $('#phone').val()
    }
  };

  $.ajax(settings).done(function (response) {
    console.log(response)

    if(response.status == true){
      host         = response.host;
      special_link = response.special_link;
      
      localStorage.setItem('special_link',host+'/special/'+special_link)

      window.location.href='compartilhar'
    }else{
      alert(response.message)
    }
  });
})

$('#register_special').submit(function(e){
  e.preventDefault()
  var settings = {
    "url": server+"/create_special_link",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
      "name":  $('#name').val(),
      "email": $('#email').val(),
      "phone": $('#phone').val(),
      "special_link": $('#special_link').val()
    }
  };

  $.ajax(settings).done(function (response) {    
    if(response.status == false){
      alert(response.message)
      return false
    }else{
      alert(response.message)
      window.location.href="/"
    }
    
  })
})


// BOTAO FINALIZAR COMPETIÇÃO 
$('#btn_end').click(function(e){
  if(confirm('Confirma Finalizar Competição? Vai pagar todos os registros.')){
    var settings = {
      "url": server+"/delete",
      "method": "DELETE",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    $.ajax(settings).done(function (response) {
      alert("O vencedor da competição é "+response.message);
      window.location.href='/';
    });
  }else{
    return false;
  }
})
