let http = require('http');
let server = http.createServer(function(req,res){
    if(req.method=='POST' && req.ur=="/webhook"){
        res.setHeader('Content-Type','application/json');
        res.end(JSON.stringify({ok:true}))
    }else{
        res.end('Not Found')
    }
})
server.listen(4000,function(){
    console.log('webhook 在4000端口启动....')
})