$(document).ready(function() {
  $('#create_link').on('click', function(e) {
    e.preventDefault();
    console.log($('#task_form'))
    var url = $(this).attr('href')

    $.ajax({
      url: url,
      method: 'get'
    }).done(function(response) {
      $('#todo').append(response)
    }).fail(function(error) {
      console.log(error)
    }).always(function(){
      console.log("always here")
    })
    $(this).remove();
  });


  $('#todo').on('submit','form', function(e) {
    e.preventDefault();
    var url = $(this).attr('action')
    var method = $(this).attr('method')
    var data = $(this).serialize();

    $.ajax({
      url: url,
      method: method,
      data: data
    }).done(function(response) {
      $('#todo_list').append(response)
      $(this).hide();
    }).fail(function(error) {
      console.log(error);
    })
    $('#create_link').show()
    $('#todo').find('input[type=text]').val(' ')
  });

  $('#todo').on('click', 'li', function(e) {
    e.preventDefault;
    console.log(this)
    var url = $(this).find('#delete_form').attr('action')
    console.log(url)
    $.ajax({
      url: url,
      method: 'delete'
    }).done(function(response){
      console.log(response)
      var id = "#" + response.id
      $(id).remove();
    }).fail(function(error) {
      console.log(error);
    })
  })
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
});
