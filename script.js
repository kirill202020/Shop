const addNewBtn = document.querySelector('.add__new')
const modal = document.querySelector('#exapleModal')
const tbody = document.querySelector('.list')
const cart = document.querySelector('.cart')

if (!localStorage.getItem('goods')){ localStorage.setItem('goods', JSON.stringify([]))}

let myModal = new bootstrap.Modal(modal, {keyboard: false})



let options = {
    valueNames: ['name', 'price']
};


let userList


addNewBtn.addEventListener('click', (e) =>{
    let name = document.querySelector('#good__name').value
    let price = document.querySelector('#good__price').value
    let count = document.querySelector('#good__count').value
    if(name && price && count){
        document.querySelector('#good__name').value = ''
        document.querySelector('#good__price').value = ''
        count = document.querySelector('#good__count').value = '1'

        let goods = JSON.parse(localStorage.getItem('goods'))
        goods.push(['good' + goods.length, name, price, count, 0, 0, 0])
        localStorage.setItem('goods', JSON.stringify(goods))
        updateGoods()
        myModal.hide()
    } else{
        SVGFEDropShadowElement.fire({
            icon:'error',
            title: 'Error',
            text:'Fill the fields'
        })
    }
})


function updateGoods () {
    let resultPrice = 0
    tbody.innerHTML = ''
    cart.innerHTML = ''
    let goods = JSON.parse(localStorage.getItem('goods'))
    if (goods.length){
        table1.hidden = false
        table2.hidden = false
        for (let index = 0; index < goods.length; index++) {
            tbody.insertAdjacentHTML('beforeend', 
            `
                <tr class="align-middle">

                    <td>${index+1}</td>

                    <td class="name">${goods[index][1]}</td>

                    <td class="price">${goods[index][2]}</td>

                    <td>${goods[index][3]}</td>

                    <td><button  class="good__delete btn btn-danger" data-delete="${goods[index][0]}">&#10006</button></td>

                    <td><button  class="good__delete btn btn-primary" data-goods="${goods[index][0]}">&#10149</button></td>
                
                </tr>
            `)   
            
            if (goods[index][4]>0){
                goods[index][6] = goods[index][4] * goods[index][2] - goods[index][4] * goods[index][2] * goods[index][5]*0.01

                resultPrice += goods[index][6]
                cart.insertAdjacentHTML('beforeend', 
                    `
                        <tr class="align-middle">

                            <td>${index+1}</td>

                            <td class="price__name">${goods[index][1]}</td>

                            <td class="price__number">${goods[index][2]}</td>

                            <td class="price__count">${goods[index][4]}</td>

                            <td class="price__discount"> <input type="number" data-goodit="${goods[index][0]} value="${goods[index][5]} min="0" max="100></td>

                            <td>${goods[index][6]}</td>

                            <td><button  class="good__delete btn btn-danger" data-delete="${goods[index][0]}">&#10006</button></td>

                        </tr>
                    `
                )
            }

            let userList = new List('goods', options);

        }
    }else{
        table1.hidden = true
        table2.hidden = true
    }
    document.querySelector('.price__result').innerHTML = resultPrice + '&#8372'
}

updateGoods()


tbody.addEventListener('click', e =>{
    if (!e.target.dataset.delete) {
        return
    }
    Swal.fire({
        title: 'Attention!',
        text: 'Do you realy want to delete item?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel'
    }).then(result =>{
        if (result.isConfirmed) {
            let goods = JSON.parse(localStorage.getItem('goods'))
            for (let index = 0; index < goods.length; index++) {
                if (goods[index][0] == e.target.dataset.delete) {
                    goods.splice(index, 1)
                    localStorage.setItem('goods', JSON.stringify(goods))
                    updateGoods()
                }
            }
            Swal.fire(
                'Deleted',
                'Selected item has been deleted',
                'Success',
            )
        }
    })
})