const express = require('express')

const app = express()

let a=true
let data=''
let url =''

app.use('/',express.static(__dirname+'/public/'))

app.set('view engine','hbs')

function decryption (data) {
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


function decrypt(req,res,next) {
    if (req.query.inp) {
        let encrypt_data=req.query.inp
        let decrypt_data = decryption(encrypt_data)
        req.query.inp=decrypt_data
        next()
    }
} 

function decode(req,res,next) {
    if (req.query.inp) {
        let decrypt_data=req.query.inp
        let decode_data=Buffer.from(decrypt_data,'base64').toString('ascii')
        req.query.inp=decode_data
        next()
    }
}

app.get('/',(req,res)=>{
    res.render(__dirname+'/views/index.hbs',{
        b:url
    })
})

let arr=[]
app.get('/submit',decrypt,decode,(req,res)=>{
    if (req.query.inp) {
        data= req.query.inp
        arr.push(data)
        a=false
        res.redirect('/home')
    }
    
})

app.get('/home',(req,res)=>{
        res.render(__dirname+"/views/home.hbs",{
                list:arr
            })  
    
        url = req.protocol+"://"+req.get('host')+req.originalUrl
       if(!a){
        a=true
        res.redirect('/')
       }
       
   } 
)


const port= process.env.PORT || 3333
app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})

