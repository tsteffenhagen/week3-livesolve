console.log('JS sourced');

$(document).ready(function () {
    console.log('jQ sourced');
    
    getAllTasks();
    $('#newTaskButton').on('click', addNewTask);

    $('#taskList').on('click', '.completeButton', completeTask);
});

function getAllTasks() {    
    $.ajax({
        url: '/tasks',
        method: 'GET',
    }).then(function(response) {
        console.log('response', response);
        $('#taskList').empty();
        response.forEach(appendToDom);        
    })
}

function addNewTask() {
    var newTaskName = $('#newTaskName').val();

    $.ajax({
        method:'POST',
        url: '/tasks',
        data: {
            name: newTaskName
        }
    }).then(function(response){
        console.log('response', response);
        $('#newTaskName').val('');
        getAllTasks();
    })
};

function appendToDom(taskObject) {
    var $newListItem = $('<li></li>');
    $newListItem.append(taskObject.name);
    if (taskObject.is_complete) {
        $newListItem.addClass('completed');
    } else {
        $newListItem.append('<button class="completeButton">Complete</button>');
    }
    $newListItem.data('id', taskObject.id)
    $('#taskList').append($newListItem);
};

function completeTask() {
    console.log('in completeTask');
    var taskToComplete = $(this).parent().data().id;
    console.log('task to complete', taskToComplete);
    $.ajax({
        method: 'PUT',
        url: '/tasks/complete/' + taskToComplete,
    }).then(function(response) {
        console.log('response', response);
        getAllTasks();
    })
    
}