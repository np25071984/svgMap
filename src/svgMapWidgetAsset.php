<?php
namespace ghopper\svgMap;

use yii\web\AssetBundle;

class svgMapWidgetAsset extends AssetBundle
{
    public $sourceType;

    public $css = [
        'css/map.css'
    ];
    
    public $js = [
        'js/russia.js',
        'js/map.js',
    ];

    public $depends = [
        'yii\web\JqueryAsset',
    ];

    public function init()
    {
        $this->sourcePath = '@vendor/ghopper/svg-map/src/assets';

        parent::init();
    }
} 
