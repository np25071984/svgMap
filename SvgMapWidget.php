<?php

namespace ghopper\svgmap;

use yii\base\Widget;
use yii\web\JsExpression;
use yii\helpers\Html;
use yii\helpers\ArrayHelper;

/**
 * Class SvgMapWidget
 * @package ghopper\svgmap
 */
class SvgMapWidget extends Widget
{
    const DATA_SOURCE_ARRAY = 1;
    const DATA_SOURCE_JSON_URL = 2;

    public $id;

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
    public $showTip = true;

    /**
     * Options ToolTip
     * ['position' => ['x' => 80, 'y' => 120]],
     * @var array
     */
    public $toolTipOptions = [];

    /**
     * HTML tag options container
     * @var array
     */
    public $containerOptions = ['class' => 'svg_map'];

    /**
     * HTML tag options tooltip container
     * @var array
     */
    public $toolTipContainerOptions = [];

    /**
     * HTML tag svg options container
     * @var array
     */
    public $svgContainerOptions = [];

    /**
     * @var string callback function for event handler
     */
    public $onClick;
    public $onOver;
    public $onOut;

    private $toolsId;

    public function init()
    {
        parent::init();

        $this->id = $this->id ?: $this->getId();
        $tooltipId = 'tooltip_' . $this->id;
        $svgId = 'mapSVG_' . $this->id;
        $toolsId = 'tools_' . $this->id;

        $this->onClick = ($this->onClick) ? $this->onClick : 'null';
        $this->onOver = ($this->onOver) ? $this->onOver : 'null';
        $this->onOut = ($this->onOut) ? $this->onOut : 'null';

        if ($this->type === self::DATA_SOURCE_ARRAY) {
            $this->data = json_encode($this->data);
        }

        $this->type = ($this->type === self::DATA_SOURCE_ARRAY) ? 'json' : 'url';

        // Html опции для контейнера toolTip
        $this->toolTipContainerOptions = ArrayHelper::merge([
            'id' => $tooltipId,
            'class' => 'svg_map_tooltip',
        ], $this->toolTipContainerOptions);
        $this->toolTipContainerOptions['id'] = $this->toolTipContainerOptions['id'] ?: $tooltipId;

        // Опции для toolTip, доступно коррекция позиционирования
        // по умолчанию заданы параметры [position => ['x' => 100, 'y' => 210]]
        $this->toolTipOptions = json_encode(ArrayHelper::merge([
            'id' => $this->toolTipContainerOptions['id'],
            'position' => ['x' => 80, 'y' => 120],
        ], $this->toolTipOptions));

        // Html заголовки и опции для тега svg
        $this->svgContainerOptions = ArrayHelper::merge([
            'id' => $svgId,
            'xmlns' => 'http://www.w3.org/2000/svg',
            'xmlns:xlink' => 'http://www.w3.org/1999/xlink',
            'version' => '1.1',
        ], $this->svgContainerOptions);
        $this->svgContainerOptions['id'] = $this->svgContainerOptions['id'] ?: $svgId;
    }

    /**
     * Render SVG
     */
    public function run()
    {
        $this->registerAssets();
        echo Html::beginTag('div', $this->containerOptions) . PHP_EOL;
        echo $this->render('_zoom2', ['id' => $this->toolsId]) . PHP_EOL;
        echo Html::tag('div', '', $this->toolTipContainerOptions) . PHP_EOL;
        echo Html::tag('svg', '', $this->svgContainerOptions) . PHP_EOL;
        echo Html::endTag('div') . PHP_EOL;
    }

    /**
     * Publish and register resource
     */
    public function registerAssets()
    {
        $view = $this->getView();
        SvgMapWidgetAsset::register($view);
        $view->registerJs(new JsExpression("
            new SvgMap({
                id: '{$this->id}',
                svgId: '{$this->svgContainerOptions["id"]}',
                type: '{$this->type}',
                data: {$this->data},
                showTip:  {$this->showTip},
                onClick: {$this->onClick},
                onOver: {$this->onOver},
                onOut: {$this->onOut},
                toolTipOptions: {$this->toolTipOptions}
            });
        "), $view::POS_READY);
    }
}

