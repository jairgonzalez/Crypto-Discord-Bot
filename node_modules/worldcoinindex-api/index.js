'use script';

const fetch = require('node-fetch');

class WorldCoinIndex {
	
	/**
	 *	Creates an instance of WorldCoinIndex
	 *	@param {string} key WorldCoinIndex API key
	 *	@example
	 *	const client = new WorldCoinIndex('toe48ute93m34notarealkey');
	 */
	constructor(key) {
		this.key = key;
		this.baseUrl = 'https://www.worldcoinindex.com/apiservice/';
	}

	/**
	 *	Get ticker information
	 *	@param {string} ticker currency ticker
	 *	@param {string} fiat currency being traded with
	 *	@return {Object} ticker information
	 *	@example
	 *	const client = new WorldCoinIndex('key goes here');
	 *	client.getTicker('eth', 'btc').then(console.log).catch(console.error);
	 *	client.getTicker('ltc', 'btc').then(console.log).catch(console.error);
	 */
	getTicker(ticker, fiat) {
		// Converts ticker to label string needed for API call
		var label = ticker + fiat;
		return fetch(`${this.baseUrl}ticker?key=${this.key}&label=${label}&fiat=${fiat}`).then(res => 
			res.json()
		);
	}

	/**
	 *	Get information on multiple tickers
	 *	@param {string[]} tickers list of currency tickers
	 *	@param {string} fiat currency being traded with
	 *	@return {Object} information on multiple tickers
	 *	@example
	 *	const client = new WorldCoinIndex('key goes here');
	 *	client.getTickers(['eth', 'ltc'], 'btc').then(console.log).catch(console.error);
	 *	client.getTickers(['ven'], 'btc').then(console.log).catch(console.error);
	 */
	getTickers(tickers, fiat) {
		// Converts array of tickers to label string needed for API call
		var label = tickers.join(fiat + '-') + fiat;
		return fetch(`${this.baseUrl}ticker?key=${this.key}&label=${label}&fiat=${fiat}`).then(res => 
			res.json()
		);
	}

	/**
	 *	Get market information
	 *	@param {string} fiat currency to get information about
	 *	@return {Object} market information
	 *	@example
	 *	const client = new WorldCoinIndex('key goes here');
	 *	client.getTicker('btc').then(console.log).catch(console.error);
	 *	client.getTicker('eth').then(console.log).catch(console.error);
	 */
	getMarkets(fiat) {
		return fetch(`${this.baseUrl}getmarkets?key=${this.key}&fiat=${fiat}`).then(res => 
			res.json()
		);
	}

}

module.exports = WorldCoinIndex;