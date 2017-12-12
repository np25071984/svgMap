<?php

namespace ghopper\svgmap;

use yii\web\AssetBundle;

/**
 * Class SvgMapWidgetAsset
 * @package ghopper\svgmap
 */
class SvgMapWidgetAsset extends AssetBundle
{
    public $sourcePath;

    public $css = [
        'css/svg-map.css'
    ];

    public $js = [
        'js/svg-map.js',
    ];

    public $depends = [
        'yii\web\JqueryAsset',
    ];

    public function init()
    {
        parent::init();
        $this->sourcePath = __DIR__ . '/src';
    }
}
