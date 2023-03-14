$("#add_task").submit(function(event){
   alert("Data Inserted Successfully!");
})

$("#update_task").submit(function(event){
   event.preventDefault();

   var unindexed_array = $(this).serializeArray();
   var taskdata = {}

   $.map(unindexed_array, function(n, i){
      taskdata[n['name']] = n['value']
   })

   console.log("Update_TASK button click")

   var request = {
      "url" : `http://localhost:5000/api/tasks/${taskdata.id}`,
      "method" : "PUT",
      "data" : taskdata
   }

   $.ajax(request).done(function(response){
      alert("Data Updated Successfully!");
   })
})

if(window.location.pathname == "/tasks"){
   $ondelete = $(".table tbody td a.delete");
   $ondelete.click(function(){
      var id = $(this).attr("data-task-id");

      var request = {
         "url" : `http://localhost:5000/api/tasks/${id}`,
         "method" : "DELETE"
      }

      if(confirm("Do you really want to delete this record?")){
         $.ajax(request).done(function(response){
            alert("Data Deleted Successfully!");
            location.reload();
         })
      }
   })
}
