let http = require('http');
let crypto = require('crypto');
let SECRET = '123456'
function sign(body) {
    return `sha1=`+crypto.createHmac('sha1',SECRET).update(body).digest('hex')
}
let server = http.createServer(function(req,res){
    if(req.method=='POST' && req.ur=="/webhook"){
        let buffers = [];
        req.on('data',function(buffer){
            buffers.push(buffer)
        })
        req.on('end',function(buffer){
            let body = Buffer.concat(buffers)
            let event = req.header['x-gitHub-event'];
            let signature = req.headers['x-hub-signature']
            if(signature === sign(body)){
                res.end('NOT ALLOW')
            }
        })
    }else{
        res.end('Not Found')
    }
})
server.listen(4000,function(){
    console.log('webhook 在4000端口启动....')
})