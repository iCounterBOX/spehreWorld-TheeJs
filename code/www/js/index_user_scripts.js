(function()
{
 "use strict";
 /*
   hook up event handlers
 */
 function register_event_handlers()
 {




        /* button  Home */
    $(document).on("click", ".uib_w_34", function(evt)
    {

        location.href ="http://www.steinplus.com";
    });

        

        /* button  Home */


        /* button  Kontakt */
    $(document).on("click", ".uib_w_32", function(evt)
    {
         /* Other options: .modal("show")  .modal("hide")  .modal("toggle")
         See full API here: http://getbootstrap.com/javascript/#modals 
            */
        
         $(".uib_w_49").modal("toggle");  
    });
    
     
    
        /* button  Impressum */
    
    
        /* button  Impressum */
    
    
        /* button  Impressum */
    
    
        /* button  Impressum */
    $(document).on("click", ".uib_w_56", function(evt)
    {
         activate_page("#uib_page_impressum"); 
    });
    
        /* button  Impressum */
    $(document).on("click", ".uib_w_57", function(evt)
    {
         /* Other options: .modal("show")  .modal("hide")  .modal("toggle")
         See full API here: http://getbootstrap.com/javascript/#modals 
            */
        
         $(".uib_w_58").modal("toggle");  
    });
    
        /* button  Datenschutzerklärung */
    $(document).on("click", ".uib_w_60", function(evt)
    {
         /* Other options: .modal("show")  .modal("hide")  .modal("toggle")
         See full API here: http://getbootstrap.com/javascript/#modals 
            */
        
         $(".uib_w_61").modal("toggle");  
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
