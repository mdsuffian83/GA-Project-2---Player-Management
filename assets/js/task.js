$('#add_task').submit(function (event) {
  event.preventDefault();
  var unindexed_array = $(this).serializeArray();
  var taskdata = {};

  $.map(unindexed_array, function (n, i) {
    taskdata[n['name']] = n['value'];
  });

  if (taskdata.user == undefined) {
    taskdata['user'] = document.getElementById('userSelect').value;
  }

  console.log(taskdata);
  console.log('#add_task=>', taskdata);
  var request = {
    url: `http://localhost:3000/api/tasks`,
    method: 'POST',
    data: taskdata,
  };

  $.ajax(request)
    .done(function (response) {
      console.log('add task done=>', response);
      alert('Data Updated Successfully!');
      window.location.pathname = '/tasks';
    })
    .fail(xhr => {
      var err = eval('(' + xhr.responseText + ')');
      alert(`Data Updated failed(${xhr.status}): ${err.message}`);
    });
});

$('#update_task').submit(function (event) {
  event.preventDefault();

  var unindexed_array = $(this).serializeArray();
  var taskdata = {};

  $.map(unindexed_array, function (n, i) {
    taskdata[n['name']] = n['value'];
  });

  console.log('Update_TASK button click');

  var request = {
    url: `http://localhost:3000/api/tasks/${taskdata.id}`,
    method: 'PUT',
    data: taskdata,
  };

  $.ajax(request).done(function (response) {
    alert('Data Updated Successfully!');
  });
});

if (window.location.pathname == '/tasks') {
  $ondelete = $('.table tbody td a.delete');
  $ondelete.click(function () {
    var id = $(this).attr('data-task-id');

    var request = {
      url: `http://localhost:3000/api/tasks/${id}`,
      method: 'DELETE',
    };

    if (confirm('Do you really want to delete this record?')) {
      $.ajax(request).done(function (response) {
        alert('Data Deleted Successfully!');
        location.reload();
      });
    }
  });
}
