if(!localStorage.getItem("token")) {
    $('#loginRegister').show()
    $('#main').hide()
} else {
    $('#loginRegister').hide()
    $('#main').show()
}

///register new user
$('#register').submit(function(e){
    e.preventDefault(); //biar gak refresh
    
    let username = $('#usernameRegister').val()
    let email = $('#emailRegister').val()
    let password = $('#passwordRegister').val()

    const user = {
        username,
        email,
        password
    }

    ///AJAX POST Register
    $.ajax({
        url:'http://localhost:3000/register',
        type: 'POST',
        data: user
    })
    .done(function(data){
        $('#modalRegister').modal('hide')
        console.log(data)
    })
    .fail(function(err){
        console.log(err)
        swal("Error!", err.responseJSON.message, "error");
    })
})

///show all
function showAll() {
    $.ajax({
        url:'http://localhost:3000/todos',
        type: 'GET',
        headers: {token: localStorage.token}
    })
    .done(function(result){
        $('#loginRegister').hide()
        $('#main').show()
        const todos = result.todos
        
        $('#tbody').empty()
        for (let i = 0; i < todos.length; i++) {
            $('#tbody').append(
                `<tr>
                    <td class = "id">${i+1}</td>
                    <td class = "title">${todos[i].title}</td>
                    <td class = "description">${todos[i].description}</td>
                    <td class = "status">${todos[i].status}</td>
                    <td class = "due_date">${todos[i].due_date.split('T')[0]}</td>
                    <td class = "language">${todos[i].language}</td>
                    <td class = "action"> 
                        <a class="btn btn-info btn-sm" id="updatetodo" role="button" data-toggle="modal" data-target="#updateModal" href="http://localhost:3000/todos/${todos[i].id}">
                            Update
                        </a>
                        <a class="btn btn-danger btn-sm" id="deletetodo" role="button" href="http://localhost:3000/todos/${todos[i].id}">
                            Delete
                        </a>
                    </td>
                </tr>`
            )
        }
    })
    .fail(function(err){
        console.log(err)
    })
}

///log in
$('#login').submit(function(e){
    e.preventDefault(); //biar gak refresh

    let email = $('#emailLogin').val()
    let password = $('#passwordLogin').val()

    const user = {
        email,
        password
    }

    ///AJAX POST Login
    $.ajax({
        url:'http://localhost:3000/login',
        type: 'POST',
        data: user
    })
    .done(function(data){
        localStorage.setItem("token",data)
        showAll()
    })
    .fail(function(err){
        console.log(err)
        swal("Error!", err.responseJSON.message, "error");
    })
})

///sign in Google
function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token

    $.ajax({
        method: 'POST',
        url: `http://localhost:3000/login/google`,
        data: { id_token }
      })
    .done(token => {
        localStorage.setItem('token', token)
        showAll()
    })
    .fail(function (result) {
        console.log(result)
    })
}

///sign out
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.removeItem('token');
      $('#loginRegister').show()
      $('#main').hide()
    })
}

///add new Todo list
$('#addTodo').submit(function(e){
    e.preventDefault();

    let title = $('#title').val()
    let description = $('#description').val()
    let status = $("#status").val()
    let due_date = $("#duedate").val()

    const todo = {
        title,description,status,due_date
    }

    $.ajax({
        url:'http://localhost:3000/todos',
        type: 'POST',
        data: todo,
        headers: {token: localStorage.token}
    })
    .done(function(data){
        $('#addModal').modal('hide')
        showAll()
    })
    .fail(function(err){
        console.log(err)
        swal("Error!", err.responseJSON.message, "error");
    })
})

function update(id){
    $('#updateTodo').submit(function(e){
        e.preventDefault(); //biar gak refresh
        
        let title = $('#titleUpdate').val()
        let description = $('#descriptionUpdate').val()
        let status = $('#statusUpdate').val()
        let due_date = $('#duedateUpdate').val()
    
        const todo = {
            title,description,status,due_date
        }
    
        ///AJAX POST Register
        $.ajax({
            url:`http://localhost:3000/todos/${id}`,
            type: 'PUT',
            data: todo,
            headers: {token: localStorage.token}
        })
        .done(function(data){
            $('#updateModal').modal('hide')
            showAll()
        })
        .fail(function(err){
            console.log(err)
        })
    })
}

$(this).click(function (e) {
    if (document.activeElement.id === 'deletetodo') {
      e.preventDefault()

      $.ajax({
        url:document.activeElement.href,
        type: 'DELETE',
        headers: {token: localStorage.token}
      })
      .done(function(data){
        showAll()
      })
      .fail(function(err){
        showAll()
      })

    }
    else if (document.activeElement.id === 'updatetodo') {
      e.preventDefault()

        $.ajax({
            url:document.activeElement.href,
            type: 'PUT',
            headers: {token: localStorage.token}
        })
        .done(function(data){
            $('#titleUpdate').val(data.hasil.title)
            $('#descriptionUpdate').val(data.hasil.description)

            if (data.hasil.status) {
                $('#statusUpdate').val('true')
            } else {
                $('#statusUpdate').val('false')
            }
            
            $('#duedateUpdate').val(data.hasil.due_date.split('T')[0])

            update(data.hasil.id)
        })
        .fail(function(err){
            console.log(err)
        })
    }
})




