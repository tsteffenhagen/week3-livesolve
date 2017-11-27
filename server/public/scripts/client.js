console.log('JS sourced');

$(document).ready(function () {
    console.log('jQ sourced');
    
    getAllTasks();

});

function getAllTasks() {
    console.log('in getAllTasks');
    
    $.ajax({
        url: '/tasks',
        method: 'GET',
    }).then(function(response) {
        console.log('response', response);

        response.forEach(appendToDom);        
    })
}

function appendToDom(taskObject) {
    $('#taskList').append(`<li>${taskObject.name}</li>`);
};