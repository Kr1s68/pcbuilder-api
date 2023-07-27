const express = require('express')
const app = express()
const mysql2 = require('mysql2')
const cors = require('cors')
const axios = require('axios');
const cheerio = require('cheerio');
const Pool = require('pg').Pool


app.use(cors())
app.use(express.json())

const db = new Pool({
  user: 'yhxlvflz',
  host: 'snuffleupagus.db.elephantsql.com',
  database: 'yhxlvflz',
  password: 'Cpz6Nn8b5wTYqY6So9Q18Hn1FAvcMzLQ',
  port: 5432,
})


async function getPrices(ItemModel,Price){
    //console.log(ItemModel)
    let items = [{}]
    const response = await axios.get(`https://www.pazaruvaj.com/CategorySearch.php?orderby=1&st=${ItemModel.replace(/\s/g,"+")}`)
    const $ = cheerio.load(response.data);
    for(const element of $("div.clearfix")){
        const link = $(element).find('a.button-orange').attr('href');
        if(link===undefined)
        continue
             await getSpecificPrice(link, items,Price)
            }
        return items    
}
async function getSpecificPrice(link, items,Price){
    const response2 = await axios.get(link)
        const $ = cheerio.load(response2.data);
        $("div.optoffer").each((i,element) =>{
                const price = parseInt($(element).find('div.row-price').text().substring(0,$(element).find('div.row-price').text().charAt('лв')+1))
                //console.log(price)
                if(price > (parseInt(Price) - 50) && price < (parseInt(Price) + 50)){
                    const linkToStore = $(element).find('a.jumplink-overlay').attr('href');
                    const nameOfStore = $(element).find('div.shopname').text()
                    const name = $(element).find("div.col-name").text().split("\n")[0]
                    items[i] = {price, linkToStore, nameOfStore, name}   
                }
                
        })
}


app.get('/api/data/getItemInfo',async (req,res) => {
    try{
        res.send(await getPrices(req.query.Item, req.query.Price))

    }catch(err){
        console.log(err)
    }
})

app.post('/api/data/createUser',(req,res) => {
    console.log(req.body)
    
          const email = req.body.email
          const admin = req.body.admin
    
      db.query(
        
      'INSERT INTO users (email, admin) VALUES (?,?)',
      
      [email, admin],
      
      (err,result) => {

        if(err){
            console.log(err)
        }else{
            res.send('values inserted')
        }

      })

})

app.post('/api/data/createCpu',(req,res) => {
    console.log(req.body)
    
          const Model = req.body.Model + ", "
          const Socket = "Сокет: " + req.body.Socket +", "
          const CoreCount = "Брой ядра: " + req.body.CoreCount +", "
          const ThreadCount = "Брой нишки: " + req.body.ThreadCount + ", "
          const NodeProcess = "Честота на ядрото: " + req.body.NodeProcess + ", "
          const CoreFrequency = req.body.CoreFrequency + ", "
          const Price = req.body.Price
    
      db.query(
        
      'INSERT INTO cpus (Model, Socket, CoreCount, ThreadCount, NodeProcess, CoreFrequency, Price) VALUES (?,?,?,?,?,?,?)',
      
      [Model, Socket, CoreCount, ThreadCount, NodeProcess,CoreFrequency, Price],
      
      (err,result) => {

        if(err){
            console.log(err)
        }else{
            res.send('values inserted')
        }

      })

})

app.post('/api/data/createMotherboard',(req,res) => {
    console.log(req.body)
    
          const Model = req.body.Model + ", "
          const Socket = "Сокет: " + req.body.Socket +", "
          const Chipset = "Чипсет: " + req.body.Chipset +", "
          const Memory = "Тип на паметта: " + req.body.Memory + ", "
          const FormFactor = "Размер: " + req.body.FormFactor + ", "
          const Price = req.body.Price
    
      db.query(
        
      'INSERT INTO motherboards (Model, Socket, Chipset, Memory, FormFactor, Price) VALUES (?,?,?,?,?,?)',
      
      [Model, Socket, Chipset, Memory, FormFactor, Price],
      
      (err,result) => {

        if(err){
            console.log(err)
        }else{
            res.send('values inserted')
        }

      })

})

