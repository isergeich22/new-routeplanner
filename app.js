const express = require('express')
const components = require('./app/components.js')
const fs = require('fs')
const current_route = ('./app/data/current_route.json')
const history = ('./app/data/history.json')


let html = ''

const app = express()

app.get('/', async function(req, res) {

    html = components.baseHtml(
        components.navBar + components.createComponent + components.routeList('') + components.startSumField
    )

    res.send(html)

})

app.get('/create_route', async function(req, res) {

    async function saveRoute(path) {

        let point_name = (req.query.points).split(',')

        let points = []

        for(let i = 0; i < point_name.length; i++) {

            let object = {
                name: point_name[i],
                cost: 0,
                done: false,
                time: 0
            }

            points.push(object)

        }

        let obj = {

            points : points,
            start_sum: parseInt(req.query.start_sum)

        }
        
        let jsonObj = JSON.stringify(obj)

        fs.writeFileSync(path, jsonObj)

    }

    await saveRoute(current_route)

    if(res.statusCode == 200) {

        html = components.baseHtml(
            components.navBar + `<h1 class="success-result">Маршрут успешно создан</h1>`
        )

        res.send(html)

    } else if(res.statusCode == 404) {

        html = components.baseHtml(
            components.navBar + `<h1 class="not-found-result">404 - Страница не найдена</h1>`
        )

        res.send(html)

    } else {

        html = components.baseHtml(
            components.navBar + `<h1 class="unknown-result">${res.statusCode} - Возникла непредвиденная ошибка</h1>`
        )

        res.send(html)

    }    

})

app.get('/current_route', async function(req, res) {

    let route = ''
    let startSum = 0

    async function renderRoute(path) {

        let data = fs.readFileSync(path)

        let result = JSON.parse(data)

        result.points.forEach(e => {
            route += `<div class="card">
                        <button type="submit" id="start_time">Начать выполнение</button>
                        <input type="checkbox" name="done" id="done" ${e.done} data-point="${e.name}">
                        <label class="name" for="done">${e.name}</label>
                        <label class="cost" for="cost">Сумма: </label>
                        <input type="text" name="cost" class="cost-input" id="${e.name}" value="${e.cost}">
                        <button type="submit" id="confirm" data-point="${e.name}"><svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24"/>
                        <path d="M5 13.3636L8.03559 16.3204C8.42388 16.6986 9.04279 16.6986 9.43108 16.3204L19 7" stroke="#000" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg></button>
                        <button type="submit" id="send" data-point="${e.name}"><a id="change">Зафиксировать</a></button>
                        <button type="submit" id="remove" data-point="${e.name}"><a href="http://localhost:3030/current_route?name=${e.name}">
                        <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" fill=""/>
                        <path d="M7 17L16.8995 7.10051" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>                            
                        </svg></a></button>
                      </div>`
        })

        startSum = parseInt(result.start_sum)

    }

    async function changePointsRoute(path, point_name = '', cost = 0, done = '') {

        if(point_name != '' && cost != 0 && done == '') {
        
            let data = fs.readFileSync(path)

            let result = JSON.parse(data)

            let points = result.points

            let index = points.indexOf(points.find(point => point.name == point_name))

            points[index].cost = cost

            let obj = {
                points : points,
                start_sum: result.start_sum
            }

            let jsonObj = JSON.stringify(obj)

            fs.writeFileSync(path, jsonObj)

        }

        if(done != '' && point_name != '' && cost == 0) {

            let data = fs.readFileSync(path)

            let result = JSON.parse(data)

            let points = result.points

            let index = points.indexOf(points.find(point => point.name == point_name))

            if(done == 'true') {

                points[index].done = 'checked'

            } else {

                points[index].done = false

            }

            let obj = {
                points : points,
                start_sum: result.start_sum
            }

            let jsonObj = JSON.stringify(obj)

            fs.writeFileSync(path, jsonObj)

        }

        if(point_name != '' && done == '' && cost == '') {

            let data = fs.readFileSync(path)

            let result = JSON.parse(data)

            let points = result.points

            let index = points.indexOf(points.find(point => point.name == point_name))

            if(index >= 0) {
                points.splice(index, 1)
            } else {
                points = points
            }

            let obj = {
                points : points,
                start_sum: result.start_sum
            }

            let jsonObj = JSON.stringify(obj)

            fs.writeFileSync(path, jsonObj)

        }

    }

    if(req.query.name !== undefined && req.query.cost !== undefined) {

        await changePointsRoute(current_route, req.query.name, req.query.cost, '')

    }

    if(req.query.name !== undefined && req.query.done !== undefined) {

        await changePointsRoute(current_route, req.query.name, 0, req.query.done)

    }

    if(req.query.name !== undefined && req.query.done == undefined && req.query.cost == undefined) {

        await changePointsRoute(current_route, req.query.name, '', '')

    }

    await renderRoute(current_route)

    if(res.statusCode == 200) {

        html = components.baseHtml(
            components.navBar + `<h1 class="current-route">Текущий маршрут</h1><button type="submit" id="save_route"><a>Сохранить маршрут</a></button>` + components.routeList(route) + components.extraSumFields(startSum)
        )

        res.send(html)

    } else if(res.statusCode == 404) {

        html = components.baseHtml(
            components.navBar + `<h1 class="not-found-result">404 - Страница не найдена</h1>`
        )

        res.send(html)

    } else {

        html = components.baseHtml(
            components.navBar + `<h1 class="unknown-result">${res.statusCode} - Возникла непредвиденная ошибка</h1>`
        )

        res.send(html)

    }

})

