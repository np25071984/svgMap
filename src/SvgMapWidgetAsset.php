<?php
namespace ghopper\SvgMap;

use yii\web\AssetBundle;

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
        $this->sourcePath = '@vendor/ghopper/svg-map/src/assets';

        parent::init();
    }
}
