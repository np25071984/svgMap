<?php
namespace ghopper\SvgMap;

use yii\base\Widget;

class SvgMapWidget extends Widget
{
    const DATA_SOURCE_ARRAY = 1;
    const DATA_SOURCE_JSON_URL = 2;

    public $type;
    public $data;
    public $onClick;
    public $onOver;
    public $onOut;

    public function init()
    {
        parent::init();

        if ($this->type === self::DATA_SOURCE_ARRAY) {
            $this->data = json_encode($this->data);
        }
    }

    public function run()
    {
        SvgMapWidgetAsset::register($this->getView());
        return $this->render('default', [
            'id' => $this->getId(),
            'type' => ($this->type === self::DATA_SOURCE_ARRAY) ? 'json' : 'url',
            'data' => $this->data,
            'onClick' =>  ($this->onClick) ? $this->onClick : 'null',
            'onOver' =>  ($this->onOver) ? $this->onOver : 'null',
            'onOut' =>  ($this->onOut) ? $this->onOut : 'null',
        ]);
    }
}

