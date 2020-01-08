var should = require("should");
var request = require("request");
var assert = require("chai").assert;
var expect = require("chai").expect;
var baseURL = "http://seeinstore.rtg-prod.com/seeInStore";
var util = require("util");
// var seeInStore = require('../SeeInStore').SeeInStore;



var chai = require('chai')
  , chaiHttp = require('chai-http');

chai.use(chaiHttp);


describe('SeeInStores', () => {

	describe("<< Response Headers >>", () => {
		it('===> content-type shoud return application/json; charset=utf-8', (done) => {
			request.get({url:baseURL + '?sku=7005451p&zipcode=33610'},
				(error, response, body) => {
					// console.log("===========================================================");
					// console.log(response.headers);
					// console.log("===========================================================");
					assert.equal(response.headers['content-type'], 'application/json; charset=utf-8');
					done();
				});
		});

	});

	describe("<< Status_Codes & Messages >>", () => {

		it('===> StatusCode shoud return 200 for correct sku & correct zipcode', (done) => {
			
			request.get({url:baseURL + '?sku=7005451p&zipcode=33610'},
				(error, response, body) => {
					// console.log("===========================================================");
					// console.log(JSON.parse(body));
					// console.log("===========================================================");
					assert.equal(response.statusCode, 200);
					done();
				});
		});



		it('===> Bad Request: StatusCode should return 400 for wrong sku', (done) => {
			request.get({url:baseURL + '?sku=700545asdasd1p&zipcode=33610'},
				(error, response, body) => {
					// console.log("===========================================================");
					// console.log(JSON.parse(body));
					// console.log("===========================================================");
					assert.equal(response.statusCode, 400);
					done();
				});
		});


		it('===> Bad Request: StatusCode should return 400 for wrong zipcode', (done) => {
			request.get({url:baseURL + '?sku=7005451p&zipcode=6547895'},
				(error, response, body) => {
					// console.log("===========================================================");
					// console.log(JSON.parse(body));
					// console.log("===========================================================");
					assert.equal(response.statusCode, 400);
					done();
				});
		});



		it('===> Bad Request: StatusCode should return 400 for wrong sku and wrong zipcode', (done) => {
			request.get({url:baseURL + '?sku=7005aswdasdas451p&zipcode=6547895'},
				(error, response, body) => {
					// console.log("===========================================================");
					// console.log(JSON.parse(body));
					// console.log("===========================================================");
					assert.equal(response.statusCode, 400);
					done();
				});
		});

		it('===> Bad Request: body.message should return -Wrong parameter sku- in query for wrong sku', (done) => {
			request.get({url:baseURL + '?sku=7005aswdasdas451p&zipcode=33610'},
				(error, response, body) => {
					var obj = JSON.parse(body);
					for(var o of obj){
						// console.log(o);
						// console.log(o.message);
						assert.equal(o.message, "Wrong parameter sku in query. ");				
					}
					done();
				});
		});


		it('===> Bad Request: body.message should return -Wrong parameter zipcode- in query for wrong zipcode', (done) => {
			request.get({url:baseURL + '?sku=7005451p&zipcode=336asdasdasd10'},
				(error, response, body) => {
					var obj = JSON.parse(body);
					for(var o of obj){
						// console.log(o);
						// console.log(o.message);
						assert.equal(o.message, "Wrong parameter zipcode in query. ");			
					}
					done();
				});
		});




	});




	describe("<< Return_Data_Types >>", () => {


		var error=null;
		var response=null;
		var body=null;
		var obj=null;


		request.get({url:baseURL + '?sku=7005451p&zipcode=33980'},
			(err, res, bod) => {
				error=err;
				// console.log(error);
				response=res;
				// console.log(response);
				body=bod;
				// console.log(body);
				obj=JSON.parse(body);
				// console.log(obj);
		});


		it('===> Address1 data type should be string', (done) => {
			for(var o of obj){
				// console.log(o);
				// console.log(o.address1);
				assert.typeOf(o.address1, 'string');				
			}
			// assert.typeOf(obj[0].address1, 'string');
			done();

		});


		it('===> City data type should be string', (done) => {
			for(var o of obj){
				// console.log(o);
				// console.log(o.city);	
				assert.typeOf(o.city, 'string');				
			}			
			done();
			
		});


		it('===> Hours/regularHours/dayIndex data type should be string', (done) => {
			for(var o of obj){
				// console.log(o);
				// console.log(o.hours.regularHours[0].dayIndex);	
				assert.typeOf(o.hours.regularHours[0].dayIndex, 'string');				
			}
			done();
			
		});


		it('===> Hours/regularHours/closeTime data type should be string', (done) => {
			for(var o of obj){
				// console.log(o);
				// console.log(o.hours.regularHours[0].closeTime);	
				assert.typeOf(o.hours.regularHours[0].closeTime, 'string');
			}
			done();
			
		});

		it('===> Hours/regularHours/openTime data type should be string', (done) => {
			for(var o of obj){
				// console.log(o);
				// console.log(o.hours.regularHours[0].openTime);	
				assert.typeOf(o.hours.regularHours[0].openTime, 'string');
			}
			done();
			
		});


		it('===> Hours/specialHours/isOpen data type should be boolean', (done) => {
			for(var o of obj){
				// console.log(o);
				// console.log(o.hours.specialHours[0].isOpen);	
				assert.typeOf(o.hours.specialHours[0].isOpen, 'boolean');
			}
			done();
		});



		it('===> Hours/specialHours/closeTime data type should be string', (done) => {
			for(var o of obj){
				// console.log(o);
				// console.log(o.hours.specialHours[0].closeTime);	
				assert.typeOf(o.hours.specialHours[0].closeTime, 'string');
			}
			done();
		});



		it('===> Hours/specialHours/openTime data type should be string', (done) => {
			for(var o of obj){
				// console.log(o);
				// console.log(o.hours.specialHours[0].openTime);	
				assert.typeOf(o.hours.specialHours[0].openTime, 'string');
			}
			done();
		});



		it('===> Latitude data type should be number', (done) => {
			for(var o of obj){
				// console.log(o);
				// console.log(o.latitude);	
				assert.typeOf(o.latitude, 'number');
			}				

			done();
		});

		it('===> Longitude data type should be number', (done) => {
			for(var o of obj){
				// console.log(o);
				// console.log(o.longitude);	
				assert.typeOf(o.longitude, 'number');
			}				
			done();
			
		});


		it('===> PhoneNumber data type should be string', (done) => {
			for(var o of obj){
				// console.log(o);
				// console.log(o.phoneNumber);	
				assert.typeOf(o.phoneNumber, 'string');
			}			
			done();
			
		});

		it('===> State data type should be string', (done) => {
			for(var o of obj){
				// console.log(o);
				// console.log(o.state);	
				assert.typeOf(o.state, 'string');
			}				
			done();
		});


		it('===> Store Name data type should be string', (done) => {
			for(var o of obj){
				// console.log(o);
				// console.log(o.storeName);	
				assert.typeOf(o.storeName, 'string');
			}				

			done();
		});


		it('===> Store Number data type should be string', (done) => {
			for(var o of obj){
				// console.log(o);
				// console.log(o.storeNumber);	
				assert.typeOf(o.storeNumber, 'string');
			}				
			done();
		});

		
		it('===> Zipcode data type should be string', (done) => {
			for(var o of obj){
				// console.log(o);
				// console.log(o.zipcode);	
				assert.typeOf(o.zipcode, 'string');
			}				
			done();
		});

	});


	describe("<< Logic: Check if Store is Open at Special Hours >>", () => {

		var error=null;
		var response=null;
		var body=null;
		var obj=null;


		request.get({url:baseURL + '?sku=7005451p&zipcode=33610'},
			(err, res, bod) => {
				error=err;
				// console.log(error);
				response=res;
				// console.log(response);
				body=bod;
				// console.log(body);
				obj=JSON.parse(body);
				// console.log(obj);
		});


		console.log(obj);

		it('===> Hours/specialHours/isOpen should return false as it is not between open and close time on the given day', (done) => {

			for(var o of obj){
				// console.log(o);
				// console.log(o.hours.specialHours[0].isOpen);	
				// console.log(o.hours.specialHours[0].openTime);
				// console.log(o.hours.specialHours[0].closeTime);
				assert.isFalse(o.hours.specialHours[0].isOpen);
			}
			done();
		});

	});



});

