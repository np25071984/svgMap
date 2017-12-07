var SvgMap = function(options) {

    var svg;
    var type;
    var toolTip;

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
    this.construct = function(options){

        ['id','type','data'].forEach(function (param) {
            if(typeof options[param] === 'undefined') {
                throw new Error(param + ' parameter is missed');
            }
        });

        root.svg = $('#mapSVG'+options.id).get(0);
        root.type = options.type;
        root.toolTip = $('#tooltip'+options.id).get(0);

        ['onClick','onOver','onOut'].forEach(function (param) {
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
            }).then(function(data) {
                json = data;
            });
        }

        if (validateJson(json)) {
            draw(root.svg, json);
        }
    };

    var validateJson = function(json) {
        // TODO: add validation for id, title and d keys
        return true;
    }

    /*
     * Draws the paths from array
     */
    var draw = function(svg, data) {
        $.each(data, function( index, value) {
            var path = document.createElementNS('http://www.w3.org/2000/svg',"path");
            $.each(value, function( key, value) {
                path.setAttributeNS( null, key, value);
            });
            path.addEventListener("mousemove", mouseMove);
            path.addEventListener("mouseover", mouseOver);
            path.addEventListener("mouseout", mouseOut);
            path.addEventListener('click', mouseClick);
            svg.appendChild(path);
        });
        adaptViewBox(svg);
    };

    var mouseMove = function(e) {
        root.toolTip.style.left = e.offsetX + 'px';
        root.toolTip.style.bottom = e.offsetY + 'px';
    }

    var mouseOver = function(e) {
        root.toolTip.style.visibility = "visible";
        root.toolTip.innerHTML = createToolTipContext($(this));
    }

    var mouseOut = function() {
        root.toolTip.style.visibility = "hidden";
        root.toolTip.innerHTML = $(this).attr('');
    }

    var mouseClick = function() {
        if (root.onClick) {
            root.onClick($(this));
        }
        //alert($(this).attr('id') + '-' + $(this).attr('title'));
    }

    var createToolTipContext = function(path) {
        return path.attr('title');
    }

    /*
     * Adapts dimension of SVG according it paths
     */
    var adaptViewBox = function(svg) {
        root.box = svg.getBBox();

        // TODO: why svg is turned upside down?!
        svg.setAttribute('transform', 'scale(1, -1)');

        svg.setAttribute('viewBox', root.box.x+' '+root.box.y+' '+root.box.width+' '+root.box.height);
    };

    /*
     * Pass options when class instantiated
     */
    this.construct(options);

};

