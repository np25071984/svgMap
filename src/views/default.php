<div class="svg_map">
    <svg id="mapSVG" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" />
</div>

<?php
$this->registerJs("
    var map = new svgMap({
        svgId : 'mapSVG',
        states: ruStates
    });
");
?>