jQuery.fn.nggSlideshow = function(args) {
    var defaults = {
        id: 1,
        width: 320,
        height: 240,
        fx: 'fade',
        domain: '',
        timeout: 5000
    };
    var s = jQuery.extend({}, defaults, args);
    var obj = this.selector;
    var stack = [];
    var url = s.domain + 'index.php?callback=json&api_key=true&format=json&method=gallery&id=' + s.id;
    var stackLength = 0;
    jQuery.getJSON(url, function(r) {
        if (r.stat == "ok") {
            for (img in r.images) {
                var photo = r.images[img];
                stack.push(decodeURI(photo['imageURL']))
            }
            stackLength = stack.length;
            loadImage(1)
        }
    });

    function loadImage(num) {
        if (stackLength > 0 && num <= 3) {
            var img = new Image();
            img.src = stack.shift();
            stackLength--;
            jQuery(img).one('load', function() {
                appendImage(img, num)
            }).each(function() {
                if (this.complete) jQuery(this).trigger('load')
            })
        }
    }

    function appendImage(img, num) {
        jQuery(img).hide();
        jQuery(obj).append(imageResize(img, s.width, s.height));
        if (num == 3 || stackLength == 0) {
            startSlideshow()
        } else {
            loadImage(++num)
        }
    }

    function startSlideshow() {
        jQuery(obj + '-loader').empty().remove();
        jQuery(obj + ' img:first').fadeIn(1000, function() {
            jQuery(obj).cycle({
                fx: s.fx,
                containerResize: 1,
                fit: 1,
                timeout: s.timeout,
                next: obj,
                before: jCycle_onBefore
            })
        })
    }

    function imageResize(img, maxWidth, maxHeight) {
        if (!img.complete) jQuery(img).bind('load', function() {
            imageResize(img, maxWidth, maxHeight)
        });
        if (img.height == 0 || img.width == 0) return img;
        var width, height;
        if (img.width * maxHeight > img.height * maxWidth) {
            if (img.width > maxWidth) {
                width = maxWidth;
                height = Math.round(img.height / img.width * maxWidth)
            }
        } else {
            if (img.height > maxHeight) {
                height = maxHeight;
                width = Math.round(img.width / img.height * maxHeight)
            }
        }
        jQuery(img).css({
            'height': height,
            'width': width
        });
        return img
    };

    function jCycle_onBefore(curr, next, opts) {
        if (opts.addSlide)
            if (stackLength > 0) {
                var img = new Image();
                img.src = stack.shift();
                stackLength--;
                jQuery(img).bind('load', function() {
                    opts.addSlide(imageResize(this, s.width, s.height))
                })
            }
    }
}