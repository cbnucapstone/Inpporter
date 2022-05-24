const spawn = require('child_process').spawn

const stt = (req,res)=>{
//VoiceRecord.js에서 버튼 클릭시 sttTry.py을 실행
    const net = spawn('python',['./routes/data/sttTry.py']);
    net.stdout.on('data', function(data) {
        console.log(data.toString());
    })
    net.stderr.on('data', function(data) {
        console.log(data.toString());
    });
    return console.log(req.body); // 버튼 클릭했을 때 서버 연동 잘 됐나 보려고,, 호출 시 { server : 'HI' } 전달 해서 프린트
};


module.exports ={
    stt
};