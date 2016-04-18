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

var sm=function(id,msg,time){
    time=time?time:0;
    setTimeout(function(){
        api.sendMessage(id,msg);
        console.log("bot"+" : "+msg);
    },time);
}
var sp=function(id,buffer,path){
    api.sendPhoto(id,{
        value: buffer,
        options: {
            filename: "1.png",
            contentType: 'image/png'
        }
    });
    console.log("bot send pic : "+path);
}

api.on('message',function(message){
    console.log(message.from.username+" : "+message.text)
    
    var text=message.text;
    
    if (text!=undefined){
        var id=message.chat.id;





        if(text=="jizz"){
            sm(id,"jizz弎洨");
        }
        else if(text=="正太"){
            sm(id,"我又不是TDC");
        }
        else if(text.indexOf("random")==0){
            var sub=text.substring(7,text.length);
            if(sub.indexOf("-s")==0){
                var ssub=sub.substring(3,sub.length);
                var spssub=ssub.split(" ");
                var length=spssub.length;
                var res=Math.floor(Math.random()*length);
                sm(id,spssub[res]);
            }
            else{
            var number=parseInt(sub);
                if(number){
                    var res=Math.floor(Math.random()*number)+1;
                    sm(id,res.toString());
                }
                else{
                    sm(id,"沒東西剌");
                }
            }
        }
        else if(text.indexOf("ramdom")==0){
            sm(id,"ramdom www");
            sm(id,"啥wwww");
        }
        else if(text=="瓦z"||text=="瓦Z"||text=="李睦樂"){
            var path=__dirname+"/../pic/wz.png"
            var imageBuffer=fs.createReadStream(path);
            sp(id,imageBuffer,path);
        }
        else if(text=="e04"){
            sm(id,"我懂");
        }
        else if(text=="乾"){
            sm(id,"大細乾");
        }
        else if(text=="幹"){
            sm(id,"幹你妹");
            sm(id,"你沒有妹妹www",100);
            sm(id,"~ TDC",200);
        }
        else if(text=="time"){
            var d=new Date();
            var month=d.getMonth()+1;
            var hour=d.getHours();
            var min=d.getMinutes();
            var sec=d.getSeconds();
            if(hour<10){
                hour="0"+hour;
            }
            if(min<10){
                min="0"+min;
            }
            if(sec<10){
                sec="0"+sec;
            }
            sm(id,d.getFullYear()+"/"+month+"/"+d.getDate()+" "+hour+":"+min+":"+sec);
        }
        else if(text.indexOf("list")==0){
            var sub=text.substring(5,text.length);
            if(sub!=""){console.log("jizz");
                if(sub.indexOf("random")==0){
                    sm(id,"random <how much>");
                    sm(id,"├if <how much> > 0, return random number 1~<how much>",120);
                    sm(id,"└if <how much> < 0, return random number 0~<how much>",200);
                    sm(id,"random -s [thing,[things ...]]",300);
                    sm(id,"└return thing in things",400);
                }
                else{
                    sm(id,"nothing more!");
                }
            }
            else{
                sm(id,"list");
                sm(id,"random");
                sm(id,"time");
            }
            
        }
        else{
            sm(id,"wtf are you talking(?)");
        }



    }
})
