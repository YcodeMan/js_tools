require('jsdom-global')();

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const expect = require('chai').expect;
const accordion = require('../app/accordion/accordion.js');


describe('test config', function () {
	it ('test defaultConfig', function () {
		var accordionA = accordion();
		expect(accordionA.opts.count).to.equal(5);
	
	}); 
});