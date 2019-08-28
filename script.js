

function searchStudentAPI(name){
      var message = '';
    var req =  https.get(url, (resp) => {
        let data = '';
        console.log('statusCode:', resp.statusCode);
        console.log('headers:', resp.headers);

        resp.on('data',(chunk) =>{
            data +=chunk;
        });

        resp.on('end',()=>{
            var json = JSON.parse(data);
            var student = json['Students'];
            student.map(function(record){
                message += record['LastName'] + ' ' + record['FirstName']+'\n';
                record['ExtraFields'].map(function(fields){
                    switch(fields['Name']){
                        case 'Математика':
                            message +='Математика : ' + fields['Value'] + ' балов\n';
                            break;
                        case 'Логика':
                            message +='Логика : ' + fields['Value'] + ' балов\n';
                            break;
                        case 'Казахский':
                            message +='Казахский : ' + fields['Value'] + ' балов\n';
                            break;
                        case 'Русский':
                            message +='Русский : ' + fields['Value'] + ' балов\n';
                            break;
                        case 'Английский':
                            message +='Английский : ' + fields['Value'] + ' балов\n';
                            break;
                        case 'Физика':
                            message +='Физика : ' + fields['Value'] + ' балов\n';
                            break;
                        case 'Химия':
                            message +='Химия : ' + fields['Value'] + ' балов\n';
                            break;
                        case 'Биология':
                            message +='Биологоия : ' + fields['Value'] + ' балов\n';
                            break;
                        case 'История Казахстана':
                            message +='История Казахстана : ' + fields['Value'] + ' балов\n';
                            break;
                        case 'Обучение грамоте':
                            message +='Обучение грамоте : ' + fields['Value'] + ' балов\n';
                            break;
                        case 'Каллиграфия':
                            message +='Каллиграфия : ' + fields['Value'] + ' балов\n';
                            break;
                        case 'География':
                            message +='География : ' + fields['Value'] + ' балов\n';
                            break;
                        case 'Сауат Ашу':
                            message +='Сауат Ашу : ' + fields['Value'] + ' балов\n';
                            break;
                        case 'Всемирная История':
                            message +='Всемирная История : ' + fields['Value'] + ' балов\n';
                            break;
                        case 'Индивид':
                            message +='Индивид : ' + fields['Value'] + ' балов\n';
                            break;
                        case 'Общий':
                            message +='Общий : ' + fields['Value'] + ' балов\n';
                            break;
                        case 'Рейтинг':
                            message +='Рейтинг : ' + fields['Value'];
                        default:
                            break;
                    }
                });
            });
            
        })
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
    req.shouldKeepAlive = false;

    console.log('my message:' + message);
    return message;
}

module.exports = {
    searchStudentAPI: searchStudentAPI
}