![SvgMap](https://preview.ibb.co/jMWOnw/Screenshot_20171207_161726.png "Yii2 widget for svg-map construction")


# SvgMap

Yii2-виджет для генерации svg по заданному источнику данных.

## Установка
Добавьте в composer.json
```json
{
    "require": {
        "ghopper/svg-map": "*"
    }
}
```

## Пример использования
Пространство имен:
```php
  use \ghopper\svg-map\SvgMapWidget;
```
В контроллере получаем данные для svg (в данном случае из примера):
```php
  include Yii::getAlias('@vendor/ghopper/svg-map/example') . "/states.php";
```
Теперь можно создавать виджет в любом шаблоне:
```php
  echo SvgMapWidget::widget([
      'type' => SvgMapWidget::DATA_SOURCE_ARRAY,
      'data' => $svgData,
  ]);
```

## Источники данных
Вы можете добавлять свои данные к базовому формату:

```
{
    id: 1,
    title: "Элемент #1",
    d: ["M 50,50 10,0 0,10 -10,0 z"]
}

```
Например добавить кол-во элементов, адрес перехода и др. информацию, которую в последующем можно будет получать в событиях.

Виджет поддерживает два источника данных:
 * SvgMapWidget::DATA_SOURCE_ARRAY - php-массив
 * SvgMapWidget::DATA_SOURCE_JSON_URL - ссылка на json

## Внешний вид
Дефолтные стили заложены `@vendor/ghopper/svg-map/assets/css/svg-map.css`, которые вы можете переопределять как угодно. Сам виджет имеет простую структуру
```
<div class='svg_map'>
    <div><!--tooltip--></div>
    <svg />
</div>
```
Можете создавать сложную анимацию в обработчиках событий.

## События
Вы можете переопределить следующие события на svg-элементе path:
 * onClick
 * onOver
 * onOut
В обработчик передается указатель на path-объект, из которого вы можете получить любые данные.
