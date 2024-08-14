(function($) {
    jQuery.fn.reverse = Array.prototype.reverse;

    var config = {},
        aux = {
            setup: function($thumbs) {
                aux.saveInitialPosition($thumbs);
                // set the thumbs to absolute and assign top & left
                $thumbs.each(function(i) {
                    var $item = $(this),
                        set = Math.ceil((i + 1) / config.thumbsCount);

                    $item.css({
                        position: 'absolute',
                        left: $item.data('left') + 'px',
                        top: (i < config.thumbsCount && config.thumbsNav) ? $item.data('top') + 'px' : $item.data('height') + 95 + 'px'
                    }).addClass('cr-set-' + set).data('set', set);

                });

                if (jQuery(window).width() >= 980) {
                    config.thumbsNav = true;
                } else {
                    config.thumbsNav = false;
                }

                jQuery(window).resize(function() {

                    if (jQuery(window).width() >= 980) {
                        config.thumbsNav = true;
                    } else {
                        config.thumbsNav = false;
                    }
                });
            },
            // saves the initial left / top and height of each thumb
            saveInitialPosition: function($thumbs) {
                $thumbs.each(function(i) {
                    var $item = $(this);

                    $item.data({
                        left: $item.position().left,
                        top: $item.position().top,
                        height: $item.height()
                    });
                });
            },
            // used when the thumbs are shown, and we click next / previous
            navigateThumbs: function($el, dir) {
                // maximum possible set
                var maxSet = Math.ceil((config.totalThumbs) / config.thumbsCount);
                // hide current set of thumbs
                $el.find('div.cr-set-' + config.currentSet).each(function(i) {
                    $(this).stop().animate({
                        top: $(this).height() + 95 + 'px'
                    }, 100, function() {
                        if (i === 0) {
                            // show next set of thumbs
                            if (dir === 1) {
                                config.currentSet++;
                            } else {
                                config.currentSet--;
                            }

                            // circular movement
                            if (config.currentSet < 1)
                                config.currentSet = maxSet;
                            else if (config.currentSet > maxSet)
                                config.currentSet = 1;

                            // next thumbs to show
                            var $nextItems = $el.find('div.cr-set-' + config.currentSet);

                            // the animation effect will be different if we click the "previous" button
                            if (dir === -1)
                                $nextItems = $nextItems.reverse();

                            $nextItems.each(function(i) {
                                var $item = $(this);

                                setTimeout(function() {

                                    $item.stop().animate({
                                        top: '14px'
                                    }, 150);

                                }, 50 * i);
                            });
                        }
                    });
                });
            },
            // used when the thumbs are hidden, and we click next / previous
            navigateContent: function($thumbs, $contentItems, dir) {
                if (dir === 1) {
                    config.current++;
                } else {
                    config.current--;
                }

                // circular movement
                if (config.current === config.totalThumbs)
                    config.current = 0;
                else if (config.current < 0)
                    config.current = config.totalThumbs - 1;

                var $item = $thumbs.eq(config.current),
                    set = $item.data('set');

                config.currentSet = set;

                aux.selectItem($item, $thumbs, $contentItems);
            },
            // triggered when clicking a thumb
            selectItem: function($thumb, $thumbs, $contentItems) {
                $thumb.siblings().removeClass('cr-selected').end().addClass('cr-selected');
                $contentItems.hide();
                var $item = $('#' + $thumb.data('content'));

                $item.show();

                config.current = $thumb.index();
                aux.toggleText($thumbs);
            },
            // shows / hides the main text of each content item
            toggleText: function($thumbs) {

                var $thumb = $thumbs.eq(config.current),
                    $contentItem = $('#' + $thumb.data('content')),
                    $itemHeadline = $contentItem.find('div.cr-content-headline'),
                    $itemText = $contentItem.find('div.cr-content-text');

                $itemText.hide();

                if (!config.thumbsNav) {
                    var somemargin = 30;
                } else {
                    $itemText.hide();
                    $thumbs.parent().show();
                }
            },
            // slideshow function (recursive)
            slideshow: function($el, $thumbs, $contentItems, opts) {
                if (config.slideshow) {

                    if (!config.thumbsNav)
                        aux.navigateContent($thumbs, $contentItems, 1);
                    else {
                        var idx = config.current + 1;
                        if (config.current === config.totalThumbs - 1)
                            idx = 0;

                        var $item = $thumbs.eq(idx),
                            set = $item.data('set');

                        if (config.slideshowCursor !== set) {
                            config.slideshowCursor = set;
                            aux.navigateThumbs($el, 1);
                        }

                        aux.selectItem($item, $thumbs, $contentItems);
                    }
                    clearTimeout(config.slideshow_time);

                    config.slideshow_time = setTimeout(function() {
                        aux.slideshow($el, $thumbs, $contentItems, opts);
                    }, opts.slideshow_interval);
                }
            },
            // show / hide thumbs
            toggleThumbs: function($el, $thumbs, $navNext, $navPrev, dir, speed) {
                var navCSS, thumbsCSS;

                if (dir === 1) {
                    config.thumbsNav = true;
                    navCSS = {
                        bottom: '55px'
                    };
                    thumbsCSS = {
                        height: '130px'
                    };
                } else {
                    config.thumbsNav = false;
                    navCSS = {
                        bottom: config.elH / 2 + 'px'
                    };
                    thumbsCSS = {
                        height: '1px'
                    };
                }

                $navNext.stop().animate(navCSS, speed);
                $navPrev.stop().animate(navCSS, speed);

                $el.find('div.cr-set-' + config.currentSet).stop().parent().animate(thumbsCSS, speed, function() {
                    if (dir === -1)
                        $thumbs.parent().hide();
                });

                // if hiding the thumbs show current's text otherwise hide it
                aux.toggleText($thumbs);
            }
        },
        methods = {
            init: function(options) {

                if (this.length) {

                    var settings = {
                        // slideshow on
                        autoplay: false,
                        // slideshow interval
                        slideshow_interval: 3000,
                        // if true the thumbs will be show initially
                        openThumbs: true,
                        // speed that the thumbs are shown / hidden
                        toggleThumbsSpeed: 300
                    };

                    return this.each(function() {

                        // if options exist, lets merge them with our default settings
                        if (options) {
                            $.extend(settings, options);
                        }

                        var $el = $(this),
                            // the thumb elements
                            $thumbs = $el.find('div.cr-thumbs > div').show(),
                            // the main content elements
                            $contentItems = $el.find('div.cr-content-wrapper > div'),
                            $more = $contentItems.find('a.cr-more-link');

                        /*
                         * save some values in the config variable
                         */
                        // index of the current item 
                        config.current = 0;
                        // thumbsNav indicates if we are currently navigating the thumbs or the main content items 
                        // (if the thumbs are shown or not)
                        if (settings.openThumbs) {
                            config.thumbsNav = true;
                        } else {
                            config.thumbsNav = false;
                        }

                        // current set of thumbs being shown:
                        // first 4 thumbs will have set = 1
                        // next 4 set = 2 and so on
                        config.currentSet = 1;
                        // total number of thumbs
                        config.totalThumbs = $thumbs.length;
                        // the height of a thumb. We will need this later
                        config.thumbH = $thumbs.height();
                        // the height of the main container. We will need this later
                        config.elH = $el.height();
                        // indicates if the slideshow is on.
                        config.slideshow = settings.autoplay;

                        config.thumbsCount = settings.thumbsCount;

                        // add "hide thumbs" or "show thumbs" button to the DOM
                        var thumbsClass;
                        if (config.thumbsNav) {
                            thumbsClass = 'cr-hide';
                        } else {
                            thumbsClass = 'cr-show';
                        }
                        var $toggleThumbs = $('<span/>').addClass(thumbsClass).appendTo($el);

                        // add navigation buttons
                        var $navigation = $('<div class="cr-nav"><span class="cr-nav-prev">Previous</span><span class="cr-nav-next">Next</span></div>').appendTo($el),
                            $navNext = $el.find('span.cr-nav-next'),
                            $navPrev = $el.find('span.cr-nav-prev'),
                            navCSS;

                        // the navigation buttons will change the position depending on config.thumbsNav
                        if (config.thumbsNav) {
                            navCSS = {
                                bottom: '55px'
                            };
                        } else {
                            navCSS = {
                                bottom: config.elH / 2 + 'px'
                            };
                        }

                        $navNext.css(navCSS);
                        $navPrev.css(navCSS);

                        // setup. Organize the thumbs.. 
                        aux.setup($thumbs);

                        // if we don't want the thumbs to be shown,
                        // then show the text of the current item
                        if (!settings.openThumbs) {
                            $thumbs.parent().hide();
                            aux.toggleText($thumbs);
                        }

                        // navigation events
                        $navNext.bind('click.crotator', function(e) {
                            if ($thumbs.is(':animated')) return false;
                            config.slideshow = false;
                            if (config.thumbsNav) {
                                aux.navigateThumbs($el, 1);
                            } else {
                                aux.navigateContent($thumbs, $contentItems, 1);
                            }
                        });
                        $navPrev.bind('click.crotator', function(e) {
                            if ($thumbs.is(':animated')) return false;
                            config.slideshow = false;
                            if (config.thumbsNav) {
                                aux.navigateThumbs($el, -1);
                            } else {
                                aux.navigateContent($thumbs, $contentItems, -1);
                            }
                        });

                        // thumb click event
                        $thumbs.bind('click.crotator', function(e) {
                            config.slideshow = false;
                            aux.selectItem($(this), $thumbs, $contentItems);
                        });

                        // show / hide thumbs event
                        $toggleThumbs.bind('click.crotator', function(e) {
                            config.slideshow = false;
                            if (config.thumbsNav) {
                                $(this).removeClass('cr-hide').addClass('cr-show');
                                aux.toggleThumbs($el, $thumbs, $navNext, $navPrev, -1, settings.toggleThumbsSpeed);
                            } else {
                                $(this).removeClass('cr-show').addClass('cr-hide');
                                aux.toggleThumbs($el, $thumbs, $navNext, $navPrev, 1, settings.toggleThumbsSpeed);
                            }
                        });

                        // cliking more hides the thumbs to reveal the text
                        $more.bind('click.crotator', function(e) {
                            if (config.thumbsNav) {
                                $toggleThumbs.click();
                            }
                        });

                        // slideshow
                        if (settings.autoplay) {
                            config.slideshowCursor = 1;

                            config.slideshow_time = setTimeout(function() {
                                aux.slideshow($el, $thumbs, $contentItems, settings);
                            }, settings.slideshow_interval);
                        }

                    });
                }
            }
        };

    $.fn.crotator = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.crotator');
        }
    };

})(jQuery);



jQuery(document).ready(function() {
    "use strict";


});