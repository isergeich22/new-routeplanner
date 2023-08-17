let points = []
let string_points = []

const addAction = document.querySelector('.addActionRoute')
const addButton = document.querySelector('#add_point')
const pointName = document.querySelector('#point_name')
const routeList = document.querySelector('.route-list')
const saveHref = document.querySelector('#save')

const navItems = document.querySelectorAll('.nav-item')

if((document.location.href).indexOf('create_route') < 0 && (document.location.href).indexOf('save_history') < 0 && (document.location.href).indexOf('show_history') < 0)

if(routeList.innerHTML == '' || routeList.innerHTML == undefined || routeList == null) {
    routeList.innerHTML = '<p>Точки маршрута пока не заданы</p>'
}

const startSum = document.querySelector('#startsum')
const getStart = document.querySelector('#get-start')

let start_Sum = 0

if((document.location.href).indexOf('show_history') < 0 && (document.location.href).indexOf('current_route') < 0) {
    startSum.addEventListener('input', () => {
        start_Sum = startSum.value

        let href = `/create_route?points=${string_points}&start_sum=${start_Sum}`
        saveHref.setAttribute('href', href)
    })
}

if(addButton != null) {
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
}

function render(points) {

    routeList.innerHTML = ''

    for(let i = 0; i < points.length; i++) {
        routeList.innerHTML += points[i]
    }    

    let href = `/create_route?points=${string_points}&start_sum=${start_Sum}`
    saveHref.setAttribute('href', href)

}

const saveButton = document.querySelector('#save_route')
const pointsCard = document.querySelectorAll('.card')
const startsum = document.querySelector('#startsum')
const wastedsum = document.querySelector('#wastedsum')
const roadsum = document.querySelector('#roadsum')
let leftoversum = document.querySelector('#leftoversum')

let pointNames = []
let pointCosts = []
let pointTimes = []

pointsCard.forEach(e => {
    pointNames.push(e.childNodes[5].innerHTML)
    pointCosts.push(parseInt(e.childNodes[9].value))
})

let href = ''

// if((document.location.href).indexOf('current_route') >= 0) {    

// }

if((document.location.href).indexOf('current_route') >= 0) {

    let count = 0

    const addToRouteButton = document.querySelector('#add_to_route')
    const startSum = document.querySelector('#startsum')
    const changeStart = document.querySelector('#change_start')
    const costs = document.querySelectorAll('.cost-input')
    const confirmButton = document.querySelectorAll('#confirm')
    const sendButton = document.querySelectorAll('#send')
    const doneButton = document.querySelectorAll('#done')
    const startTime = document.querySelector('#start_time')
    const cashlessCheck = document.querySelector('#cashlesscheck')
    const cashlessLeftover = document.querySelectorAll('#cashless-leftoversum')

    let sum = 0
    let roadsum_value = 0
    let startsum_value = 0
    let cashless_value = 0

    roadsum.addEventListener('input', () => {

        roadsum_value = roadsum.value
        leftoversum.value = parseInt(startsum.value) - parseInt(wastedsum.value) - roadsum_value
        // console.log(roadsum_value)

        href = `/save_history?points=${pointNames}&costs=${pointCosts}&start_sum=${startsum.value}&wasted_sum=${wastedsum.value}&road_sum=${roadsum_value}&leftover=${leftoversum.value}`

        saveButton.childNodes[0].setAttribute('href', href)

    })

    let interval = ''    

    let _temp = 0

    costs.forEach(e => {

        sum += parseInt(e.value)

    })

    wastedsum.value = sum

    leftoversum.value = parseInt(startsum.value) - parseInt(wastedsum.value) - roadsum_value

    doneButton.forEach(e => {
        e.addEventListener('change', () => {

            _temp = count

            if(e.checked === true) {

                clearInterval(interval)

                pointTimes.push(count)

                const temp_array = Array.from(doneButton)

                let index = temp_array.indexOf(temp_array.find(checkbox => checkbox.dataset.point == e.getAttribute('data-point')))

                sendButton[index].childNodes[0].setAttribute('href', `/current_route?name=${e.getAttribute('data-point')}&done=${e.checked}`)

            } else {

                count = _temp

                pointTimes.pop(pointTimes.length-1, 1)

                interval = setInterval(() => {

                    count += 1

                }, 1000)

            }

        })
    })

    confirmButton.forEach(e => {
        e.addEventListener('click', () => {
            
            const temp_array = Array.from(confirmButton)            

            let index = temp_array.indexOf(temp_array.find(point => point.dataset.point == e.getAttribute('data-point')))

            sendButton[index].childNodes[0].setAttribute('href', `/current_route?name=${e.getAttribute('data-point')}&cost=${document.querySelector(`#${e.getAttribute('data-point')}`).value}`)

        })
    })

    startTime.addEventListener('click', () => {

        interval = setInterval(() => {
            count += 1
        }, 1000)

    })

    startSum.addEventListener('input', () => {

        startsum_value = startSum.value

        href = `/current_route?new_start=${startsum_value}`

        changeStart.setAttribute('href', href)

    })

    cashlessCheck.addEventListener('change', () => {
        if(cashlessCheck.checked === true) {
            cashlessLeftover.forEach(e => {
                e.style.display = 'flex'
            })
        } else {
            cashlessLeftover.forEach(e => {
                e.style.display = 'none'
            })
        }
    })

    cashlessLeftover[1].addEventListener('input', () => {

        cashless_value = cashlessLeftover[1].value

        leftoversum.value = parseInt(startsum.value) - parseInt(wastedsum.value) - roadsum_value - cashless_value

        href = `/save_history?points=${pointNames}&costs=${pointCosts}&start_sum=${startsum.value}&wasted_sum=${wastedsum.value}&road_sum=${roadsum_value}&leftover=${leftoversum.value}&cashless_leftover=${cashless_value}`

        saveButton.childNodes[0].setAttribute('href', href)

    })

    addToRouteButton.addEventListener('click', () => {

        if(addAction.style.display == 'none' || addAction.style.display == '') {

            addAction.style.display = 'flex'

        } else {

            addAction.style.display = 'none'

        }

    })

}