<?php

namespace ghopper\svgMap;

use yii\base\Widget;

/**
 * Class SvgMapsWidget
 * @package ghopper\svgMap
 */
class SvgMapsWidget extends Widget
{
    const DATA_SOURCE_ARRAY = 1;
    const DATA_SOURCE_JSON_URL = 2;

    /**
     * @var int data provider type
     */
    public $type;

    /**
     * @var mixed
     */
    public $data;

    /**
     * @var bool ToolTip show flag
     */
    public $showTip;

    /**
     * @var string callback function for event handler
     */
    public $onClick;
    public $onOver;
    public $onOut;

    public function init()
    {
        parent::init();

        if ($this->type === self::DATA_SOURCE_ARRAY) {
            $this->data = json_encode($this->data);
        }

        /**
         * Show toolTip by default
         */
        if (!isset($this->showTip)) {
            $this->showTip = true;
        }
    }

    public function run()
    {
        SvgMapsWidgetAsset::register($this->getView());
        return $this->render('default', [
            'id' => $this->getId(),
            'type' => ($this->type === self::DATA_SOURCE_ARRAY) ? 'json' : 'url',
            'data' => $this->data,
            'showTip' => ($this->showTip) ? 'true' : 'false',
            'onClick' =>  ($this->onClick) ? $this->onClick : 'null',
            'onOver' =>  ($this->onOver) ? $this->onOver : 'null',
            'onOut' =>  ($this->onOut) ? $this->onOut : 'null',
        ]);
    }
}

