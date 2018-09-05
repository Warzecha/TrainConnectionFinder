'use strict';
const app = require('../index');
const chai = require('chai');
const Connection = require('../models/connection');
const chaiHttp = require('chai-http');

const should = chai.should();


chai.use(chaiHttp);


// const mocha = require('mocha');


describe('Connections API integration tests', function(){

    beforeEach((done) => { //Before each test we empty the database
        Connection.remove({}, (err) => { 
           done();           
        });        
    });


    describe('POST requests',() => {


        it('should be able to post a correct connection', (done) => {
            let connection = {
                fromCityId: "5b8ee0d424350a785fa05ae0",
                fromCityName: "Kraków, Poland",
                toCityId:  "5b8ee16a24350a785fa05ae1",
                toCityName: "Warszawa, Poland",
                ticketPriceInEUR: 4.99,
                durationInMinutes: 117
            }

            chai.request(app)
            .post('/api/connections')
            .send(connection)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
          

                res.body.should.have.property('fromCityId');
                res.body.fromCityId.should.be.a('string');
                res.body.fromCityId.should.equal('5b8ee0d424350a785fa05ae0');

                res.body.should.have.property('fromCityName');
                res.body.fromCityName.should.be.a('string');
                res.body.fromCityName.should.equal('Kraków, Poland');
                
                res.body.should.have.property('toCityId');
                res.body.toCityId.should.be.a('string');
                res.body.toCityId.should.equal('5b8ee16a24350a785fa05ae1');
                res.body.should.have.property('toCityName');
                res.body.toCityName.should.be.a('string');
                res.body.toCityName.should.equal('Warszawa, Poland');

                res.body.should.have.property('ticketPriceInEUR');
                res.body.ticketPriceInEUR.should.be.a('number');
                res.body.ticketPriceInEUR.should.be.equal(4.99);
                res.body.should.have.property('durationInMinutes');
                res.body.durationInMinutes.should.be.a('number');
                res.body.durationInMinutes.should.equal(117);
                res.body.should.have.property('create_date');

                chai.request(app)
                .get('/api/connections')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                done();
               });
            });

            

        });


        it('should not be able to post a connection without fromCityId property', (done) => {
            let connection = {
                fromCityName: "Kraków, Poland",
                toCityId:  "5b8ee16a24350a785fa05ae1",
                toCityName: "Warszawa, Poland",
                ticketPriceInEUR: 4.99,
                durationInMinutes: 117
            }
            chai.request(app)
            .post('/api/connections')
            .send(connection)
            .end((err, res) => {
                res.should.have.status(400);
                
                chai.request(app)
                .get('/api/connections')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
                });
            });
        });


        it('should not be able to post a connection with empty fromCityId property', (done) => {
            let connection = {
                fromCityId: "",
                fromCityName: "Kraków, Poland",
                toCityId:  "5b8ee16a24350a785fa05ae1",
                toCityName: "Warszawa, Poland",
                ticketPriceInEUR: 4.99,
                durationInMinutes: 117
            }
            chai.request(app)
            .post('/api/connections')
            .send(connection)
            .end((err, res) => {
                res.should.have.status(400);
                
                chai.request(app)
                .get('/api/connections')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
                });
            });
        });


        it('should not be able to post a connection without fromCityName property', (done) => {
            let connection = {
                fromCityId: "5b8ee0d424350a785fa05ae0",
                toCityId:  "5b8ee16a24350a785fa05ae1",
                toCityName: "Warszawa, Poland",
                ticketPriceInEUR: 4.99,
                durationInMinutes: 117
            }
            chai.request(app)
            .post('/api/connections')
            .send(connection)
            .end((err, res) => {
                res.should.have.status(400);
                
                chai.request(app)
                .get('/api/connections')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
                });
            });
        });





        it('should not be able to post a connection without fromCityName property', (done) => {
            let connection = {
                fromCityId: "5b8ee0d424350a785fa05ae0",
                // fromCityName: "Kraków, Poland",
                toCityId:  "5b8ee16a24350a785fa05ae1",
                toCityName: "Warszawa, Poland",
                ticketPriceInEUR: 4.99,
                durationInMinutes: 117
            }
            chai.request(app)
            .post('/api/connections')
            .send(connection)
            .end((err, res) => {
                res.should.have.status(400);
                
                chai.request(app)
                .get('/api/connections')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
                });
            });
        });

        it('should not be able to post a connection without a valid ticketPrice property', (done) => {
            let connection = {
                fromCityId: "5b8ee0d424350a785fa05ae0",
                fromCityName: "Kraków, Poland",
                toCityId:  "5b8ee16a24350a785fa05ae1",
                toCityName: "Warszawa, Poland",
                ticketPriceInEUR: 'dirt cheap',
                durationInMinutes: 117
            }
            chai.request(app)
            .post('/api/connections')
            .send(connection)
            .end((err, res) => {
                res.should.have.status(400);
                
                chai.request(app)
                .get('/api/connections')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
                });
            });
        });



    });


    it('Database should be empty', (done) => {
        chai.request(app)
            .get('/api/connections')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                // console.log(res.body);
                res.body.length.should.be.eql(0);
            done();
            });
    });





   

});