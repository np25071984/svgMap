var svgMap = function(options) {

    var vars = {
        svg  : null,
        width: 0,
        heigth: 0,
        strokeWidth: 10
    };

    /*
     * Can access this.method
     * inside other methods using
     * root.method()
     */
    var root = this;

    /*
     * Constructor
     */
    this.construct = function(options){
        $.extend(vars , options);

        vars.svg = $('#'+vars.svgId).get(0);

        draw(vars.svg, vars.states);
    };

    /*
     * Draws the paths from array
     */
    var draw = function(svg, states) {
        $.each(states, function( index, value ) {
            var path = document.createElementNS('http://www.w3.org/2000/svg',"path");
            path.setAttributeNS( null, "id", value.id);
            path.setAttributeNS( null, "d", value.d);
            path.setAttributeNS( null, "stroke", "black");
            path.setAttributeNS( null, "stroke-width", vars.strokeWidth);
            path.setAttributeNS( null, "opacity", 1);
            path.setAttributeNS( null, "fill", "none");
            svg.appendChild(path);
        });
        adaptViewBox(svg);
    };

    /*
     * Adapts dimension of SVG according it paths
     */
    var adaptViewBox = function(svg) {
        var bbox = svg.getBBox();
        svg.setAttribute('viewBox', '0 0 '+bbox.width+' '+bbox.height);
    };

    /*
     * Pass options when class instantiated
     */
    this.construct(options);

};
