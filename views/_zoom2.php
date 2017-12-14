<?php
/* @var $id string */

$this->registerCss("
    .svg_map_zoom_tools {
        position: absolute;
        bottom:0;
        z-index: 1;
        list-style: none;
        padding:0;
    }
    .svg_map_zoom_tools li {
        display:inline;
        cursor: pointer
    }
");
$this->registerJs(new \yii\web\JsExpression("
    $('#tools_{$id} li').on('click', function(){
        alert('OK');
    });
"));
?>

<ul id="tools_<?= $id ?>" class="svg_map_zoom_tools">
    <li><i class="glyphicon glyphicon-zoom-in" aria-hidden="true"></i></li>
    <li><i class="glyphicon glyphicon-refresh" aria-hidden="true"></i></li>
    <li><i class="glyphicon glyphicon-zoom-out" aria-hidden="true"></i></li>
</ul>