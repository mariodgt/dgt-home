(function() {
    var $ventana = $(window);
    var $cuerpo = $('body');
    var $htmlcuerpo = $('html, body');
    var $transitionTime = 6500;


    $ventana.on('load', function() {
        // Mostrando la primera imagen y activando el slider del Main
        if ($cuerpo.hasClass('home')) {
            apareceImagen($lisSlider.eq(0)); 
        }
    });

    
    // Slider del main (Home)
    var $sliderMain = $('#slideHome');
    if ($sliderMain.length) {
        var $ulSlider = $sliderMain.find('> ul')
        var $lisSlider = $ulSlider.find('> li');
        var nLis = $lisSlider.length;
        if (nLis > 1) {
            // Dandole ancho relativo al Ul y a los Li.
            if($sliderMain.hasClass('swipe')){
                $ulSlider.css('width', (nLis * 100) + '%');
                $lisSlider.css('width', (100 / nLis) + '%');
            }else{
                if( !$sliderMain.hasClass('fade')){
                    $sliderMain.addClass('fade');
                }
            }
            
            $lisSlider.eq(0).addClass('active').siblings().removeClass('active');
            //apareceImagen($lisSlider.eq(0));
            
            // creando Bullets
            var $bltsSliderMain = $sliderMain.find('.bullets');
            creaBullets(nLis, $bltsSliderMain);
            // Agregando .active al primer Bullet
            var $bulletsSliderMain = $bltsSliderMain.find('button');
            $bulletsSliderMain.eq(0).addClass('active');
            // Boton next y prev
            var $btnNext = $sliderMain.find('.next');
            $btnNext.on('click', function() {
                if (!$ulSlider.hasClass('swiping')) {
                    var $elLiActivo = itemActivo($bulletsSliderMain);
                    if (($elLiActivo + 1) !== $bulletsSliderMain.length) {
                        $bulletsSliderMain.eq($elLiActivo + 1).trigger('click');
                        $lisSlider.eq($elLiActivo);
                    } else {
                        //$btnsNavNbh.eq(0).trigger('click');
                        $bulletsSliderMain.eq(0).trigger('click');
                    }
                }
            });
            var $btnPrev = $sliderMain.find('.prev');
            $btnPrev.on('click', function() {
                if (!$ulSlider.hasClass('swiping')) {
                    var $elLiActivo = itemActivo($bulletsSliderMain);
                    if ($elLiActivo !== 0) {
                        $bulletsSliderMain.eq($elLiActivo - 1).trigger('click');
                    }else{
                        $bulletsSliderMain.eq($elLiActivo - 1).trigger('click');
                    }
                }
            });
            // Agregando función Click a los bullets
            $bulletsSliderMain.on('click', function() {
                if (!$ulSlider.hasClass('swiping')) {
                    //console.log('hice click, Hora: ' + getDateTime());
                    $ulSlider.addClass('swiping');
                    var $indexButton = $(this).index();
                    if($sliderMain.hasClass('swipe')){
                        $ulSlider.css('margin-left', '-' + ($indexButton * 100) + '%');
                    }

                    apareceImagen($lisSlider.eq($indexButton));
                    $lisSlider.eq($indexButton).addClass('active').siblings().removeClass('active');
                    $bulletsSliderMain.eq($indexButton).addClass('active').siblings().removeClass('active');
                    $ulSlider.removeClass('swiping');
                }
            });
            // AutoPlay.
            function autoPlayM() {
                //console.log('AutoPlay, Hora: ' + getDateTime());
                var $elLiActivo = itemActivo($bulletsSliderMain);
                if (($elLiActivo + 1) !== $bulletsSliderMain.length) {
                    $bulletsSliderMain.eq($elLiActivo + 1).trigger('click');
                } else {
                    $bulletsSliderMain.eq(0).trigger('click');
                }
            };
            var autoPlaySliderMain;
            // Hover en barra ploma y en el nav de bullets
            $sliderMain.find('.gray-bar, .nav').mouseenter(function() {
                if ($ulSlider.hasClass('interval')) {
                    clearInterval(autoPlaySliderMain);
                    $ulSlider.removeClass('interval').addClass('hover');
                }
            }).mouseleave(function() {
                if (!$ulSlider.hasClass('interval')) {
                    $ulSlider.removeClass('hover').addClass('interval');
                    autoPlaySliderMain = setInterval(autoPlayM, $transitionTime);
                    //console.log('salí del hover');
                }
            });
            // funciones útiles
            function apareceImagen(li) {
                var $elLi = li.find('> img');
                var $srcOriginal = $elLi.attr('original-src');
                if ($srcOriginal !== undefined) {
                    clearInterval(autoPlaySliderMain);
                    $ulSlider.removeClass('interval');
                    $elLi.attr('src', $srcOriginal).removeAttr('original-src');
                    li.addClass('loading');
                    $elLi.on('load', function() {
                        $(this).css('opacity', '1');
                        if (li.hasClass('loading')) {
                            li.removeClass('loading');
                        }
                        if (!$ulSlider.hasClass('interval') && !$ulSlider.hasClass('hover')) {
                            //console.log('puse interval primero')
                            autoPlaySliderMain = setInterval(autoPlayM, $transitionTime);
                            $ulSlider.addClass('interval');
                        }
                    });
                } else {
                    if (!$ulSlider.hasClass('interval') && !$ulSlider.hasClass('hover')) {
                        //console.log('puse interval de nuevo')
                        autoPlaySliderMain = setInterval(autoPlayM, $transitionTime);
                        $ulSlider.addClass('interval');
                    }
                }
            }

            touchSlider($ulSlider, $bulletsSliderMain);
        } else {
            $sliderMain.find('.nav').css('display', 'none');
        }
    };


    // Boton para subir al top de la web
    var $toUp = $('#toup');
    if ($toUp.length) {
        $toUp.on('click', function() {
            $htmlcuerpo.animate({
                scrollTop: 0
            }, 800);
        })
    }


    // Funciones Útiles
    function touchSlider(ulSlider, botonesNav) {
        var xDown = null;
        var yDown = null;
        ulSlider.on('touchstart', function(evt) {
            xDown = evt.touches[0].clientX;
            yDown = evt.touches[0].clientY;
        });
        ulSlider.on('touchmove', function(evt) {
            if (!xDown || !yDown) {
                return;
            }
            var xUp = evt.touches[0].clientX;
            var yUp = evt.touches[0].clientY;
            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;
            if (Math.abs(xDiff) > Math.abs(yDiff)) { // si se mueve derecha o izquierda
                evt.preventDefault();
                ulSlider.trigger('mouseenter');
                var nLis = botonesNav.length;
                var $elLiActivo = itemActivo(botonesNav);
                if (xDiff > 0) { // izquierda
                    if (($elLiActivo + 1) !== nLis) {
                        botonesNav.eq($elLiActivo + 1).trigger('click');
                        ulSlider.trigger('mouseleave');
                    } else {
                        botonesNav.eq(0).trigger('click');
                        ulSlider.trigger('mouseleave');
                    }
                } else { // derecha
                    if ($elLiActivo !== 0) {
                        botonesNav.eq($elLiActivo - 1).trigger('click');
                        ulSlider.trigger('mouseleave');
                    }
                }
            }
            xDown = null;
            yDown = null;
        });
    }

    function itemActivo(losLi) { // refactorizar esto (nueva idea para la función).
        var nLis = losLi.length;
        for (var s = 0; s < nLis; s++) {
            if (losLi.eq(s).hasClass('active')) {
                return s;
            }
        }
    }
    
    function creaBullets(numeroLis, contentBullets) {
        if (contentBullets.length) {
            // borro los botones previos que existan.
            if (contentBullets.find('> *').length) {
                contentBullets.empty();
            }
            // Creo los botones
            var b = 0;
            while (b < numeroLis) {
                contentBullets.append('<button></button>');
                b++
            }
        } else {
            console.log('El contenedor .NAV no existe, no puedo crear los botones de navegación.');
        }
    }
    

}());