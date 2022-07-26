const form = document.querySelectorAll('form')[0]
const date_now = document.getElementsByName('date_of_birthday')[0]

date_now.max = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];

window.fetch('https://reqres.in/api/users?page=1').then(response => { //brings data from the public API
    response.json().then(({ data }) => {
        if(window.localStorage.key('data_users')){
            const local_data = JSON.parse(window.localStorage.getItem('data_users'))
            Print_Table(local_data)
        }
        else{
            window.localStorage.setItem('data_users',JSON.stringify(data))
            Print_Table(data)
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
    const date_of_birthday = document.getElementsByName('date_of_birthday')[0].value

    const Clear_Fields = () => {
        document.getElementsByName('email')[0].value = ''
        document.getElementsByName('first_name')[0].value = ''
        document.getElementsByName('last_name')[0].value = ''
        document.getElementsByName('date_of_birthday')[0].value = ''
    }

    if (email === '' || first_name === '' || last_name === '' || date_of_birthday === ''){ // check all field
        swal('campo vacio','','warning')
        return
    }

    const re = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$') // regular expression to validate email field
    if (!re.test(email)){
        swal('email no valido','','error')
        return
    }

    const dob = new Date(date_of_birthday);   // converting the age
    const month_diff = Date.now() - dob.getTime();  
    const age_dt = new Date(month_diff);   
    const year = age_dt.getUTCFullYear();  
    const birthday = Math.abs(year - 1970); 

    const new_user = {'id':local_data.length+1,email,first_name,last_name,birthday}
    local_data.push(new_user)
    window.localStorage.setItem('data_users',JSON.stringify(local_data))
    Print_Table([new_user])
    Clear_Fields()
    swal('Usuario creado correctamente','','success')
}

const Print_Table = (data) => {
    const table = document.querySelectorAll('table')[0].childNodes[1]
    const Validate = (element) => { // avoids null data
        if (element) return element
        return '-'
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