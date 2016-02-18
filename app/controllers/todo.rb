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

