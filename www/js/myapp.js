// Init App
//var myApp = new Framework7();
var myApp = new Framework7({   
    // Enable Material theme    
    material: true,
    animateNavBackIcon:true,
    cache: false       
});

// Expose Internal DOM library
var $$ = Dom7,
    vista_actual = '',    
    item_desmateria = '';//desc de la materia al crear nuevas evaluaciones antes de registrar    

// Add main view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: false,
    // Enable Dom Cache so we can use all inline pages
    domCache: false   
});

/***************************************************

***************************************************/
// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function (e) 
{    
    //mostrar loading
    myApp.showPreloader('Cargando...');
});

/***************************************************

***************************************************/

//al terminar una solicitud
$$(document).on('ajaxComplete', function (e) 
{   
    //ocultar loading   
    myApp.hidePreloader();  

    try
    {
        //convertir en json
        var jsonObject = JSON.parse(e.detail.xhr.responseText);     

        //verficamos
        if (jsonObject.proceso_respuesta == undefined)
        {
            //dialogo
            myApp.alert(jsonObject.mensaje_respuesta, '<i class="fa fa-exclamation-triangle" style="font-size:30px" aria-hidden="true"></i> Error');
        }           
    }
    catch(e)
    {
        //si entra aqui es que se esta mostrando la vista correctamente
        return 'html';
    }
});