app.post('/api/data/createGpu',(req,res) => {
    console.log(req.body)
    
          const Model = req.body.Model + ", "
          const Memory = "Памет: " + req.body.Memory + ", "
          const CoreFrequency = "Честота на ядрото: " + req.body.CoreFrequency +", "
          const BoostCoreFrequency = "Честота на ядрото под натоварване: " + req.body.BoostCoreFrequency +", "
          const Interface = "Интерфейс: " + req.body.Interface + ", "
          const TDP = req.body.TDP + ", "
          const Price = req.body.Price
    
      db.query(
        
      'INSERT INTO gpus (Model, Memory, CoreFrequency, BoostCoreFrequency, Interface, TDP, Price) VALUES (?,?,?,?,?,?,?)',
      
      [Model, Memory, CoreFrequency, BoostCoreFrequency, Interface, TDP, Price],
      
      (err,result) => {

        if(err){
            console.log(err)
        }else{
            res.send('values inserted')
        }

      })

})

app.post('/api/data/createMemory',(req,res) => {
    console.log(req.body)
    
          const Model = req.body.Model + ", "
          const Size = req.body.Size + ", "
          const Speed = req.body.Speed +", "
          const Latency = req.body.Latency +", "
          const Price = req.body.Price
    
      db.query(
        
      'INSERT INTO memory (Model, Size, Speed, Latency, Price) VALUES (?,?,?,?,?)',
      
      [Model, Size, Speed, Latency, Price],
      
      (err,result) => {

        if(err){
            console.log(err)
        }else{
            res.send('values inserted')
        }

      })

})

app.post('/api/data/createStorage',(req,res) => {
    console.log(req.body)
    
          const Model = req.body.Model + ", "
          const Size = req.body.Size + ", "
          const Interface = req.body.Interface +", "
          const Speed = req.body.Speed +", "
          const Price = req.body.Price
    
      db.query(
        
      'INSERT INTO storage (Model, Size, Interface, Speed, Price) VALUES (?,?,?,?,?)',
      
      [Model, Size, Interface, Speed, Price],
      
      (err,result) => {

        if(err){
            console.log(err)
        }else{
            res.send('values inserted')
        }

      })

})

app.post('/api/data/createCase',(req,res) => {
    console.log(req.body)
    
          const Model = req.body.Model + ", "
          const FormFactor = req.body.FormFactor +", "
          const Size = req.body.Size + ", "
          const Color = req.body.Color +", "
          const Price = req.body.Price
    
      db.query(
        
      'INSERT INTO cases (Model, FormFactor, Size, Color, Price) VALUES (?,?,?,?,?)',
      
      [Model,FormFactor, Size, Color, Price],
      
      (err,result) => {

        if(err){
            console.log(err)
        }else{
            res.send('values inserted')
        }

      })

})

app.post('/api/data/createPsu',(req,res) => {
    console.log(req.body)
    
          const Model = req.body.Model + ", "
          const PowerStandard = req.body.PowerStandard + ", "
          const Power = req.body.Power +", "
          const FormFactor = req.body.FormFactor +", "
          const Usability = req.body.Usability +", "
          const Price = req.body.Price
    
      db.query(
        
      'INSERT INTO psus (Model, PowerStandard, Power, FormFactor, Usability, Price) VALUES (?,?,?,?,?,?)',
      
      [Model, PowerStandard, Power, FormFactor, Usability, Price],
      
      (err,result) => {

        if(err){
            console.log(err)
        }else{
            res.send('values inserted')
        }

      })

})

app.post('/api/data/createArticle',(req,res) => {
    console.log(req.body)
    
          const Introduction = req.body.Introduction
          const CPU = req.body.CPU
          const Motherboard = req.body.Motherboard
          const Storage = req.body.Storage
          const GPU = req.body.GPU
          const Case = req.body.Case
          const PSU = req.body.PSU
          const Memory = req.body.Memory
    
      db.query(
        
      `UPDATE builds.article SET Introduction = ?, article.CPU = ?, Motherboard = ?, Storage = ?, article.GPU = ?, article.Case = ?, article.PSU = ?, Memory = ? WHERE idarticle = ${req.body.id}`,
      
      [Introduction, CPU, Motherboard, Storage, GPU, Case, PSU, Memory],
      
      (err,result) => {

        if(err){
            console.log(err)
        }else{
            res.send('values inserted')
        }

      })

})

