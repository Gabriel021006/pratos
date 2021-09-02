const express = require ("express");
const app = express(); 
const bodyParser = require ("body-parser");
const { urlencoded } = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/aprendendomongo",{useNewUrlParser:true,useUnifiedTopology:true});
const itensModel = require("./pratos")
const cors = require ("cors")
app.use (cors());
app.use(cors());
app.use (bodyParser.urlencoded({extended:false}));
app.use (bodyParser.json());
const usuario = mongoose.model("Usuarios",itensModel)
const jwt = require("jsonwebtoken");
const JWTSecret = "jjkjsjdssllldldsdsdjdksjkdsjhjhjhllhjls"

function auth(req,res,next){
const authToken = req.headers['authorization']

if(authToken != undefined){

    const bearer = authToken.split(' ');
    var token = bearer[1];

    jwt.verify(token,JWTSecret,(err, data) => {
        if(err){
            res.status(401);
            res.json({err:"Token inválido!"});
        }else{

            req.token = token;
            req.loggedUser = {id: data.id,email: data.email};               
            next();
        }
    });
}else{
    res.status(401);
    res.json({err:"Token inválido!"});
} 
}


app.get("/usuarios",auth,(req , res)=>{
    res.statusCode = 200;



    Usuario.find({}).then(usuario =>{
        res.json(usuarios);
        }).catch(err =>{
            console.log(err)
        })
        
    
})

app.get("/pras/:id",auth,(req , res)=>{

    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
       var id = parseInt(req.params.id);
    
       var usuarios = 
       Usuario.find({}).then(usuarios =>{
           res.json(usuarios);
           }).catch(err =>{
               console.log(err)
           }).find(g =>g.id == id);
    
    
       if(usuarios !=undefined){
           res.json(usuarios);
       }else{
           res.sendStatus(404);
       }
    }
    });

    app.get("/usuario/:id",auth,(req,res)=>{
        if(isNaN(req.params.id)){
            res.sendStatus(400)
        }else{
           var id = parseInt(req.params.id);
        
           var usuario = 
           Usuario.find({}).then(usuarios =>{
               res.json(usuarios);
               }).catch(err =>{
                   console.log(err)
               }).find(g =>g.id == id);
        
        
           if(usuario !=undefined){
               res.json(usuario);
           }else{
               res.sendStatus(404);
           }}
        }); 


    app.post("/usuario",auth,(req,res)=>{
        var { nomeDoPrato, valorDoPrato, imagemDoPrato, descricaoPrato } = req.body;
      
        const artigo = new Prato({nomeDoPrato:nomeDoPrato,valorDoPrato:valorDoPrato,imagemDoPrato:imagemDoPrato})
        artigo.save().then(()=>{
            console.log("Artigo salvo!")
        }).catch(err=>{
            console.log(err);
        })
    
    res.sendStatus(200);
    })
    
    app.delete("/pratos/:id",auth,(req,res)=>{
    
        Prato.findByIdAndDelete("").then(()=>{
            console.log("Dado removido")
        }).catch(err =>{
            console.log(err)
        })
        
        })

    app.post("/auth",(req,res)=>{
        var {email, password} = req.body;

        if(email != undefined){
    
            var user = usuario.find(u => u.email == email);
            if(user != undefined){
                if(user.password == password){
                    jwt.sign({id: user.id, email: user.email},JWTSecret,{expiresIn:'48h'},(err, token) => {
                        if(err){
                            res.status(400);
                            res.json({err:"Falha interna"});
                        }else{
                            res.status(200);
                            res.json({token: token});
                        }
                    })
                }else{
                    res.status(401);
                    res.json({err: "Credenciais inválidas!"});
                }
            }else{
                res.status(404);
                res.json({err: "O E-mail enviado não existe na base de dados!"});
            }
    
        }else{
            res.status(400);
            res.send({err: "O E-mail enviado é inválido"});
        }
    })
    
   
app.listen(9090,()=>{
console.log("api rodando")
});