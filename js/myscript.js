window.jQuery = window.$ = jQuery;

$(document).ready(function() {
    var chart       = $('.chart'),
        chartNr     = $('.chart-content'),
        chartParent = chart.parent();

    function centerChartsNr() {
        chartNr.css({
            top: (chart.height() - chartNr.outerHeight()) / 2
        });
    }

    if (chart.length) {
        centerChartsNr();
        $(window).resize(centerChartsNr);

        chartParent.each(function() {
            $(this).onScreen({
                doIn: function() {
                    $(this).find('.chart').easyPieChart({
                        barColor:   '#2f2f2f',
                        trackColor: '#dcdcdc',
                        lineCap:    false,
                        lineWidth:  '2',
                        size:       '72',
                        scaleColor: false,
                        animate:    2000,
                        onStep:     function(from, to, percent) {
                            $(this.el).find('.percent').text(Math.round(percent));
                        }
                    });
                },
            });
        });
    }

    $('#camera_wrap_1').camera({
        transPeriod: 500,
        time:        3000,
        height:      '490px',
        thumbnails:  false,
        pagination:  true,
        playPause:   false,
        loader:      false,
        navigation:  false,
        hover:       false
    });

    hzFun();

    jQuery('#menu').slicknav();

    var $menu = $('#menuF');

    $(window).scroll(function() {
        if ($(this).scrollTop() > 100 && $menu.hasClass("default")) {
            $menu.fadeOut('fast', function() {
                $(this).removeClass("default")
                    .addClass("fixed transbg")
                    .fadeIn('fast');
            });
        } else if ($(this).scrollTop() <= 100 && $menu.hasClass("fixed")) {
            $menu.fadeOut('fast', function() {
                $(this).removeClass("fixed transbg")
                    .addClass("default")
                    .fadeIn('fast');
            });
        }
    });

    calculateScroll();
    $(window).scroll(function(event) {
        calculateScroll();
    });

    $('.navmenu ul li a').click(function() {
        $('html, body').animate({ scrollTop: $(this.hash).offset().top - 80 }, 800);
        return false;
    });

    $('.pretty a[rel^="prettyPhoto"]').prettyPhoto({
        animation_speed:    'normal',
        theme:              'light_square',
        slideshow:          3000,
        autoplay_slideshow: true,
        social_tools:       ''
    });
});

function calculateScroll() {
    var contentTop    = [];
    var contentBottom = [];
    var winTop        = $(window).scrollTop();
    var rangeTop      = 200;
    var rangeBottom   = 500;

    $('.navmenu').find('a').each(function() {
        contentTop.push($($(this).attr('href')).offset().top);
        contentBottom.push($($(this).attr('href')).offset().top + $($(this).attr('href')).height());
    });
    $.each(contentTop, function(i) {
        if (winTop > contentTop[i] - rangeTop && winTop < contentBottom[i] - rangeBottom) {
            $('.navmenu li')
                .removeClass('active')
                .eq(i).addClass('active');
        }
    })
}

function hzFun() {
    $(".bhide").click(function() {
        $(".hideObj").slideDown();
        $(this).hide(); //.attr()
        return false;
    });
    $(".bhide2").click(function() {
        $(".container.hideObj2").slideDown();
        $(this).hide(); // .attr()
        return false;
    });

    $('.heart').mouseover(function() {
        $(this).find('i').removeClass('fa-heart-o').addClass('fa-heart');
    }).mouseout(function() {
        $(this).find('i').removeClass('fa-heart').addClass('fa-heart-o');
    });

    function sdf_FTS(_number, _decimal, _separator) {
        var decimal   = (typeof(_decimal) != 'undefined') ? _decimal : 2;
        var separator = (typeof(_separator) != 'undefined') ? _separator : '';
        var r         = parseFloat(_number);
        var exp10     = Math.pow(10, decimal);
        r             = Math.round(r * exp10) / exp10;
        rr            = Number(r).toFixed(decimal).toString().split('.');
        b             = rr[0].replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, "\$1" + separator);
        r             = (rr[1] ? b + '.' + rr[1] : b);

        return r;
    }

    setTimeout(function() {
        $('#counter').text('0');
        $('#counter1').text('0');
        $('#counter2').text('0');

        setInterval(function() {
            var curval  = parseInt($('#counter').text());
            var curval1 = parseInt($('#counter1').text().replace(' ', ''));
            var curval2 = parseInt($('#counter2').text());
            if (curval <= 707) {
                $('#counter').text(curval + 1);
            }
            if (curval1 <= 12280) {
                $('#counter1').text(sdf_FTS((curval1 + 20), 0, ' '));
            }
            if (curval2 <= 245) {
                $('#counter2').text(curval2 + 1);
            }
        }, 2);
    }, 500);
}


$(function() {
    const $screen = $('.my-phones-screen');
    const $text1 = $('.my-text_1');
    const $text2 = $('.my-text_2');

    $('.my-arrow_left').on('click', function() {
        turn(false);
    });

    $('.my-arrow_right').on('click', function() {
        turn(true);
    });

    function turn(isNext) {
        $screen.addClass('my-phones-screen_away');
        $text1.toggleClass('my-text_active');
        $text2.toggleClass('my-text_active');

        setTimeout(function() {
            $screen.removeClass('my-phones-screen_away');
        }, 400);
    }
});
