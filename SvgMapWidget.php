<?php

namespace ghopper\svgmap;

use yii\base\Widget;

/**
 * Class SvgMapWidget
 * @package ghopper\svgmap
 */
class SvgMapWidget extends Widget
{
    const DATA_SOURCE_ARRAY = 1;
    const DATA_SOURCE_JSON_URL = 2;

    /**
     * @var int Data provider type
     */
    public $type;

    /**
     * @var mixed
     */
    public $data;

    /**
     * @var bool Tooltip show flag
     */
    public $showTip;

    /**
     * @var bool Tools panel show flag
     */
    public $showTools;


    /**
     * @var string Callback functions for events handler
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
         * Show tooltip by default
         */
        if (!isset($this->showTip)) {
            $this->showTip = true;
        }

        /**
         * Hide tools by default
         */
        if (!isset($this->showTools)) {
            $this->showTools = false;
        }
    }

    public function run()
    {
        SvgMapWidgetAsset::register($this->getView());
        return $this->render('default', [
            'id' => $this->getId(),
            'type' => ($this->type === self::DATA_SOURCE_ARRAY) ? 'json' : 'url',
            'data' => $this->data,
            'showTip' => ($this->showTip) ? 'true' : 'false',
            'showTools' => ($this->showTools) ? 'true' : 'false',
            'onClick' =>  ($this->onClick) ? $this->onClick : 'null',
            'onOver' =>  ($this->onOver) ? $this->onOver : 'null',
            'onOut' =>  ($this->onOut) ? $this->onOut : 'null',
        ]);
    }
}

