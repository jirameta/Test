let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mysql = require('mysql');
const res = require('express/lib/response');
const { GEOMETRY } = require('mysql/lib/protocol/constants/types');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req, res) =>{
    return res.send({error : false, message: 'Welcome'})
});

app.listen(3000, () =>{
    console.log('Node is runnung on port 3000')
})

let dbCon=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'backend'
})
dbCon.connect();

app.get('/category',(req, res) =>{
    dbCon.query('SELECT * FROM category', (error, results, fields) =>{
        if(error) throw error;

        let message =""
        if(results === undefined || results.length ==0){
            message = "Item is empty";
        }else{
            message = "Successfully";
        }
        return res.send({ error: false, data: results, message: message});
    })
})

app.get('/filtersize/:size', (req, res) =>{
    let size = req.params.size;

    if(!size){
        return res.status(400).send( {error : true, message:"Please input size"});
    }else{
        dbCon.query("SELECT * FROM category WHERE size = ?", size, (error, results, fields) =>{
            if (error) throw error;

            let message= "" ;
            if(results === undefined||results.length == 0){
                message = "size not found";
            }else{
                message="Successfully";
            }
            return res.send({error:false, data:results[0], message:message})
        })
    }
})


app.get('/filtergender/:Gender', (req, res) =>{
    let Gender = req.params.Gender;

    if(!Gender){
        return res.status(400).send( {error : true, message:"Please input size"});
    }else{
        dbCon.query("SELECT * FROM category WHERE Gender = ?", Gender, (error, results, fields) =>{
            if (error) throw error;

            let message= "" ;
            if(results === undefined||results.length == 0){
                message = "size not found";
            }else{
                message="Successfully";
            }
            return res.send({error:false, data:results[0], message:message})
        })
    }
})

app.get('/filtergender/:Gender', (req, res) =>{
    let Gender = req.params.Gender;

    if(!Gender){
        return res.status(400).send( {error : true, message:"Please input size"});
    }else{
        dbCon.query("SELECT * FROM category WHERE Gender = ?", Gender, (error, results, fields) =>{
            if (error) throw error;

            let message= "" ;
            if(results === undefined||results.length == 0){
                message = "size not found";
            }else{
                message="Successfully";
            }
            return res.send({error:false, data:results[0], message:message})
        })
    }
})

app.get('/Show/:number',(req, res) =>{
    let number=req.params.number;

    dbCon.query('SELECT * FROM category WHERE categoryID <= ?', number, (error, results, fields) =>{
        if(error) throw error;

        let message =""
        if(results === undefined || results.length ==0){
            message = "Item is empty";
        }else{
            message = "Successfully";
        }
        return res.send({ error: false, data: results, message: message});
    })
})

app.post('/orderqty',(req, res) =>{
    let OrderID=req.body.OrderID;
    let categoryID=req.body.categoryID;
    let qty=req.body.qty;
    
    if(!OrderID ||!categoryID ||!qty ){
        return res.status(400).send({ error: true,message: "กรุณาใส่ข้อมูลให้ครบ"});
    } else{
        dbCon.query('INSERT INTO orderlist (OrderID, categoryID, qty) VALUES(?,?,?)', [OrderID, categoryID, qty], (error, results, fields) =>{
            if(error) throw error;
            return res.send({ error: false, data: results, message: "Successfully"});    
        })
    }
})

app.post('/address',(req, res) =>{
    let address=req.body.address;
    
    if(!address ){
        return res.status(400).send({ error: true,message: "กรุณาใส่ข้อมูลให้ครบ"});
    } else{
        dbCon.query('INSERT INTO address (address) VALUES(?)', [address], (error, results, fields) =>{
            if(error) throw error;
            return res.send({ error: false, data: results, message: "Successfully"});    
        })
    }
})

app.get('/paid/:start/:end',(req, res) =>{
    let start=req.params.start;
    let end=req.params.end;

    dbCon.query('SELECT * FROM orderdetail WHERE paidDate BETWEEN ? AND ?', [start,end], (error, results, fields) =>{
        if(error) throw error;

        let message =""
        if(results === undefined || results.length ==0){
            message = "Item is empty";
        }else{
            message = "Successfully";
        }
        return res.send({ error: false, data: results, message: message});
    })
})

app.get('/status/:status',(req, res) =>{
    let status=req.params.status;

    dbCon.query('SELECT * FROM orderdetail WHERE status = ?', [status], (error, results, fields) =>{
        if(error) throw error;

        let message =""
        if(results === undefined || results.length ==0){
            message = "Item is empty";
        }else{
            message = "Successfully";
        }
        return res.send({ error: false, data: results, message: message});
    })
})

app.get('/ShowOrder/:number',(req, res) =>{
    let number=req.params.number;

    dbCon.query('SELECT * FROM orderdetail WHERE orderID <= ?', number, (error, results, fields) =>{
        if(error) throw error;

        let message =""
        if(results === undefined || results.length ==0){
            message = "Item is empty";
        }else{
            message = "Successfully";
        }
        return res.send({ error: false, data: results, message: message});
    })
})

app.get('/ShowOrder/:number',(req, res) =>{
    let number=req.params.number;

    dbCon.query('SELECT * FROM orderdetail WHERE orderID <= ?', number, (error, results, fields) =>{
        if(error) throw error;

        let message =""
        if(results === undefined || results.length ==0){
            message = "Item is empty";
        }else{
            message = "Successfully";
        }
        return res.send({ error: false, data: results, message: message});
    })
})
module.exports=app;