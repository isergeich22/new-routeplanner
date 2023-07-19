exports.baseHtml = baseHtml = (contents) => 
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/css/styles.css" type="text/css">
        <link rel="shortcut icon" type="image/png" href="/favicon.png">
        <title>Планировщик маршрута</title>
    </head>
    <body>
        ${contents}
        <script src="/js/script.js"></script>
    </body>
    </html>`

exports.navBar = navBar = 
`
    <nav class="nav-section">
        <img src="/img/logo.png" alt="route_planner">
        <p class="nav-item"><a href="http://localhost:3030/">Создать маршрут</a></p>
        <p class="nav-item"><a href="http://localhost:3030/current_route">Текущий маршрут</a></p>
        <p class="nav-item"><a href="http://localhost:3030/history">История маршрутов</a></p>
    </nav>
`
exports.createComponent = createComponent = 
`
    <div class="body-wrapper"></div>
    <section class="addAction">
        <label for="point-name">Добавить точку маршрута</label>
        <input type="text" name="point-name" id="point_name">
        <button id="add_point" type="submit">Добавить точку</button>
        <button type="submit" id="save_route"><a id="save">Создать маршрут</a></button>
    </section>
`

exports.routeList = routeList = (contents) =>
`
    <div class="elem-wrapper"></div>
    <section class="route-list">
        ${contents}
    </section>
    
`

exports.startSumField = startSumField = (contents) =>
`
    <div class="elem-wrapper"></div>
    <section class="finalsum">
        <div class="sum-block">
            <label for="startsum">Выданная сумма: </label>
            <input type="text" name="startsum" id="startsum" value="${contents}">
            <button type="submit" id="get-start">Зафиксировать</button>
        </div>
    </section>
`

exports.extraSumFields = extraSumFields = 
`
    <div class="elem-wrapper"></div>
    <section class="finalsum">
        <div class="sum-block">
            <label for="startsum">Выдано: </label>
            <input type="text" name="startsum" id="startsum" value="0">
            <button type="submit" id="remove-start">Удалить</button>
            <button type="submit" id="get-start">Зафиксировать</button>
        </div>
        <div class="sum-block">
            <label for="finalsum">Итого: </label>
            <input type="text" name="finalsum" id="startsum" value="0">
            <button type="submit" id="get-final">Подсчитать</button>
        </div>
        <div class="sum-block">
            <label for="finalroad">Проезд: </label>
            <input type="text" name="finalroad" id="finalroad" value="0">
            <button type="submit" id="get-road">Зафиксировать</button>
        </div>
        <div class="sum-block">
            <label for="finalleftover">Остаток: </label>
            <input type="text" name="finalleftover" id="finalleftover" value="0">
            <button type="submit" id="get-leftover">Подсчитать</button>
        </div>
    </section>
`