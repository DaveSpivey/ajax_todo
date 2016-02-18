### Ajax Lecture

#### app/db/migrate/2016021514635_create_tasks.rb
```
class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :name
      t.timestamps
    end
  end
end
```

#### app/models/task.rb
```
class Task < ActiveRecord::Base
  # Remember to create a migration!
end
```

#### app/seeds.rb
```
3.times { Task.create(name: Faker::Name.name)}
```

#### app/config/environment.rb
```
require 'faker'
```

#### app/Gemfile
```
gem 'faker'
```

#### app/controllers/todo.rb
```
get '/' do
  @todos = Task.all
  erb :todo_list
end

get '/tasks/new' do
    erb :_form, layout: false, locals: { action: "/tasks", value: "Submit Task"}
end

post '/tasks' do
  @todo = Task.create(name: params[:task_name])
  if request.xhr?
    erb :_todo, layout: false, locals: {todo: @todo}
  else
    redirect '/'
  end
end

delete '/tasks/:id' do
  @todo = Task.find_by(id: params[:id].to_i)
  @todo.destroy
  if request.xhr?
    content_type :json
    { id: @todo.id }.to_json
  else
    redirect '/'
  end
end
```

#### app/views/todo_list.erb
```
<div id="todo">
<h3>Todo List</h3>
<ul id = "todo_list">
  <% if @todos %>
    <% @todos.each do |todo| %>
      <%= erb :_todo, layout: false, locals: { todo: todo} %>
    <% end %>
  <% end %>
</ul>
<a id="create_link"  href="/tasks/new">Create a new Task</a>
</div>
```

#### app/views/_todo.erb
```
<li id = '<%= todo.id %>'> <%= todo.id %> : <%= todo.name %> 
<%= erb :_delete_form, layout: false, locals: { todo: todo } %></li>
```

#### app/views/_form.erb
```
<form id="task_form" action= "<%= action %>" method="post">
  <input type="text" name="task_name">
  <input type="submit" value="<%= value %>">
</form>
```

#### app/views/_delete_form.erb
```
<form id="delete_form" action="/tasks/<%= todo.id %>" method = "post">
  <input type="hidden" name="_method" value="delete">
  <input type="submit" value="DELETE"/>
</form>
```

#### app/public/application.css
```
#delete_form {
  display: inline-block;
}
```

#### app/public/application.js
```
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
});
```



