import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

const { expect } = chai;

chai.use(chaiHttp);
chai.should();

describe('App Should delete a contact', () => {
  const id = '5d07cab721260e6ddffb9ddb';
  const contactId = { id: '5d07ad50179299629ae9fb0f' };
  it('should a contact deleted successful', (done) => {
    chai.request(app)
      .delete(`/${id}/contacts/delete`)
      .send(id)
      .end((error, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should a contact id is not Exist', (done) => {
    chai.request(app)
      .delete(`/${id}/contacts/delete`)
      .send(contactId)
      .end((error, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should a contact id is not correct', (done) => {
    chai.request(app)
      .delete(`/${id}/contacts/delete`)
      .send(contactId)
      .end((error, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
