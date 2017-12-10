<?php

namespace ghopper\svgMap;

use yii\web\AssetBundle;

/**
 * Class SvgMapsWidgetAsset
 * @package ghopper\svgMap
 */
class SvgMapsWidgetAsset extends AssetBundle
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
