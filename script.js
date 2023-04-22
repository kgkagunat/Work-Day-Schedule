$(function () {
  
  function createTimeBlock(hour) {                        
    var timeBlock = $('<div class="row time-block">');    
    timeBlock.attr("id", "hour-" + hour);                 

    timeBlock.append('<div class="col-2 col-md-1 hour text-center py-3">' + (hour > 12 ? hour - 12 : hour) + (hour >= 12 ? "PM" : "AM") + '</div>');                                                                                                                                               
    timeBlock.append('<textarea class="col-8 col-md-10 description" rows="3"> </textarea>');            
    timeBlock.append('<button class="btn saveBtn col-2 col-md-1" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button>');    
    return timeBlock;              
  }
  
  for (var i = 9; i <= 17; i++) {                             
    $("#timeBlocksContainer").append(createTimeBlock(i));     
  }
  


  //------------------------------------------------------------------------------------------------------//



  $(".saveBtn").on("click", function () {                             
    var hour = $(this).parent().attr("id").split("-")[1];             
    var eventDescription = $(this).siblings("textarea").val();        
    localStorage.setItem("event-" + hour, eventDescription);          
  });
  


  //------------------------------------------------------------------------------------------------------//
  
  

  function updateTimeBlockColors() {                                 
    $(".time-block").each(function () {                               
      var hour = parseInt($(this).attr("id").split("-")[1]);         
      var currentHour = dayjs().hour();                               

      $(this).removeClass("past present future"); 

      if (hour < currentHour) {                                       
        $(this).addClass("past");
      } else if (hour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }
  
  updateTimeBlockColors();                                           
  setInterval(updateTimeBlockColors, 60000);                     
  
  

  //------------------------------------------------------------------------------------------------------//



  function loadStoredEvents() {                                       
    for (var i = 9; i <= 17; i++) {                                  
      var storedEvent = localStorage.getItem("event-" + i);           
      if (storedEvent) {                                             
        $("#hour-" + i).find("textarea").val(storedEvent);            
      }
    }
  }
  
  loadStoredEvents();                                               

});

