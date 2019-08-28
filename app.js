const TelegramBot = require('node-telegram-bot-api');
const rateLimit = require("express-rate-limit");
const https = require('https');
const express = require('express');
const token = '913460024:AAEjbj03iJPz8UUWDynZgFpQOjp0lHgCvPA';
const app = express();

const bot = new TelegramBot(token, {polling: true});
var chatId;
var term;

var filter = function(arr){

    for(var i = 0; i < arr.length; i++){
        var j = i+1;       
        while(j < arr.length && arr[i]==arr[j]){
            arr.splice(j,1); 
        }
    }
   return arr;
}
function diffStr(str1,str2){
    
    for(var i = 0; i < str1.length; i ++){
        switch(str1[i]){
            case 'ә':
                str1[i] = 'а';
                break;
            case 'ғ':
                str1[i] = 'г';
                break;
            case 'қ':
                str1[i] = 'к';
                break;
            case 'ң':
                str1[i] = 'н';
                break;
            case 'ө':
                str1[i] = 'о';
                break;
            case 'ұ' || 'ү':
                str1[i] = 'у';
                break;
            case 'һ':
                str1[i] = 'х';
                break;
            case 'і' || 'ы':
                str1[i] = 'и';
                break;
            default:
                break;
        }
    }

    for(var i = 0; i < str2.length; i ++){
        switch(str2[i]){
            case 'ә':
                str2[i] = 'а';
                break;
            case 'ғ':
                str2[i] = 'г';
                break;
            case 'қ':
                str2[i] = 'к';
                break;
            case 'ң':
                str2[i] = 'н';
                break;
            case 'ө':
                str2[i] = 'о';
                break;
            case 'ұ' || 'ү':
                str2[i] = 'у';
                break;
            case 'һ':
                str2[i] = 'х';
                break;
            case 'і' || 'ы':
                str2[i] = 'и';
                break;
            default:
                break;
        }
    }

    str1 = filter(str1);
    str2 = filter(str2);
    if(str1.length != str2.length){
        return false;
    }
    
    let m = 0;
    for(var i = 0 ; i < str1.length; i ++){
        if(str1[i] != str2[i]){
            m++;
        }
    }
    if(m<3){
        return true;
    }else{
        return false;
    }
}

const apiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 2, // start blocking after 5 requests
    message:
      "Много запросов, попробуйте попытку через час"
  });
    bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    chatId = msg.chat.id;
    term = match[1];
    var url;
    // send back the matched "whatever" to the chat
     url = 'https://aiplus.t8s.ru/Api/V1/GetStudents?term='+encodeURIComponent(term)+'&authkey=0rIv3i28%2B%2F3%2BZnoZ8OtletTOrszxsDyvw0hX5n3oCBxMp9ZBjijUk2D1fTiLBwDX2WxkNM8NAlCXz4i25O%2FtLQ%3D%3D';
        var req =  https.get(url, (resp) => {
        let data = '';
        var message = '';
        console.log('statusCode:', resp.statusCode);
        console.log('headers:', resp.headers);

        resp.on('data',(chunk) =>{
            data +=chunk;
        });

        resp.on('end',()=>{
            var json = JSON.parse(data);
            var size = Object.keys(json['Students']).length;
            var student = json['Students'];
            if(size>5){
                bot.sendMessage(chatId, 'Напишите Имя или Фамилю полностью');
            }else if(size>=1 && size<4){
                student.map(function(record){
                    message += record['LastName'] + ' ' + record['FirstName'] +'\n';
                    record['ExtraFields'].map(function(fields){
                        switch(fields['Name']){
                            case 'Математика':
                                message +='Математика : ' + fields['Value'] + ' баллов\n';
                                break;
                            case 'Логика':
                                message +='Логика : ' + fields['Value'] + ' баллов\n';
                                break;
                            case 'Казахский':
                                message +='Казахский : ' + fields['Value'] + ' баллов\n';
                                break;
                            case 'Русский':
                                message +='Русский : ' + fields['Value'] + ' баллов\n';
                                break;
                            case 'Английский':
                                message +='Английский : ' + fields['Value'] + ' баллов\n';
                                break;
                            case 'Физика':
                                message +='Физика : ' + fields['Value'] + ' баллов\n';
                                break;
                            case 'Химия':
                                message +='Химия : ' + fields['Value'] + ' баллов\n';
                                break;
                            case 'Биология':
                                message +='Биологоия : ' + fields['Value'] + ' баллов\n';
                                break;
                            case 'История Казахстана':
                                message +='История Казахстана : ' + fields['Value'] + ' баллов\n';
                                break;
                            case 'Обучение грамоте':
                                message +='Обучение грамоте : ' + fields['Value'] + ' баллов\n';
                                break;
                            case 'Каллиграфия':
                                message +='Каллиграфия : ' + fields['Value'] + ' баллов\n';
                                break;
                            case 'География':
                                message +='География : ' + fields['Value'] + ' баллов\n';
                                break;
                            case 'Сауат Ашу':
                                message +='Сауат Ашу : ' + fields['Value'] + ' баллов\n';
                                break;
                            case 'Всемирная История':
                                message +='Всемирная История : ' + fields['Value'] + ' баллов\n';
                                break;
                            case 'Индивид':
                                message +='Индивид : ' + fields['Value'] + ' баллов\n';
                                break;
                            case 'Общий':
                                message +='Общий : ' + fields['Value'] + ' баллов\n';
                                break;
                            case 'Рейтинг':
                                message +='Рейтинг : ' + fields['Value']+ '\n';
                            default:
                                break;
                        }
                    });
                });
                bot.sendMessage(chatId, message);
                req.shouldKeepAlive = false;
            }else{
                bot.sendMessage(chatId, 'Подождите немного');
                    url = 'https://aiplus.t8s.ru/Api/V1/GetStudents?authkey=0rIv3i28%2B%2F3%2BZnoZ8OtletTOrszxsDyvw0hX5n3oCBxMp9ZBjijUk2D1fTiLBwDX2WxkNM8NAlCXz4i25O%2FtLQ%3D%3D';
                    https.get(url, (res) => {
                        let info = '';
                        let names = '';
                        res.on('data',(chunk) =>{
                            info += chunk;
                        });
                        res.on('end', () => {
                            let count = 0;
                            info =  JSON.parse(info);
                        let students = info['Students'];
                        students.map(function(record){
                                let name = record['LastName'] + ' ' + record['FirstName'];
                                let nme =  record['FirstName'] + ' ' + record['LastName'];
                                if(diffStr(term.toLocaleLowerCase().split(''),name.toLocaleLowerCase().split(''))==true || diffStr(term.toLocaleLowerCase().split(''),nme.toLocaleLowerCase().split(''))==true ){
                                    count++;
                                    names+=name+'\n';
                                }
                        });
                        if(count>0){
                            bot.sendMessage(chatId, 'Может вы имели ввиду \n' + names);
                        }else{
                            bot.sendMessage(chatId, 'Такого ученика нет');
                        }
                        });
                req.shouldKeepAlive = false;
                }).on("error", (err) => {
                    console.log("Error: " + err.message);
                });
            }
        });
        }).on("error", (err) => {
        console.log("Error: " + err.message);
        });
  });
  app.use(apiLimiter);
 
