process.env.NODE_ENV = 'test';

import { use, should } from 'chai'
import chaiHttp from 'chai-http'

const chai = use(chaiHttp)
const request = chai.request.execute;

//activate should function as Object.prototype
should();

if (process.env.SERVICES_TO_TEST===undefined){
    console.log("skipping process...")
    console.log("define services to test on SERVICES_TO_TEST environment variable!")
    console.log()
    process.exit(0)
}

const services = process.env.SERVICES_TO_TEST.split(',')

describe('Contacts API Tests', () => {
    services.forEach(service => {
        let urlbase = service
        describe('for server ' + service, () => {
            describe('/GET contacts', () => {
                it('it should GET all contacts', done => {
                    request(urlbase)
                        .get('/contacts')
                        .end((err, res) => {
                            res.should.have.status(200)
                            res.body.should.be.a('array')
                            //res.body.length.should.be.eql(0)
                            done()
                        })
                })
            })

            describe('/POST contact', () => {
                it('it should POST a contact', (done) => {
                    let contact = {
                        firstName: "First",
                        lastName: "Last",
                        phoneNumber: "3333-1111"
                    }

                    request(urlbase)
                        .post('/contacts')
                        .send(contact)
                        .end((err, res) => {
                            res.should.have.status(201);
                            res.body.should.be.a('object');
                            done();
                        });
                });
            });

            describe('/GET/:id contact', () => {
                it('it should GET a contact by the given id', (done) => {
                    request(urlbase)
                        .post('/contacts')
                        .send({ firstName: "First", lastName: "Last", phoneNumber: "3333-1111" })
                        .end((err, res) => {
                            res.should.have.status(201);

                            let id = extractId(res)

                            request(urlbase)
                                .get('/contacts/' + id)
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    res.body.should.be.a('object');
                                    res.body.should.have.property('firstName');
                                    res.body.should.have.property('lastName');
                                    res.body.should.have.property('phoneNumber');
                                    res.body.should.have.property('id').eql(id);
                                    res.body.should.have.property('firstName').eql("First");
                                    res.body.should.have.property('lastName').eql("Last");
                                    res.body.should.have.property('phoneNumber').eql("3333-1111");
                                    done();
                                });
                        });
                });
            });

            describe('/PUT/:id contact', () => {
                it('it should UPDATE a contact by the given id', done => {
                    request(urlbase)
                        .post('/contacts')
                        .send({ firstName: "First", lastName: "Last", phoneNumber: "3333-1111" })
                        .end((err, res) => {
                            res.should.have.status(201);
                            res.body.should.be.a('object');

                            let id = extractId(res)

                            request(urlbase)
                                .put('/contacts/' + id)
                                .send({ id, firstName: "Fupd", lastName: "Lupd", phoneNumber: "4444-1111" })
                                .end((err, res) => {
                                    res.should.have.status(204);
                                    res.body.should.be.a('object');
                                    done();
                                });
                        });
                });
            });

            describe('/DELETE/:id contact', () => {
                it('it should DELETE a contact by the given id', done => {
                    request(urlbase)
                        .post('/contacts')
                        .send({ firstName: "First", lastName: "Last", phoneNumber: "3333-1111" })
                        .end((err, res) => {
                            res.should.have.status(201);
                            res.body.should.be.a('object');

                            let id = extractId(res)

                            request(urlbase)
                                .del('/contacts/' + id)
                                .end((err, res) => {
                                    res.should.have.status(204);
                                    res.body.should.be.a('object');
                                    done();
                                });
                        });
                });
            });

        });
    });
});

const extractId = res => {
    let location = res.headers['location']
    return location.substring(location.lastIndexOf('/') + 1)
};