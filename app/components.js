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
        <p class="nav-item"><a href="/">Создать маршрут</a></p>
        <p class="nav-item"><a href="/current_route">Текущий маршрут</a></p>
        <p class="nav-item"><a href="/show_history">История маршрутов</a></p>
    </nav>
`
exports.createComponent = createComponent = 
`
    <div class="body-wrapper"></div>
    <section class="addAction">
        <label for="point-name">Название точки</label>
        <input type="text" name="point-name" id="point_name">
        <button id="add_point" type="submit">Добавить точку</button>
        <button type="submit" id="save_route"><a id="save">Создать маршрут</a></button>
    </section>
`

exports.addRouteComponent = addRouteComponent =
`
    <button type="submit" id="add_to_route">Добавить точку в маршрут</button>    
    <section class="addActionRoute" style="margin-top:1%;">
        <label for="point-name">Название точки</label>
        <input type="text" name="point-name" id="point_name">
        <button id="add_point" type="submit">Добавить точку</button>
    </section>
`

exports.routeList = routeList = (contents) =>
`
    <div class="elem-wrapper"></div>
    <section class="route-list">
        ${contents}
    </section>
    
`

exports.startSumField = startSumField = 
`
    <div class="elem-wrapper"></div>
    <section class="finalsum">
        <div class="sum-block">
            <label for="startsum">Выданная сумма: </label>
            <input type="text" name="startsum" id="startsum">
        </div>
    </section>
`

exports.extraSumFields = extraSumFields = (contents) =>
`
    <div class="elem-wrapper"></div>
    <section class="finalsum">
        <div class="sum-block">
            <label for="startsum">Выдано: </label>
            <input type="text" name="startsum" id="startsum" value="${contents}">
            <button type="submit"><a id="change_start">Изменить сумму</a></button>
        </div>
        <div class="sum-block">
            <label for="finalsum">Итого: </label>
            <input type="text" name="finalsum" id="wastedsum" value="0">
        </div>
        <div class="sum-block">
            <label for="finalroad">Проезд: </label>
            <input type="text" name="finalroad" id="roadsum" value="0">
        </div>
        <div class="sum-block">
            <label for="finalleftover">Остаток: </label>
            <input type="text" name="finalleftover" id="leftoversum" value="0">
            <label for="cashless_check">Безнал</label>
            <input type="checkbox" name="cashless_check" id="cashlesscheck">
            <label for="finalleftover_cashless" id="cashless-leftoversum">На карту:</label>
            <input type="text" name="finalleftover_cashless" id="cashless-leftoversum" value="0">
        </div>
    </section>
`

exports.historyList = historyList = (contents) => 
`
    <div class="elem-wrapper"></div>
    <section class="history-list">
        ${contents}
    </section>
`