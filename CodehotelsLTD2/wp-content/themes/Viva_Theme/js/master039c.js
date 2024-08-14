// On window load. This waits until images have loaded which is essential
/*global jQuery:false, my_ajax:false, on_resize:false */
/*jshint unused:false */
jQuery(window).load(function() {
    "use strict";

    // Wrap Contact form 7 with <p> tags
    //jQuery('.wpcf7-submit').wrap('<p class="form-submit" />');

    // Add 'thickbox' class to linked images
    jQuery(".content a:not(.no_thickbox) img").parent("a").addClass("thickbox");

    // Remove 'thickbox' class from blog iamges
    jQuery("#lang_sel_list img, .content .entry-image a img, .content .tribe-events-event-image a img").parent("a").removeClass("thickbox");
    jQuery(".wrapper a .no_thickbox").parent("a").removeClass("thickbox");

    jQuery("#commentform .comment-form-comment #comment").addClass('span6');

    jQuery("#commentform #submit").addClass('btn btn-primary');

    /******************************/
    jQuery(".widget_wysija input[type=text]").addClass("span12");
    jQuery(".widget_wysija .wysija-submit-field").addClass("span7 btn btn-primary");

});

// debulked onresize handler

function on_resize(c, t) {
    "use strict";

    var onresize = function() {
        clearTimeout(t);
        t = setTimeout(c, 100);
    };
    return c;
}


function clearInput(input, inputValue) {
    "use strict";

    if (input.value === inputValue) {
        input.value = '';
    }
}

(function($) {
    "use strict";
    $(function() {
        $('.offers_carousel').jcarousel();

        $('.jcarousel-control-prev')
            .on('active.jcarouselcontrol', function() {
                $(this).removeClass('inactive');
            })
            .on('inactive.jcarouselcontrol', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .on('active.jcarouselcontrol', function() {
                $(this).removeClass('inactive');
            })
            .on('inactive.jcarouselcontrol', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });

    });
})(jQuery);


