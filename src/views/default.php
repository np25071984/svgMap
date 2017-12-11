<div class="svg_map">
    <div id="tools" style="z-index: 1;">
        <div><i class="fa fa-plus-circle" aria-hidden="true"></i>[+]</div>
        <div><i class="fa fa-plus-circle" aria-hidden="true">[0]</i></div>
        <div><i class="fa fa-minus-circle" aria-hidden="true">[-]</i></div>
    </div>
    <div id="tooltip<?= $id ?>"></div>
    <svg id="mapSVG<?= $id ?>" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" />
</div>

<?php
$this->registerJs("
    new SvgMap({
        id : '{$id}',
        type: '{$type}',
        data: {$data},
        showTip:  {$showTip},
        onClick: {$onClick},
        onOver: {$onOver},
        onOut: {$onOut}
    });
");
?>