app.get('/save_history', async function(req, res) {

    const date_obj = new Date()

    let day = date_obj.getDate()
    let month = date_obj.getMonth()+1
    let year = date_obj.getFullYear()

        month < 10 ? month = `0${month}` : month = month

    let dateString = `${day}-${month}-${year}`

    let points = []

    let data = fs.readFileSync(history)

    let result = JSON.parse(data)

    let routes = result.routes

    let names = (req.query.points).split(',')
    let costs = (req.query.costs).split(',')

    for(let i = 0; i < names.length; i++) {

        let obj = {
            name: names[i],
            cost: costs[i]
        }

        points.push(obj)

    }

    let obj = {
        points: points,
        start_sum: parseInt(req.query.start_sum),
        wasted_sum: parseInt(req.query.wasted_sum),
        road_sum: parseInt(req.query.road_sum),
        left_over: parseInt(req.query.leftover),
        route_date: dateString
    }

    routes.push(obj)

    let jsonStr = {
        routes: routes
    }

    fs.writeFileSync(history, JSON.stringify(jsonStr))

    if(res.statusCode == 200) {

        html = components.baseHtml(
        components.navBar + `<h1 class="success-result">Маршрут успешно сохранен в историю маршрутов</h1>`
        )
        
    } else if(res.statusCode == 404) {

        html = components.baseHtml(
            components.navBar + `<h1 class="not-found-result">404 - Страница не найдена</h1>`
        )

        res.send(html)

    } else {

        html = components.baseHtml(
            components.navBar + `<h1 class="unknown-result">${res.statusCode} - Возникла непредвиденная ошибка</h1>`
        )

        res.send(html)

    }

    res.send(html)

})

app.get('/show_history', async function(req, res){

    let content = ``

    async function renderHistory() {

        let data = fs.readFileSync(history)

        let result = JSON.parse(data)

        content += `<div class="list-header">
                        <span id="first">Точки маршрута</span>
                        <span>Выдано</span>
                        <span>Потрачено</span>
                        <span>Проезд</span>
                        <span>Остаток</span>
                        <span>Дата маршрута</span>
                    </div>`

        result.routes.forEach(e => {        

            content += `<div class="table-row">
                            <div class="list">`
                                

            e.points.forEach(el => {
                content += `<span>${el.name} - ${el.cost}</span>`
            })

            content += `</div>`

            content +=  `<span>${e.start_sum}</span>
                        <span>${e.wasted_sum}</span>
                        <span>${e.road_sum}</span>
                        <span>${e.left_over}</span>
                        <span>${e.route_date}</span>
                        <span><button type="submit" id="remove"><a href="http://localhost:3030/show_history?date=${e.route_date}">
                        <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" fill=""/>
                        <path d="M7 17L16.8995 7.10051" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>                            
                        </svg>
                        </a></button></span>`

            content += `</div>`

        })

        return content

    }

    async function changeRoute(path, date) {

        let data = fs.readFileSync(path)

        let result = JSON.parse(data)

        let routes = result.routes

        let index = routes.indexOf(routes.find(route => route.route_date == date))

        if(index >= 0) {
            routes.splice(index, 1)
        } else {
            routes = routes
        }

        let obj = {
            routes: routes
        }

        let jsonObj = JSON.stringify(obj)

        fs.writeFileSync(path, jsonObj)

    }

    if(req.query.date !== undefined) {

       await changeRoute(history, req.query.date)

    }

    await renderHistory()

    html = components.baseHtml(
        components.navBar + `<h1>История маршрутов</h1>` + components.historyList(content)
    )

    res.send(html)

})

app.use(express.static(__dirname + '/public'))

app.listen(3030)