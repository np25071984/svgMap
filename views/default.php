<?php

use yii\web\JsExpression;

/* @var $id string */
/* @var $type int */
/* @var $data mixed */
/* @var $showTip bool */
/* @var $onClick string */
/* @var $onOver string */
/* @var $onOut string */

$this->registerJs(new JsExpression("
    new SvgMap({
        id : '{$id}',
        type: '{$type}',
        data: {$data},
        showTip:  {$showTip},
        onClick: {$onClick},
        onOver: {$onOver},
        onOut: {$onOut}
    });
"), \yii\web\View::POS_READY);
?>

<div class="svg_map">
    <div id="tools" style="z-index: 1;">
        <div><i class="fa fa-plus-circle" aria-hidden="true"></i>[+]</div>
        <div><i class="fa fa-plus-circle" aria-hidden="true">[0]</i></div>
        <div><i class="fa fa-minus-circle" aria-hidden="true">[-]</i></div>
    </div>
    <div id="tooltip<?= $id ?>"></div>
    <svg id="mapSVG<?= $id ?>" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" />
</div>
