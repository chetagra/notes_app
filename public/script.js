let btn = document.querySelector('#btn')
let inpbox = document.querySelector('#inpbox')
let myForm = document.querySelector('#myForm')
let inpAuto = document.querySelector('#inpAuto')


myForm.addEventListener('submit',order_execution)


function order_execution() {
   let data =inpbox.value
   let encoded_data=btoa(data)
   let encrypt_data=encrypt(encoded_data)
   inpbox.value=encrypt_data
}

function encrypt(data) {
   let encrypt_data=''
   for (let index = 0; index < data.length; index++) {
         
      if (data.charAt(index)>='a' && data.charAt('index')<='z') {
         encrypt_data+= data.charAt(index).toUpperCase()
      } 
      else {
         encrypt_data+= data.charAt(index).toLowerCase()
      }
   
   }
   return encrypt_data
}
