var config=require("../config");
var TGAPI=require("./tgapi")

var api=new TGAPI(config.token)

var fs=require('fs');

var botInfo=null;

api.getMe(function(err,data)
{
    if(err){
        console.error(err);
    }
    var output="";
    output=data.username+" start working\n";
    console.log(output);
    botInfo=data;
    api.startPolling(40);
});

var sm=function(id,msg){
    api.sendMessage(id,msg);
    console.log("bot"+" : "+msg);
}
var sp=function(id,pic){
    api.sendPhoto(id,pic);
}

api.on('message',function(message){
    console.log(message.from.username+" : "+message.text)
    
    var text=message.text;
    
    if (text!=undefined){
        var id=message.chat.id;


var imageBuffer=fs.createReadStream('./1.png');
sp(id,{
    value: imageBuffer,
    options:{
        filename: '1.png',
        contentType:'image/png'
    }
});



        if(text=="jizz"){
            sm(id,"jizz弎洨");
        }
        else if(text=="正太"){
            sm(id,"我又不是TDC");
        }
        else if(text.indexOf("random")==0){
            var sub=text.substring(7,text.length);
            var number=parseInt(sub);
            if(number){
                var res=Math.floor(Math.random()*number)+1;
                sm(id,res.toString());
            }
            else{
                sm(id,"沒東西剌");
            }
        }
        else if(text.indexOf("ramdom")==0){
            sm(id,"ramdom www");
            sm(id,"啥wwww");
        }
    }
})