jQuery(document).ready(function() {
    "use strict";

    if (jQuery(window).width() >= 997) {
        jQuery('.sb-icon-search').click(function(el) {
            if (!jQuery('.sb-search').hasClass('sb-search-open')) {
                jQuery('.sb-search').addClass('sb-search-open');
                jQuery('.sb-search-input').focus();
                el.preventDefault();

            } else if (jQuery('.sb-search').hasClass('sb-search-open') && jQuery('.sb-search-input').val() === '') {
                jQuery('.sb-search').removeClass('sb-search-open');
                jQuery('.sb-search-input').blur();
                el.preventDefault();

            } else if (jQuery('.sb-search').hasClass('sb-search-open') && jQuery('.sb-search-input').val() !== '') {
                jQuery('.sb-search form').submit();
            }
        });
    }

    if (jQuery(window).width() <= 997) {
        jQuery('.sb-search').addClass('sb-search-open');
    }

    var $head = jQuery('.fixed_header .header #header_container_class');
    //jQuery( '.fixed_header .header #header_container_class' ).each( function(i) {
    var $el = jQuery(this),
        $logo = $head.find('.logo img'),
        $logoH = $logo.height();
    console.log(jQuery('body').outerHeight(), jQuery(window).outerHeight());
    if ((jQuery('body').outerHeight() - 190) > jQuery(window).outerHeight()) {
        jQuery('.fixed_header .header #header_container_class').waypoint(function(direction) {
            if (jQuery(window).width() >= 997) {
                if (direction === 'down') {
                    $head.find('.nav').addClass('simple-menu');

                    $head.css({
                        position: 'fixed'
                    });

                    $head.css({
                        height: '55px',
                        lineHeight: '55px'
                    });

                    jQuery('.header .navbar .nav').css({
                        marginTop: '0'
                    });
                    jQuery('.fixed_header .header .navbar-inner').css({
                        lineHeight: '55px'
                    });
                    //$logo.width('38%');

                    if (jQuery('body').hasClass('admin-bar')) {
                        jQuery('.fixed_header.admin-bar .header #header_container_class').css({
                            top: '28px'
                        });
                    } else {
                        jQuery('.fixed_header .header #header_container_class').css({
                            top: '0'
                        });
                    }
                } else if (direction === 'up') {
                    $head.css({
                        height: '110px',
                        lineHeight: '110px',
                        position: 'relative'
                    });

                    jQuery('.header .navbar .nav').css({
                        marginTop: '27.5px'
                    });
                    jQuery('.fixed_header .header .navbar-inner').css({
                        lineHeight: '110px'
                    });
                    //$logo.removeAttr('style');
                    jQuery('.fixed_header.admin-bar .header #header_container_class').css({
                        top: '0'
                    });

                    $head.find('.nav').removeClass('simple-menu');
                }
            }
        }, {
            offset: -15
        });
    }

    //});

    on_resize(function() {
        jQuery('.rev_slider_wrapper').height('auto');
    }, 100);

    jQuery(".widget_wysija input[type=text]").addClass("span12");
    jQuery(".widget_wysija .wysija-submit-field").addClass("span7 btn btn-primary");

    jQuery('.menu-primary-menu-container .dropdown').hover(function() {
        jQuery(this).find('.dropdown-menu').first().stop(true, true).slideDown('fast');
    }, function() {
        jQuery(this).find('.dropdown-menu').first().stop(true, true).slideUp('fast');
    });

    jQuery(".offer-text p").dotdotdot({
        watch: true,
        height: 100
    });

    /* Carousel */
    jQuery('#head_carousel').carousel({
        interval: 9000
    });

    /* Merge gallery */
    jQuery('.merge-gallery div').mouseenter(function() {
        jQuery(this).find('.gallery-caption').animate({
            bottom: jQuery(this).find('img').height()
        }, 250);
    }).mouseleave(function() {
        jQuery(this).find('.gallery-caption').animate({
            bottom: jQuery(this).find('img').height() + 150
        }, 250);
    });

    // Social icons hover effect
    jQuery(".social_links li a, .social a img").mouseenter(function() {
        var social = this;
        jQuery(social).animate({
            opacity: "0.5"
        }, 250, function() {
            jQuery(social).animate({
                opacity: "1.0"
            }, 100);
        });
    });

    // Footer contact form - send
    jQuery("#contact_form").submit(function() {
        jQuery("#contact_form").parent().find("#error, #success").hide();
        var str = jQuery(this).serialize();
        jQuery.ajax({
            type: "POST",
            url: my_ajax.ajaxurl,
            data: 'action=contact_form&' + str,
            success: function(msg) {
                if (msg === 'sent') {
                    jQuery("#contact_form").parent().find("#success").fadeIn("slow");
                } else {
                    jQuery("#contact_form").parent().find("#error").fadeIn("slow");
                }
            }
        });
        return false;
    });

    jQuery('.image_overlay_effect').hover(function() {
        jQuery(this).stop().animate({
            "opacity": 0.9
        });
    }, function() {
        jQuery(this).stop().animate({
            "opacity": 0
        });
    });
});

