var fs = require('fs');

var operator = process.argv[2];
var num = process.argv[3];

fs.readFile('bank.txt', 'utf8', function(error, number){
    if (error){
        return console.log(error);
    } else {
        if (operator == 'total'){
            var numArr = number.split(',').map(Number).reduce((a, b) => a + b, 0);
            console.log('You have $' + numArr + ' in your account.');
        } else if (operator == 'deposit') {
            deposit();
        } else if (operator == 'withdraw') {
            var total = number.split(',').map(Number).reduce((a, b) => a + b, 0);
            if (total - parseInt(num) < 0){
                console.log('Cannot make withdraw. Please check balance.');
            } else {
                withdraw();
            }
        }
    }
});

function deposit(){
    fs.appendFile('bank.txt', ', ' + num, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log('Deposited $' + num);
        }
    });
};

function withdraw(){
    fs.appendFile('bank.txt', ', -' + num, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log('Withdrew $' + num);
        }
    });
}