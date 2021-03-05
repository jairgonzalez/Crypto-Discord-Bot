const token = require('./config/token')
const request = require("request");

const { Client, Attachment, MessageEmbed } = require('discord.js');
const bot = new Client();

const PREFIX = ">"
var i;
var version = "1.0";
var coins = ["btc", "eth", "link", "xlm", "aave", "xtz","bat"];
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }
bot.on('ready', () => {
    console.log('the bot is online...........');
})

bot.on('guildMemberAdd', member => {

    const channel = member.guild.channels.find(channel => channel.name === "Welcome");
    if (!channel) return;

    channel.send("Welcome to the channel, ${member}")

});

bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");

    function getPrice(coin) {
        var price;
        var URL = "https://min-api.cryptocompare.com/data/price?fsym="
        var EndURL = "&tsyms=USD";
        request.get(URL + coin + EndURL, function (error, response, body) {
            if (error)
                throw error;
            else if (!response)
                throw new Error("no response");
            else if (response.statusCode != 200)
                throw new Error("bad response");
            else
                price = JSON.parse(body);
            if (coin == "btc"){
                message.channel.send("```Current Price of Bitcoin: $" + price.USD + " USD```");
            }
            if (coin == "eth"){
                message.channel.send("```Current Price of Etheruem: $"  + price.USD + " USD```");
            }
            if (coin == "bat"){
                message.channel.send("```Current Price of Basic Attention token: $"  + price.USD + " USD```");
            }
            if (coin == "aave"){
                message.channel.send("```Current Price of AAVE token: $"  + price.USD + " USD```");
            }
            if (coin == "xtz"){
                message.channel.send("```Current Price of Tezos coin: $"  + price.USD + " USD```");
            }
            if (coin == "link"){
                message.channel.send("```Current Price of link: $"  + price.USD + " USD```");
            }
            if (coin == "xlm"){
                message.channel.send("```Current Price of Stellar Lumens: $"  + price.USD + " USD```");
            }
        });
    }
    async function getAllPrices(){
        for ( i = 0; i < coins.length; i++){
            getPrice(coins[i]);
            await sleep(60);
        }
    }
    switch (args[0]) {
        case 'version':
            message.channel.send('We are on version: ' + version);
            break;
        case "btc":
            getPrice("btc");
            break;
        case "eth":
           getPrice("eth")
            break;
        case "bat":
            getPrice("bat");
            break;
        case "link":
            getPrice("link");
            break;
        case "aave":
            getPrice("aave");
            break;
        case "xtz":
            getPrice("xtz");
            break;
        case "xlm":
            getPrice("xlm");
            break;
        case "all":
            getAllPrices();
            break;
    }

});

bot.login(token);