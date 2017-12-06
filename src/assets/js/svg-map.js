var SvgMap = function(options) {

    var svg;
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
        if(typeof options.svgId === 'undefined') {
            throw new Error('svgId parameter is missed');
        }

        if(typeof options.states === 'undefined') {
            throw new Error('states parameter is missed');
        }

        if(typeof options.toolTipId !== 'undefined') {
            root.toolTip = $('#'+options.toolTipId);
        }

        root.svg = $('#'+options.svgId).get(0);

        draw(root.svg, options.states);
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

