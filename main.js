const form = document.querySelectorAll('form')[0]

window.fetch('https://reqres.in/api/users?page=1').then(response => { //brings data from the public API
    response.json().then(({ data }) => {
        Print_table(data)
    })
})

form.addEventListener('submit', (e) => { //prevents the behavior from being executed by default. 
    e.preventDefault()
    e.stopPropagation()
})

const Send_Form = () => {
    console.log(document.getElementsByTagName('email')) 
}

const Print_table = (data) => {
    const table = document.querySelectorAll('table')[0].childNodes[1]
    const validate = (element) => { // avoids null data
        if (element) return element
        return ''
    }
    data.map(element => {
        const id_validated = validate(element.id)
        const first_name_validated = validate(element.first_name)
        const last_name_validated = validate(element.last_name)
        const birthday_validated = validate(element.birthday)
        const email_validated = validate(element.email)

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