var todos = [];
var ul = document.querySelector('ul');
var input = document.querySelector('input');
var btnAdd = document.getElementById('add');

get();
btnAdd.addEventListener('click', add);

// get item from server and render

function get(){
    axios.get('http://localhost:3000/todos')
    .then(function(res){
        todos = res.data;
        render(todos);
    })
    .catch(function(err){
        console.log(err);
    })
}
// add new item
function add(){
    var newTodo = input.value;
    axios.post('http://localhost:3000/todos', {title: newTodo})
    .then(function(res){
        console.log('done');
    })
    .catch(function(err){
        console.log(err);
    })
}

// Edit item
function update(id){
    var newValue = prompt('Edit todo');
    axios.put(`http://localhost:3000/todos/${id}`, {title: newValue})
    .then(function(res){
        console.log('done');
    })
    .catch(function(err){
        console.log(err);
    });
}

// remove item 
function remove(id){
    axios.delete(`http://localhost:3000/todos/${id}`)
    .then(function(res){
        console.log('done');
    })
    .catch(function(err){
        console.log(err);
    })
}

function render(todos){
    var htmlTodos = todos.map(function(item, index){
        return `<li>${item.title} <button onClick="update(${index + 1})">Update</button><button onClick="remove(${index + 1})">Delete</button></li>`;
    });
    ul.innerHTML = htmlTodos.join('');
}