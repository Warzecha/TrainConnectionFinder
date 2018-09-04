'use strict';
const app = require('../index');
const chai = require('chai');
const request = require('supertest');
const City = require('../models/city');
const expect = chai.expect;

const chaiHttp = require('chai-http');

const should = chai.should();


chai.use(chaiHttp);


// const mocha = require('mocha');


describe('Cities API integration tests', function(){

    beforeEach((done) => { //Before each test we empty the database
        City.remove({}, (err) => { 
           done();           
        });        
    });


    // describe('GET requests', function() { 
    //     it('should be empty', function(done) { 
    //       request(app) .get('/cities')
    //         .end(function(err, res) { 
    //           expect(res.statusCode).to.equal(200); 
    //           expect(res.body).to.be.an('array'); 
    //           expect(res.body).to.be.empty; 
    //           done(); 
    //         }); 
    //     });
    //   });


    describe('POST requests',() => {


        it('should be able to post a correct city', (done) => {
            let city = {
                name: 'Krakow'
            }

            chai.request(app)
            .post('/api/cities')
            .send(city)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('_id');
                res.body._id.should.be.a('string');
                res.body.should.have.property('name');
                res.body.name.should.be.a('string');
                res.body.name.should.equal('Kraków, Poland')
                res.body.should.have.property('lat');
                res.body.lat.should.be.a('number');
                res.body.lat.should.be.equal(50.06465009999999);
                res.body.should.have.property('lng');
                res.body.lng.should.be.a('number');
                res.body.lng.should.equal(19.9449799);
                res.body.should.have.property('create_date');

                chai.request(app)
                .get('/api/cities')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                done();
               });
            });

            

        });


        it('should not be able to post a city without name property', (done) => {
            let city = {
                foo: 'bar'
            }

            chai.request(app)
            .post('/api/cities')
            .send(city)
            .end((err, res) => {
                res.should.have.status(400);
                
            });


            chai.request(app)
            .get('/api/cities')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
            done();
            });



        });



    }),


    it('Database should be empty', (done) => {
        chai.request(app)
            .get('/api/cities')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
            done();
            });
    });





   

});