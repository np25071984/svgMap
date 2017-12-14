var SvgMap = function (options) {

    const STATE_INITIAL = 1;
    const STATE_CLICK = 2;
    const STATE_DRAG = 3;

    var svg;
    var type;
    var toolTip;

    var showTip;

    var onClick;
    var onOver;
    var onOut;

    var box;

    var state;

    var root = this;

    /**
     * Constructor
     *
     * @param array
     */
    this.construct = function (options) {

        ['id', 'type', 'data'].forEach(function (param) {
            if (typeof options[param] === 'undefined') {
                throw new Error(param + ' parameter is missed');
            }
        });

        root.svg = $('#mapSVG_' + options.id).get(0);
        root.type = options.type;
        root.toolTip = $('#tooltip_' + options.id).get(0);

        if (options.showTip === false) {
            root.showTip = false;
        } else {
            root.showTip = true;
        }

        ['onClick', 'onOver', 'onOut'].forEach(function (param) {
            if (typeof options[param] === 'function') {
                root[param] = options[param];
            }
        });

        var json = {};
        if (root.type === 'json') {
            json = options.data;
        } else {
            $.ajax({
                url: options.data,
                method: 'GET'
            }).then(function (data) {
                json = data;
            });
        }

        if (validateJson(json)) {
            draw(root.svg, json);
        }
    };

    var validateJson = function (json) {
        /**
         * Even only one valid 'd' element is enough
         */
        for (var key in json) {
            if (typeof json[key]['d'] !== 'undefined') {
                // TODO: path validation
                return true;
            }
        }
        return false;
    };

    /*
     * Draws the paths from array
     */
    var draw = function (svg, data) {
        $.each(data, function (index, value) {
            var path = document.createElementNS('http://www.w3.org/2000/svg', "path");
            $.each(value, function (key, value) {
                path.setAttributeNS(null, key, value);
            });
            path.addEventListener("mousemove", mouseMove);
            path.addEventListener("mouseover", mouseOver);
            path.addEventListener("mouseout", mouseOut);
            path.addEventListener("mousedown", mouseDown);
            path.addEventListener("mouseup", mouseUp);
            svg.appendChild(path);
        });
        svg.addEventListener("wheel", mouseWheel);

        $('.tools > DIV').get(0).addEventListener('click', zoomIn);
        $('.tools > DIV').get(1).addEventListener('click', zoomReset);
        $('.tools > DIV').get(2).addEventListener('click', zoomOut);

        adaptViewBox(svg);
    };

    var mouseDown = function () {
        root.state = STATE_CLICK;
    }

    var mouseUp = function () {
        if (root.state == STATE_CLICK) {
            if (root.onClick) {
                root.onClick($(this));
            }
        }

        root.state = STATE_INITIAL;
        root.toolTip.style.visibility = 'visible';
    }

    var mouseMove = function (e) {
        switch(root.state) {
            case STATE_INITIAL:
                root.toolTip.style.left = e.offsetX + 'px';
                root.toolTip.style.bottom = e.offsetY + 'px';
                break;
            case STATE_CLICK:
                root.state = STATE_DRAG;
            case STATE_DRAG:
                root.toolTip.style.visibility = 'hidden';
                var box = root.box;
                box.x = box.x - e.movementX * 10;
                box.y = box.y + e.movementY * 10;
                root.svg.setAttribute('viewBox', box.x+' '+box.y+' '+box.width+' '+box.height);
                root.mapShifted = true;
                break;
        }
    };

    var zoomIn = function () {
        var box = root.box;
        var dS = (box.width + box.height)/2 * 0.05;
        box.x = box.x + dS;
        box.width = box.width - dS  * 2;
        box.y = box.y + dS;
        box.height = box.height - dS * 2;
        if (box.width < 0) {
            return false;
        }
        if (box.height < 0) {
            return false;
        }
        root.svg.setAttribute('viewBox', box.x+' '+box.y+' '+box.width+' '+box.height);
    };

    var zoomReset = function () {
        adaptViewBox(root.svg);
    };

    var zoomOut = function () {
        var box = root.box;
        var dS = (box.width + box.height)/2 * 0.05;
        box.x = box.x - dS;
        box.width = box.width + dS * 2;
        box.y = box.y - dS;
        box.height = box.height + dS * 2;
        if (box.width < 0) {
            return false;
        }
        if (box.height < 0) {
            return false;
        }
        root.svg.setAttribute('viewBox', box.x+' '+box.y+' '+box.width+' '+box.height);
    };

    var mouseWheel = function (e) {
        e.preventDefault();

        // TODO: is box an alias to root.box?
        var box = root.box;
        var parentDivBox = root.svg.parentNode.getBoundingClientRect();
        var xShift = 0;
        var уShift = 0;
        var dS = (box.width + box.height)/2 * 0.05;

        if (parentDivBox.width/2 > e.layerX) {
            xShift = -1 * dS;
        } else {
            xShift = 1 * dS;
        }

        if (parentDivBox.height/2 > e.layerY) {
            yShift = 1 * dS;
        } else {
            yShift = -1 * dS;
        }


        if (e.deltaY > 0) {
            box.x = box.x + dS + xShift;
            box.width = box.width - dS  * 2;
            box.y = box.y + dS + yShift;
            box.height = box.height - dS * 2;
        } else {
            box.x = box.x - dS - xShift;
            box.width = box.width + dS * 2;
            box.y = box.y - dS - yShift;
            box.height = box.height + dS * 2;
        }
        if (box.width < 0) {
            return false;
        }
        if (box.height < 0) {
            return false;
        }
        root.svg.setAttribute('viewBox', box.x+' '+box.y+' '+box.width+' '+box.height);
    }

    var mouseOver = function (e) {
        if (root.showTip) {
            root.toolTip.style.visibility = "visible";
            root.toolTip.style.opacity = ".9";
            root.toolTip.style.transition = "opacity 0.3s linear";
            var toolText = createToolTipContext($(this));
            if (!toolText) {
                toolText = "'title' isn't defined for this path";
            }
            root.toolTip.innerHTML = toolText;
        }
        if (root.onOver) {
            root.onOver($(this));
        }
    };

    var mouseOut = function () {
        if (root.showTip) {
            root.toolTip.style.visibility = "hidden";
            root.toolTip.style.opacity = "0";
            root.toolTip.innerHTML = $(this).attr('');
        }
        if (root.onOut) {
            root.onOut($(this));
        }
    };

    var createToolTipContext = function (path) {
        if (typeof path.attr('title') === 'undefined') {
            return false;
        } else {
            return path.attr('title');
        }
    };

    /*
     * Adapts dimension of SVG according it paths
     */
    var adaptViewBox = function (svg) {
        root.box = svg.getBBox();

        // TODO: why svg is turned upside down?!
        svg.setAttribute('transform', 'scale(1, -1)');

        svg.setAttribute('viewBox', root.box.x + ' ' + root.box.y + ' ' + root.box.width + ' ' + root.box.height);
        root.state = STATE_INITIAL;
    };

    /*
     * Pass options when class instantiated
     */
    this.construct(options);

};

