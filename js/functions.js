function scrollEnlaceNav(obj){
	var target = obj.hash,
	$target = $(target);
	var alturaHeader = parseInt($("header").css("height"));

	$('html, body').stop().animate({
		'scrollTop': $target.offset().top
	}, 1000, 'easeInExpo');
}

//comprobamos situacion de pantalla para activar contenedores
function checkAnimation(){
	 $("body section").each(function () {
	     if (isElementInViewport(this)) {
        // Elimino clase inactive y arranco la animacion
		$("section").removeClass("active");
        $(this).addClass('active');	
		//colorBody();	
    	}
		 
	})
}

// asigna el color de fondo al cuerpo
function colorBody() {
	$("body").attr('id', 'color-'+$("section.active").attr('id'));
}

function isElementInViewport(elem) {
    var $elem = $(elem);

    // cojo posiciones de la pagina.
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
	var tercioPant = $(window).height()/3;


    // cojo posiciones del elemento respecto a la pagina.
    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();
	// si el elemento esta en la pagina envio true.
    return ((elemTop < viewportBottom-tercioPant) && (elemBottom > viewportTop+tercioPant));
}

// Establece la cabecera fija cuando dejamos atras el div intro
function checkMenu(){
    var viewportTop = $(window).scrollTop();
	if ((viewportTop) < ($("#intro").height())) {
		$('header').removeClass('fija');
	} else {
		$('header').addClass('fija');	
	}
}


// Asigna altura de la ventana al div intro
function introHeight() {
	var heightIntro = $(window).height();
	$("#intro").css("height",heightIntro);
}

$(function() {
	checkAnimation();
	introHeight();	
	
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();
		scrollEnlaceNav(this)
	});
	$(window).scroll(function(){
		checkAnimation();
		checkMenu();
	});

	causeRepaintsOn = $("h1, h2, h3, p");
	
	$(window).resize(function() {
	  causeRepaintsOn.css("z-index", 1);
		introHeight();

	});
	
    $('section[data-type="background"],div[data-type="background"]').each(function(){
        var $bgobj = $(this); // assigning the object
        $(window).scroll(function() {
            var yPos = -($(window).scrollTop() / $bgobj.data('speed')); 
             
            // Put together our final background position
            var coords = '50% '+ yPos + 'px';
 
            // Move the background

            $bgobj.css({ backgroundPosition: coords });
        }); 
    }); 	


});