(function($) {
    "use strict";

    jQuery.fn.vh_waypoints = function(options_passed) {
        var defaults = {
                offset: 'bottom-in-view',
                triggerOnce: true
            },
            options = jQuery.extend({}, defaults, options_passed);
        return this.each(function() {
            var element = jQuery(this);
            setTimeout(function() {
                element.waypoint(function(direction) {
                    jQuery(this).addClass('vh_start_animation').trigger('vh_start_animation');
                }, options);
            }, 100);
        });
    };

    function activate_waypoints(container) {
        if (jQuery.fn.vh_waypoints) {
            if (typeof container === 'undefined') {
                container = 'body';
            }
            jQuery('.vh_animate_when_almost_visible', container).vh_waypoints({
                offset: '80%'
            });
        }
    }

    jQuery.fn.vh_accommodation_wrapper = function(options) {
        return this.each(function() {
            var container = jQuery(this),
                elements = container.find('.accommodation-image');

            container.on('vh_start_animation', function() {
                elements.each(function(i) {
                    var element = jQuery(this);
                    setTimeout(function() {
                        element.addClass('vh_start_animation');
                    }, (i * 150));
                });
            });
        });
    };

    jQuery.fn.vh_entry_wrapper = function(options) {
        return this.each(function() {
            var container = jQuery(this),
                elements = container.find('.entry-image');

            container.on('vh_start_animation', function() {
                elements.each(function(i) {
                    var element = jQuery(this);
                    setTimeout(function() {
                        element.addClass('vh_start_animation');
                    }, (i * 150));
                });
            });
        });
    };

    jQuery.fn.vh_offers_wrapper = function(options) {
        return this.each(function() {
            var container = jQuery(this),
                elements = container.find('.offer-image');

            container.on('vh_start_animation', function() {
                elements.each(function(i) {
                    var element = jQuery(this);
                    setTimeout(function() {
                        element.addClass('vh_start_animation');
                    }, (i * 150));
                });
            });
        });
    };

    function activate_waypoints_containers(container) {
        if (typeof container === 'undefined') {
            container = 'body';
        }
        activate_waypoints(container);

        if (jQuery.fn.vh_accommodation_wrapper) {
            jQuery('.accommodation-wrapper', container).vh_accommodation_wrapper();
        }
        if (jQuery.fn.vh_entry_wrapper) {
            jQuery('.main-content', container).vh_entry_wrapper();
        }
        if (jQuery.fn.vh_entry_wrapper) {
            jQuery('.main-inner', container).vh_offers_wrapper();
        }
    }

    jQuery(document).ready(function() {
        activate_waypoints_containers();
    });

    // backgroundPosition[X,Y] get hooks
    var $div = $('<div style="background-position: 3px 5px">');
    $.support.backgroundPosition = $div.css('backgroundPosition') === "3px 5px" ? true : false;
    $.support.backgroundPositionXY = $div.css('backgroundPositionX') === "3px" ? true : false;
    $div = null;

    var xy = ["X", "Y"];

    // helper function to parse out the X and Y values from backgroundPosition
    function parseBgPos(bgPos) {
        var parts = bgPos.split(/\s/),
            values = {
                "X": parts[0],
                "Y": parts[1]
            };
        return values;
    }

    if (!$.support.backgroundPosition && $.support.backgroundPositionXY) {
        $.cssHooks.backgroundPosition = {
            get: function(elem, computed, extra) {
                extra = extra;
                return $.map(xy, function(l, i) {
                    i = i;
                    return $.css(elem, "backgroundPosition" + l);
                }).join(" ");
            },
            set: function(elem, value) {
                $.each(xy, function(i, l) {
                    var values = parseBgPos(value);
                    elem.style["backgroundPosition" + l] = values[l];
                });
            }
        };
    }

    if ($.support.backgroundPosition && !$.support.backgroundPositionXY) {
        $.each(xy, function(i, l) {
            $.cssHooks["backgroundPosition" + l] = {
                get: function(elem, computed, extra) {
                    extra = extra;
                    var values = parseBgPos($.css(elem, "backgroundPosition"));
                    return values[l];
                },
                set: function(elem, value) {
                    var values = parseBgPos($.css(elem, "backgroundPosition")),
                        isX = l === "X";
                    elem.style.backgroundPosition = (isX ? value : values["{X}"]) + " " +
                        (isX ? values["{Y}"] : value);
                }
            };
            $.fx.step["backgroundPosition" + l] = function(fx) {
                $.cssHooks["backgroundPosition" + l].set(fx.elem, fx.now + fx.unit);
            };
        });
    }
})(jQuery);