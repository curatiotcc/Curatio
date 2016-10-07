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

		function myconsultas(){
        document.getElementById("email").innerHTML = localStorage.getItem("emailCache");
        document.getElementById("nome").innerHTML = localStorage.getItem("nomeCache");
		
		var patient= localStorage.getItem("nomeCache");
	    
		var xmlhttp = new XMLHttpRequest();

		var url = "http://curatiotcc.esy.es/curatio/consulta2.php?email="+localStorage.getItem("emailCache");

		xmlhttp.onreadystatechange=function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				ConectaServidor(xmlhttp.responseText);
			}
		}
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
		 
		function ConectaServidor(response) {

		var dados = JSON.parse(response);
		var i;
		var conteudo = "";
	 
		for(i = 0; i < dados.length; i++)
		{ 
			localStorage.setItem("especialidadeCache[" + i + "]", dados[i].tb02_especialidade);
			localStorage.setItem("nomepacienteCache[" + i + "]", dados[i].tb02_nome_paciente);
			localStorage.setItem("dataCache[" + i + "]", dados[i].tb02_data);
			localStorage.setItem("horaCache[" + i + "]", dados[i].tb02_hora);
			localStorage.setItem("tipoconsultaCache[" + i + "]", dados[i].tb02_tipo_consulta);
			localStorage.setItem("situacaoCache[" + i + "]", dados[i].tb02_situacao);
			localStorage.setItem("convenioCache[" + i + "]", dados[i].tb02_convenio);
			localStorage.setItem("datanascimentoCache[" + i + "]", dados[i].tb02_dat_nasc_paciente);
			localStorage.setItem("medicoCache[" + i + "]", dados[i].tb02_medico_preferencial);
			conteudo += "<li style='top: 0px;'><a href='#' class='item-link item-content'><div class='item-inner'><div class='item-title-row'><div class='item-title'>"+localStorage.getItem('especialidadeCache[' + i + ']')+"</div></div><div class='item-subtitle'>"+localStorage.getItem('nomepacienteCache[' + i + ']')+"</div></div></a></li>";
			
		}
    document.getElementById("conteudoJSON").innerHTML = conteudo;

	}
	    }
            function cadDependente() {
	            myApp.showPreloader('Cadastrando...');
	            setTimeout(function () {
	            myApp.hidePreloader();
	            }, 2000);

            var xmlhttp = new XMLHttpRequest();
            
            var varNomedep = document.getElementById("nomedep").value;
            var varDatnasc = document.getElementById("calendar-default").value;
            var varSexdep = document.getElementById("sexdep").value;
                        
            if(varNomedep != "" & varDatnasc != "" & varSexdep != ""){
            
            var url = "http://curatiotcc.esy.es/curatio/inserir2.php?email="+localStorage.getItem("emailCache")+"&nomedep="+varNomedep+"&datnasc="+varDatnasc+"&sexdep="+varSexdep;
            
            xmlhttp.onreadystatechange=function() 
            {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
                {
                    ConectaServidor(xmlhttp.responseText);
                }
            }
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
             
            function ConectaServidor(response) 
            {	
            	myApp.closeModal('.popup-cad');
            	 myApp.addNotification({
        		 message: varNomedep+' foi cadastrado como seu dependente em Curatio :)'
    			 });
            }}else{
                myApp.alert('Algum campo está vazio!', 'Alto lá!');
            }
			selecionar();
            }
			function selecionar(){
				var xmlhttp = new XMLHttpRequest();
				var container = $$('body');
				if (container.children('.progressbar, .progressbar-infinite').length) return;
				myApp.showProgressbar(container, 'white');
				setTimeout(function () {
					myApp.hideProgressbar();
				}, 1500);
	
			var out = "<li><label class='label-radio item-content'><input type='radio' name='myradio' checked='checked' value='"+localStorage.getItem('nomeCache')+"' checked='checked'><div class='item-media'><i class='icon icon-form-radio'></i></div><div class='item-inner'><div class='item-title'>"+localStorage.getItem('nomeCache')+"</div></div></label></li>";
            
            var url = "http://curatiotcc.esy.es/curatio/consulta3_2.php?email="+localStorage.getItem("emailCache");
            
            xmlhttp.onreadystatechange=function() {
				if (this.readyState == 4 && this.status == 200) {
					myFunction(this.responseText);
				}
			}
			xmlhttp.open("GET", url, true);
			xmlhttp.send();
             
            function myFunction(response) {
				var arr = JSON.parse(response);
				var i;
                
				for(i = 0; i < arr.length; i++)
					{ 
						localStorage.setItem("dependNomeCache[" + i + "]", arr[i].tb08_nome_dependente);
						localStorage.setItem("dependSexCache[" + i + "]", arr[i].tb08_sexo_dependente);
						localStorage.setItem("dependNascCache[" + i + "]", arr[i].tb08_dataNascimento_dependente);
						out += "<li><label class='label-radio item-content'><input type='radio' name='myradio' value='"+localStorage.getItem('dependNomeCache[' + i + ']')+"'><div class='item-media'><i class='icon icon-form-radio'></i></div><div class='item-inner'><div class='item-title'>"+localStorage.getItem('dependNomeCache[' + i + ']')+"</div></div></label></li>";
					}
				document.getElementById("pacientes").innerHTML = out;
            }
            }
		function hora(){
			var count;
			var hour = '';
			var minute = '';
			for (count = 1; count < 25; count ++){
				hour += ' '+count;
			}
			for (count = 1; count < 61; count ++){
				minute += ' ' + count;
			}
			var pickerDescribe = myApp.picker({
				input: '#picker-describe',
				cols: [
					{
						textAlign: 'left',
						values: (hour).split(' ')
					},
					{
						values: (minute).split(' ')
					},
				]
			}); 
			}
            function myFunction() {
            myApp.showPreloader('Conferindo...');
            setTimeout(function () {
            myApp.hidePreloader();
            }, 1000);

            var varEmail = document.getElementById("email").value;
            var varSenha = document.getElementById("senha").value;
            
            if(varEmail == "admuser" && varSenha == "admkey"){
                var conteudo2 = "administrador";
                localStorage.setItem("emailCache", varEmail);
                localStorage.setItem("nomeCache", conteudo2);
                window.location.assign("main.html");
            }else{
			if(!(varEmail == "" || varSenha == "")){
            var xmlhttp = new XMLHttpRequest();
            
            var url = "http://curatiotcc.esy.es/curatio/consulta.php?email="+varEmail+"&senha="+varSenha;
            myApp.alert('URL!', 'Auto lá!');
            xmlhttp.onreadystatechange=function() 
            {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
                {
                    ConectaServidor(xmlhttp.responseText);
					myApp.alert('xmlhttp function', 'Auto lá!');
                }
            }
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
			myApp.alert('xmlhttp open send', 'Auto lá!');
             
            function ConectaServidor(response) 
            {myApp.alert('functionconectaservidor', 'Auto lá!');
                var dados = JSON.parse(response);

                var conteudo3 = dados[0].error;
                if(conteudo3 == "false"){
                    var conteudo2 = dados[0].tb01_nome;
                    localStorage.setItem("emailCache", varEmail);
                    localStorage.setItem("nomeCache", conteudo2);
                    window.location.assign("main.html");
                }else{
                    myApp.alert('Alguma coisa está errada!', 'Ops =/');
					}
			}
			}else{
				myApp.alert('Algum dos campos está vazio!', 'Ops =/');
			}
			}
            }
            function myFunction2() {
            myApp.showPreloader('Conferindo...');
            setTimeout(function () {
            myApp.hidePreloader();
            }, 2000);

            var xmlhttp = new XMLHttpRequest();
            
            var varEmail = document.getElementById("cadEmail").value;
            var varNome = document.getElementById("cadNome").value;
            var varTell = document.getElementById("cadTell").value;
            var varDat = document.getElementById("calendar-default").value;
            var varSenha = document.getElementById("cadSenha").value;
            var varSenha2 = document.getElementById("cadConfirmSenha").value;
            
            if(varEmail != "" & varSenha != "" & varNome != "" & varTell != "" & varDat != ""){
            if(varSenha==varSenha2){
            var url = "http://curatiotcc.esy.es/curatio/inserir.php?email="+varEmail+"&senha="+varSenha+"&nome="+varNome+"&tell="+varTell+"&dat="+varDat;
            
            xmlhttp.onreadystatechange=function() 
            {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
                {
                    ConectaServidor2(xmlhttp.responseText);
                }
            }
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
             
            function ConectaServidor2(response) 
            {
                var dados = JSON.parse(response);

                            var conteudo3 = dados[0].error;
                            if(conteudo3 == "false"){
                                localStorage.setItem("emailCache", varEmail);
                                localStorage.setItem("nomeCache", varNome);
                                window.location.assign("main.html");
                            }else{
                                myApp.alert('Alguma coisa está errada!', 'Auto lá!');
                            }
            }}else{
                myApp.alert('As senhas estão diferentes!', 'Auto lá!');
            }}else{
                myApp.alert('Algum campo está vazio!', 'Auto lá!');
            }
            }
