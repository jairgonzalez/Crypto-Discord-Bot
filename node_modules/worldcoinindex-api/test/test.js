'use strict';

const Config = require('./testConfig.json');
var expect = require('chai').expect;
const WorldCoinIndex = require('../index');

describe('#WorldCoinIndex', function() {
	it('should be defined', function() {
		expect(WorldCoinIndex).to.exist;
	});

	it('should return WorldCoinIndex client', function() {
		const client = new WorldCoinIndex(Config.key);
		expect(client.getTicker).to.exist;
		expect(client.getMarkets).to.exist;
	});

	it('should get ticker information', async function() {
		const client = new WorldCoinIndex(Config.key);
		var ticker = await client.getTicker('eth', 'btc');
		expect(ticker).to.be.an('object');
		expect(ticker['Markets']).to.have.lengthOf(1);
		expect(ticker['Markets'][0]['Label']).to.equal('ETH/BTC');
		expect(ticker['Markets'][0]['Name']).to.equal('Ethereum');
		expect(ticker['Markets'][0]['Price']).to.be.a('number');
		expect(ticker['Markets'][0]['Volume_24h']).to.be.a('number');
		expect(ticker['Markets'][0]['Timestamp']).to.be.a('number');
	});

	it('should get information on tickers', async function() {
		const client = new WorldCoinIndex(Config.key);
		var tickers = await client.getTickers(['eth', 'ltc', 'ven'], 'btc');
		expect(tickers).to.be.an('object');
		expect(tickers['Markets']).to.have.lengthOf(3);
		expect(tickers['Markets'][0]['Label']).to.equal('ETH/BTC');
		expect(tickers['Markets'][0]['Name']).to.equal('Ethereum');
		expect(tickers['Markets'][1]['Label']).to.equal('LTC/BTC');
		expect(tickers['Markets'][1]['Name']).to.equal('Litecoin');
		expect(tickers['Markets'][2]['Label']).to.equal('VEN/BTC');
		expect(tickers['Markets'][2]['Name']).to.equal('Vechain');
		for (var i = 0; i < 3; i++) {
			expect(tickers['Markets'][i]['Price']).to.be.a('number');
			expect(tickers['Markets'][i]['Volume_24h']).to.be.a('number');
			expect(tickers['Markets'][i]['Timestamp']).to.be.a('number');
		}
	});

	it('should get markets information', async function() {
		const client = new WorldCoinIndex(Config.key);
		var markets = await client.getMarkets('btc');
		expect(markets).to.be.an('object');
	});
});