app.post('/api/data/checkAdmin',(req,res) => {
    if(!req.body.email)
        return res.status(400)

    db.query(`SELECT * FROM users WHERE email ="${req.body.email}" and admin=1`, (err, result) => {
        if(err || result.length <= 0)
            return res.status(200).json({isAdmin: false});
        else
            return res.status(200).json({isAdmin: true});
    })


})

app.post('/api/data/saveBuild',(req,res) => {
    console.log(req.body)
    
       const user = req.body.currentBuild.user
       const CPU = req.body.currentBuild.CPU
       const Motherboard = req.body.currentBuild.Motherboard
       const GPU = req.body.currentBuild.GPU
       const Memory = req.body.currentBuild.Memory
       const Storage = req.body.currentBuild.Storage
       const Case = req.body.currentBuild.Case
       const PSU = req.body.currentBuild.PSU
       const PRICE = req.body.currentBuild.PRICE

      db.query(
        
      'INSERT INTO builds.savedbuilds (user, CPU, Motherboard, GPU, Memory, Storage, savedbuilds.Case, PSU, PRICE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',

      [user, CPU, Motherboard, GPU, Memory, Storage, Case, PSU,PRICE],
      
      (err,result) => {

        if(err){
            console.log(err)
        }else{
            res.send('values inserted')
        }

      }
      
      )

})


app.post('/api/data/deleteBuild',(req,res) => {
    console.log(req.body)

      db.query(
        
       `DELETE FROM builds.savedbuilds WHERE (idsavedBuilds = '${req.body.id}');`
      
      )

})

app.get('/api/data/loadArticle',(req,res) => {

    db.query(`SELECT * FROM article WHERE idarticle = ${req.query.id}`, (err, result) => {

        if(err){

            console.log(err) 

        }else{

            res.send(result)
        }

    })


})

app.get('/api/data/loadBuild',(req,res) => {

    db.query(`SELECT * FROM savedbuilds WHERE user = "${req.query.email}"`, (err, result) => {

        if(err){

            console.log(err) 

        }else{

            res.send(result)
        }

    })


})

app.get('/api/data/PSUS',(req,res) => {

    db.query("SELECT * FROM psus ORDER BY Price", (err, result) => {

        if(err){

            console.log(err) 

        }else{

            res.send(result)
        }

    })


})

app.get('/api/data/Cases',(req,res) => {

    db.query("SELECT * FROM cases ORDER BY Price", (err, result) => {

        if(err){

            console.log(err) 

        }else{

            res.send(result)
        }

    })


})

app.get('/api/data/Storage',(req,res) => {

    db.query("SELECT * FROM storage ORDER BY Price", (err, result) => {

        if(err){

            console.log(err) 

        }else{

            res.send(result)
        }

    })


})

app.get('/api/data/Memory',(req,res) => {

    db.query("SELECT * FROM memory ORDER BY Price", (err, result) => {

        if(err){

            console.log(err) 

        }else{

            res.send(result)
        }

    })


})

app.get('/api/data/Cpus',(req,res) => {

    db.query("SELECT * FROM cpus ORDER BY Price", (err, result) => {

        if(err){

            console.log(err) 

        }else{

            res.send(result)
        }

    })


})

app.get('/api/data/Motherboards',(req,res) => {

    db.query("SELECT * FROM motherboards ORDER BY Price", (err, result) => {

        if(err){

            console.log(err) 

        }else{

            res.send(result)
        }

    })


})

app.get('/api/data/Gpus',(req,res) => {

    db.query("SELECT * FROM gpus ORDER BY Price", (err, result) => {

        if(err){

            console.log(err) 

        }else{

            res.send(result)
        }

    })


})

app.listen(process.env.PORT || 3001, () => {
    console.log("server is running on: " + process.env.PORT)
})