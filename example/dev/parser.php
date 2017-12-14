<?php
use yii\helpers\Html;
use yii\helpers\ArrayHelper;

$fileName = 'russia';
$jsonFile = file_get_contents(Yii::getAlias('@ghopper/svgmap/example/dev/json') . "/" . $fileName . ".json");
$svgFile = simplexml_load_file(Yii::getAlias('@ghopper/svgmap/example/dev/svg') . "/" . $fileName . ".svg");
$svgDataArray = json_decode(json_encode($svgFile), TRUE);
$jsonDataArray = json_decode($jsonFile, TRUE);

$svgArray = [];
// Разбираем svg
foreach ($svgDataArray['g']['path'] as $key => $value) {
    $svgArray[$key] = $value['@attributes'];
    $id = ArrayHelper::getValue($svgArray[$key], 'id');
    if ($fileName == 'russia') {
        $pos = strpos($id, '-') + 1; // Для Russia
    } else {
        $pos = 0; // Для World
    }
    $svgArray[$key]['id'] = substr($id, $pos);
}
// Собираем всё вместе
$result = [];
foreach ($svgArray as $key => $value) {
    $title = ArrayHelper::getValue($jsonDataArray[$value['id']], 'title');

    // Корректировка данных по карте россии
    if ($fileName == 'russia')
    {
        if ($value['id'] == 'CR')
            $title = 'Республика Крым';
        if ($value['id'] == 'SEV')
            $title = 'Севастополь';
    }

    $result[$key] = [
        'id' => $value['id'],
        'title' => $title,
        'd' => $value['d'],
        'stroke' => $value['stroke'],
        'stroke-width' => $value['stroke-width'],
    ];
}

//\yii\helpers\VarDumper::dump($result, 10, 1);
//die;
// Сохраняем в файл
$file = Yii::getAlias('@ghopper/svgmap/example') . "/" . $fileName . ".json";
$data = json_encode($result);
file_put_contents($file, $data);
// Читаем файл
//$data = file_get_contents($file);
//$states = json_decode($data);