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
    })
})

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
        
        return $.ajax({
            url:'http://localhost:3000/todos',
            type: 'GET',
            headers: {token: localStorage.token}
        })
        .done(function(result){
            $('#loginRegister').hide()
            $('#main').show()
            const todos = result.todos
            
            for (let i = 0; i < todos.length; i++) {
                $('#tbody').append(
                    `<tr>
                        <td class = "id">${todos[i].id}</td>
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
    })
    .fail(function(err){
        console.log(err)
    })
})

function signOut() {
    // var auth2 = gapi.auth2.getAuthInstance();
    // auth2.signOut().then(function () {
    //   console.log('User signed out.');
    //   localStorage.removeItem('token')
    //   $navbar.hide()
    //   $registerForm.show()
    //   $tableTodo.hide()
    // })
    localStorage.removeItem('token')
    console.log('User signed out.');
    $('#loginRegister').show()
    $('#main').hide()
  }