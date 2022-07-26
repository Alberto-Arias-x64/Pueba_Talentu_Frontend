const form = document.querySelectorAll('form')[0]

window.fetch('https://reqres.in/api/users?page=1').then(response => { //brings data from the public API
    response.json().then(({ data }) => {
        Print_Table(data)
        if(window.localStorage.key('data_users')){
            const local_data = JSON.parse(window.localStorage.getItem('data_users'))
            Print_Table(local_data)
        }
    })
})

form.addEventListener('submit', (e) => { //prevents the behavior from being executed by default. 
    e.preventDefault()
    e.stopPropagation()
})

const Send_Form = () => {
    let local_data = JSON.parse(window.localStorage.getItem('data_users'))
    const email = document.getElementsByName('email')[0].value
    const first_name = document.getElementsByName('first_name')[0].value
    const last_name = document.getElementsByName('last_name')[0].value
    const birthday = document.getElementsByName('date_of_birthday')[0].value

    const Clear_Fields = () => {
        document.getElementsByName('email')[0].value = ''
        document.getElementsByName('first_name')[0].value = ''
        document.getElementsByName('last_name')[0].value = ''
        document.getElementsByName('date_of_birthday')[0].value = ''
    }

    if (email === '' || first_name === '' || last_name === '' || birthday === ''){
        alert('campo vacio')
        return
    }
    const new_user = {email,first_name,last_name,birthday}
    if (local_data){
        local_data.push(new_user)
        window.localStorage.setItem('data_users',JSON.stringify(local_data))
        Print_Table(local_data)
    }
    else{
        window.localStorage.setItem('data_users',JSON.stringify([new_user]))
        Print_Table([new_user])
    }
    Clear_Fields()
}

const Print_Table = (data) => {
    const table = document.querySelectorAll('table')[0].childNodes[1]
    const Validate = (element) => { // avoids null data
        if (element) return element
        return ''
    }
    data.map(element => {
        const id_validated = Validate(element.id)
        const first_name_validated = Validate(element.first_name)
        const last_name_validated = Validate(element.last_name)
        const birthday_validated = Validate(element.birthday)
        const email_validated = Validate(element.email)

        table.insertAdjacentHTML('beforeend', `
        <tr>
            <td>${id_validated}</td>
            <td>${first_name_validated} ${last_name_validated}</td>
            <td>${birthday_validated}</td>
            <td>${email_validated}</td>
        </tr>
        `)
    })
}