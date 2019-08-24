let http = require('http');
let crypto = require('crypto');
let {spawn} = require('child_process') //为了不阻塞档期那的进程，要开个子进程
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
                return res.end('NOT ALLOW')
            }
            res.setHeader('Content-Type','application/json')
            res.end(JSON.stringify({ok:true}))
            if(event=='push'){
                let payload = JSON.parse(body);
                //返回一个子进程
                let child = spawn('sh',[`./${payload.repository.name}.sh`]);
                let buffers = [];
                child.stdout.on('data',function(buffer){
                    buffers.push(buffer)
                })
                child.stdout.on('end',function(buffer){
                    let log = Buffer.concat(buffers)
                    console.log(log)
                })
            }

        })
    }else{
        res.end('Not Found')
    }
})
server.listen(4000,function(){
    console.log('webhook 在4000端口启动....')
})