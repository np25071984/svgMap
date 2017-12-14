var SvgMap = function (options) {

    var svg;
    var type;
    var toolTip;
    var toolTipOptions;

    var showTip;

    var onClick;
    var onOver;
    var onOut;

    var box = {
        x: 0,
        y: 0,
        height: 0,
        width: 0
    };

    var root = this;

    /*
     * Constructor
     */
    this.construct = function (options) {

        ['id', 'type', 'data'].forEach(function (param) {
            if (typeof options[param] === 'undefined') {
                throw new Error(param + ' parameter is missed');
            }
        });
        root.svg = $('#' + options.svgId).get(0);
        root.type = options.type;

        toolTipOptions = options.toolTipOptions;
        toolTip = $('#' + toolTipOptions.id);

        root.toolTip = toolTip.get(0);

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
            path.addEventListener('click', mouseClick);
            svg.appendChild(path);
        });
        adaptViewBox(svg);
    };

    var mouseMove = function (e) {
        var pos = this.getBoundingClientRect();

        var left = pos.left - toolTipOptions.position.x;
        var top = pos.top - toolTipOptions.position.y;

        toolTip.css({display: 'block', left: left + 'px', top: top + 'px'});
    };

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

    var mouseClick = function () {
        if (root.onClick) {
            root.onClick($(this));
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

        svg.setAttribute('viewBox', root.box.x + ' ' + root.box.y + ' ' + root.box.width + ' ' + root.box.height);
    };

    /*
     * Pass options when class instantiated
     */
    this.construct(options);
};
