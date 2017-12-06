var SvgMap = function(options) {

    var svg;
    var type;
    var toolTip;
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

        var json = {};
        if (root.type === 'json') {
            json = options.data;
        } else {
            $.ajax({
                url: options.data,
                method: 'GET'
            }).then(function(data) {
                console.log(data);
            });
        }

        draw(root.svg, json);
    };

    /*
     * Draws the paths from array
     */
    var draw = function(svg, states) {
        $.each(states, function( index, value ) {
            var path = document.createElementNS('http://www.w3.org/2000/svg',"path");
            path.setAttributeNS( null, "id", value.id);
            path.setAttributeNS( null, "d", value.d);
            path.setAttributeNS( null, "name", value.name);
            svg.appendChild(path);
            path.addEventListener("mouseover", mouseOver);
            path.addEventListener("mouseout", mouseOut);
            path.addEventListener('click', mouseClick);
        });
        adaptViewBox(svg);
    };

    var mouseOver = function() {
        console.log('mouseOver', $(this));
    }

    var mouseOut = function() {
        console.log('mouseOut', $(this));
    }

    var mouseClick = function() {
        console.log('pathClick', $(this).attr('name'));
    }

    var toolTip = function() {
        console.log('tooltip');
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

