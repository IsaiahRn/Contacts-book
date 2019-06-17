import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import dummy from './dummy';
import server from '../server';

chai.should();
chai.use(chaiHttp);

dotenv.config();

describe('Contact Endpoints', () => {
  it('Should create a contact', (done) => {
    chai.request(server)
      .post('/contacts')
      .send(dummy.newContact)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.be.an('Object');
        res.body.should.have.property('status').equal(201);
        res.body.should.have.property('data');
        res.body.data.should.be.an('object');
        done();
      });
  });

  it('Should not create a contact if email is valid', (done) => {
    chai.request(server)
      .post('/contacts')
      .send(dummy.falseContact)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.be.an('Object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error');
        done();
      });
  });
});

describe('PATCH /contacts/<contactId>', () => {
  it('should update an existing contact', (done) => {
    chai
      .request(server)
      .patch('/contacts/5d079ddae071b71c9851b341')
      .send(dummy.updateContactData)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.be.an('Object');
        res.body.should.have.property('status').equal(200);
        res.body.data.should.be.an('object');
        done();
      });
  });
});
