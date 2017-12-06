![SvgMap](https://preview.ibb.co/mx5F0G/Screenshot_20171207_010228.png "Yii2 widget for svg-map construction")


# SvgMap

Yii2 виджет для автоматической генерации svg-карт.

## Установка
Установка через composer.
```json
{
  "require": {
    "ghopper/svg-map": "*"
  }
}
```

## Использование
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
На данный момент поддерживанется генерация svg из:
 * php-массив (см. директорию example)
 * загрузка json с сервера
