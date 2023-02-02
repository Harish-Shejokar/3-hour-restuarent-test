
let AddToBill = document.getElementById("btn");

AddToBill.addEventListener("click" , addOrderToCrudCrud);

function addOrderToCrudCrud(event){
    event.preventDefault();
    // console.log("working")

    let price = document.getElementById("price").value;
    let dish = document.getElementById("dish").value;
    let table = document.getElementById("table").value;

    if(price ==='' || dish==='' || table ===''){
        confirm('price , dish and table number required');
        return
    }

    // console.log(price +" " +dish + " " + table)


    let obj = {
        price,
        dish,
        table
    }

    axios
        .post(`https://crudcrud.com/api/94271cf58bdd4dd683c51dfdb9a7b95d/OrderData`,obj)
        .then(res =>{
            // console.log(res.data._id);
            let ID = res.data._id;
            showOrderOnUI(ID);
        })
        .catch(err => console.log(err));
}


function showOrderOnUI(ID){

    document.getElementById("price").value = ''
    document.getElementById("dish").value = 'Dish'
    document.getElementById("table").value = 'table'


    axios
        .get(`https://crudcrud.com/api/94271cf58bdd4dd683c51dfdb9a7b95d/OrderData/${ID}`)
        .then(res => {
            // console.log(res.data.table)
            let table = res.data.table;
            let price = res.data.price;
            let dish  = res.data.dish;
            

                let parentElem = document.getElementById(table);
                let childElem = `<li id='${ID}'>  ${price} - ${dish} - ${table} 
                <button class="btn btn-danger mb-2" onclick=deleteOrder('${ID}') >Delete Order</button>
                </li>`

                parentElem.innerHTML = parentElem.innerHTML + childElem;

            // }else if(table === 'table-2'){
            //     let parentElem = document.getElementById('table-2');
            //     let childElem = `<li id='${ID}'> ${dish} ${table} - ${price}
            //     <button onclick=deleteOrder('${ID}')>Delete</button>
            //     </li>`

            //     parentElem.innerHTML = parentElem.innerHTML + childElem;


            // }else{

            //     let parentElem = document.getElementById('table-3');
            //     let childElem = `<li id='${ID}'> ${dish} ${table} - ${price}
            //     <button onclick=deleteOrder('${ID}')>Delete</button>
            //     </li>`

            //     parentElem.innerHTML = parentElem.innerHTML + childElem;

            // }
            

        }).catch(err => console.log(err));
}



function deleteOrder(ID){

    // console.log(ID)

    removeOrderFromUI(ID)
    axios
        .delete(`https://crudcrud.com/api/94271cf58bdd4dd683c51dfdb9a7b95d/OrderData/${ID}`)
        .then(res => {
            // console.log(res);
            // console.log();
            
        })
        .catch(err => console.log(err));

    
}

function removeOrderFromUI(ID){

    axios
    .get(`https://crudcrud.com/api/94271cf58bdd4dd683c51dfdb9a7b95d/OrderData/${ID}`)
    .then(res =>{
    
            let table = res.data.table;
            console.log(table)
            let parentElem = document.getElementById(table);

            let childElem = document.getElementById(ID);
            // console.log(childElem)
            parentElem.removeChild(childElem);       
        })
            
}


document.addEventListener('DOMContentLoaded' , ()=>{

    axios   
    .get(`https://crudcrud.com/api/94271cf58bdd4dd683c51dfdb9a7b95d/OrderData`)
    .then(res =>{
        // console.log(res.data)

        res.data.forEach(element => {
            // console.log(element._id);
            showOrderOnUI(element._id)
        })


    })
    .catch(err => console.log(err));

})
