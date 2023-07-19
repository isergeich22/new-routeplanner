let points = []
let string_points = []

const addButton = document.querySelector('#add_point')
const pointName = document.querySelector('#point_name')
const routeList = document.querySelector('.route-list')
const saveHref = document.querySelector('#save')

const navItems = document.querySelectorAll('.nav-item')

if(routeList.innerHTML == '' || routeList.innerHTML == undefined || routeList == null) {
    routeList.innerHTML = '<p>Точки маршрута пока не заданы</p>'
}

const startSum = document.querySelector('#startsum')
const getStart = document.querySelector('#get-start')

let start_Sum = 0

getStart.addEventListener('click', () => {
    start_Sum = startSum.value
})

addButton.addEventListener('click', () => {

    const obj = `<div class="card">
                    <input type="checkbox" name="done" false data-point=${pointName.value}>
                    <label class="name" for="done">${pointName.value}</label>
                    <label class="cost" for="cost">Сумма: </label>
                    <input type="text" name="cost" class="cost-input" id=${pointName.value} value="0">
                    <button type="submit" id="send" data-point=${pointName.value}>Отправить</button>
                    <button type="submit" id="remove" data-point=${pointName.value}>Х</button>
                 </div>`

    string_points.push(pointName.value)

    points.push(obj)
    render(points)

    pointName.value = ''

})

function render(points) {

    routeList.innerHTML = ''

    for(let i = 0; i < points.length; i++) {
        routeList.innerHTML += points[i]
    }    

    let href = `http://localhost:3030/create_route?points=${string_points}&start_sum=${start_Sum}`
    saveHref.setAttribute('href', href)

}