console.log('client site javascript is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((res)=>{
//     res.json().then((data) =>{
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    msg1.textContent = 'Loading'
    msg2.textContent = ''
    fetch('/weather?address='+location).then((res) =>{
        res.json().then((data)=>{
            if (data.error){
                console.log(data.error)
                msg1.textContent = data.error
                msg2.textContent = ''

            }else{
                msg1.textContent = data.location
                msg2.textContent = data.forecast
            }

        })
    })
})
