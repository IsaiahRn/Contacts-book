import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import dummy from './dummy';
import server from '../server';

chai.should();
chai.use(chaiHttp);

dotenv.config();

describe('Contact Endpoints', () => {
  let getId;
  it('Should create a contact', (done) => {
    chai.request(server)
      .post('/contacts')
      .send(dummy.newContact)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        getId = res.body.data._id;
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

  // console.log(getId);

  it('should a contact deleted successful', (done) => {
    chai.request(server)
      .delete(`/contacts/${getId}/delete`)
      .end((error, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should not delete, a contact id not found', (done) => {
    chai.request(server)
      .delete(`/contacts/${getId}/delete`)
      .end((error, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should not delete, a contact id is wrong', (done) => {
    chai.request(server)
      .delete(`/contacts/${getId}1/delete`)
      .end((error, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
