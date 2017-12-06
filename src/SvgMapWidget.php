<?php
namespace ghopper\SvgMap;

use yii\base\Widget;

class SvgMapWidget extends Widget
{
    const DATA_SOURCE_JS_FILE = 1;
    const DATA_SOURCE_PHP_ARRAY = 2;
    const DATA_SOURCE_JSON_URL = 3;

    public $data;

    public function init()
    {
        parent::init();

    }

    public function run()
    {
        SvgMapWidgetAsset::register($this->getView());
        return $this->render('default', [
            'id' => $this->getId()
        ]);
    }
}

