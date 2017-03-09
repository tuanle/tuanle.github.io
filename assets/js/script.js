var getScrollOffsets = function() {
    var doc = document, w = window, x, y, docEl;

    if ( typeof w.pageYOffset === 'number' ) {
        x = w.pageXOffset;
        y = w.pageYOffset;
    } else {
        docEl = (doc.compatMode && doc.compatMode === 'CSS1Compat') ?  doc.documentElement : doc.body;
        x = docEl.scrollLeft;
        y = docEl.scrollTop;
    }

    return {x: x, y: y};
}

Mousetrap.bind('left', function() {
    window.history.back();
    return false;
});

Mousetrap.bind('right', function() {
    window.history.forward();
    return false;
});

Mousetrap.bind('up', function() {
    window.location = '/';
    return false;
});

Mousetrap.bind('down', function() {
    var category = document.getElementById('page-category');
    if (category) {
        window.location = category.href;
    }
    return false;
});

Mousetrap.bind('g g', function() {
    window.scrollTo(0, 0);
    return false;
});

Mousetrap.bind('G', function() {
    window.scrollTo(0, document.body.scrollHeight);
    return false;
});

Mousetrap.bind('j', function() {
	var off = getScrollOffsets();
    var y = (off.y + 16) > document.body.scrollHeight ? document.body.scrollHeight : (off.y + 16)
    window.scrollTo(0, y);
    return false;
});

Mousetrap.bind('k', function() {
	var off = getScrollOffsets();
    var y = (off.y - 16) < 0 ? 0 : (off.y - 16)
    window.scrollTo(0, y);
    return false;
});

Mousetrap.bind('J', function() {
    var next = document.getElementById('next');
    if (next) {
        window.location = next.href;
    }
    return false;
});

Mousetrap.bind('K', function() {
    var prev = document.getElementById('prev');
    if (prev) {
        window.location = prev.href;
    }
    return false;
});
