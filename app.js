//Import Stellar SDK
var StellarSdk = require('stellar-sdk');
var pair = StellarSdk.Keypair.random();
var request = require('request');

//Generate keypair
var pair = StellarSdk.Keypair.random();

//Instantiate Stellar Test-net instance 
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

//Generate the seed
pair.secret();

//Generate the public key
pair.publicKey();

//Contact friendbot on Stellar network to create an account 
request.get({
    url: 'https://horizon-testnet.stellar.org/friendbot',
    qs: { addr: pair.publicKey() },
    json: true
}, function(error, response, body) {
    if(error || response.statusCode !== 200) {
        console.log('ERROR!', error || body);
    }
    else {
        console.log('SUCCESS! Account created :)');
        console.log(body);
        //Fetch account details
        server.loadAccount(pair.publicKey()).then(function(account) {
            console.log('Balance for account: ' + pair.publicKey());
            account.balances.forEach(balance => {
                console.log('Type: ', balance.asset_type, 'Balance: ', balance.balance);
            });
        })
    }
});
