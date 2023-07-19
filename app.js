const express = require('express')
const components = require('./app/components.js')
const fs = require('fs')
const current_route = ('./app/data/current_route.json')


let html = ''

const app = express()

app.get('/', async function(req, res) {

    html = components.baseHtml(
        components.navBar + components.createComponent + components.routeList('') + components.startSumField(0)
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
                done: false
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
                        <input type="checkbox" name="done" id="done" ${e.done} data-point="${e.name}">
                        <label class="name" for="done">${e.name}</label>
                        <label class="cost" for="cost">Сумма: </label>
                        <input type="text" name="cost" class="cost-input" id="${e.name}" value="${e.cost}">
                        <button type="submit" id="send" data-point="${e.name}">Зафиксировать</button>
                        <button type="submit" id="remove" data-point="${e.name}">X</button>
                      </div>`
        })

        startSum = parseInt(result.start_sum)

    }

    await renderRoute(current_route)

    if(res.statusCode == 200) {

        html = components.baseHtml(
            components.navBar + `<h1 class="current-route">Текущий маршрут</h1>` + components.routeList(route) + components.startSumField(startSum)
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

app.get('/history', async function(req, res) {

    html = components.baseHtml(
        `<h1>История маршрутов</h1>`
    )

    res.send(html)

})

app.use(express.static(__dirname + '/public'))

app.listen(3030)