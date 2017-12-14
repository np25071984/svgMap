![SvgMap](https://preview.ibb.co/jMWOnw/Screenshot_20171207_161726.png "Yii2 widget for svg-map construction")


# SvgMap

Yii2-виджет для генерации svg по заданному источнику данных.

## Установка

Выполняем команду
```
php composer.phar require hopper/svg-map "*"
```
или добавляем в composer.json
```json
{
    "require": {
        "ghopper/svg-map": "*"
    }
}
```

## Пример использования

### Подключаем пространство имен
```php
use ghopper\svgmap\SvgMapWidget;
```

### В контроллере получаем данные для построения svg (в данном случае из примера) и передаем в шаблон
```php
$states = include Yii::getAlias('@ghopper/svgmap/example') . "/russia.php";
...
$this->render('index', ['svgData' => $states]);
```
### В шаблоне создаем js-обрыботчики событий в глобальной зоне видимости
```javascript
<script>
    var customClick = function(path) {alert(path.attr('id') + ' - ' + path.attr('title'))};
</script>
```
### И там же передаем все данные виджету
```php
<?php
    echo SvgMapWidget::widget([
        'type' => SvgMapWidget::DATA_SOURCE_ARRAY,
        'data' => $svgData,
        'onClick' => 'customClick',
    ]);
?>
```

## Источники данных
Вы можете добавлять свои данные к базовому формату:

```
{
    title: "Элемент #1",
    d: ["M 50,50 10,0 0,10 -10,0 z"]
}

```
Например добавить id, кол-во элементов, адрес перехода или другие данные,которые вам могут понадобиться. В последующем вы можете манипулировать этими данными в обработчиках событий.

Виджет поддерживает два источника данных:
 * SvgMapWidget::DATA_SOURCE_ARRAY - php-массив
 * SvgMapWidget::DATA_SOURCE_JSON_URL - ссылка на json

## Внешний вид
Дефолтные стили заложены `@vendor/ghopper/svg-map/src/css/svg-map.css`, которые вы можете как угодно переопределять в своем коде. Сам виджет имеет простую структуру
```
<div class='svg_map'>
    <div><!--tooltip--></div>
    <svg />
</div>
```
Можете создавать сложную анимацию в обработчиках событий.

## Параметры запуска виджета
### Обязательные
 * type - тип источника данных
 * data - данные к параметру type (адрес json либо массив)

### Дополнительные
 * showTip - флаг, определяющий отображать или нет toolTip
 * onClick - callback-функция клика по элементу svg path
 * onOver - callback-функция, вызываемая при движении курсора над элементом
 * onOut - callback-функция, вызываемая когда курсор покидает элемент
