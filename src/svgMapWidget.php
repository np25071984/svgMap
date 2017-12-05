<?php
namespace ghopper\svgMap;

use yii\base\Widget;

class svgMapWidget extends Widget
{
    const SOURCE_JS_FILE = 1;
    const SOURCE_PHP_ARRAY = 2;
    const SOURCE_JSON_URL = 3;

    public $sourceType;

    public function init()
    {
        parent::init();

    }

    public function run()
    {
        svgMapWidgetAsset::register($this->getView());
        return $this->render('default', []);
    }
}
?>
