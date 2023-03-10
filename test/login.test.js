import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index.js';
import User from '../server/models/user.model.js';
import { encryptData, decryptData } from '../server/utils/crypto.util.js';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Login Route', () => {
  let testUser;

  it('should return a email not exits', async () => {
    const res = await chai
      .request(app)
      .post('/api/login')
      .send({ email: encryptData('testwrong@gmail.com'), password: encryptData('TestUser@123') });
    expect(res.status).to.equal(404);
    expect(res.body.error).include('User with that email does not exist. Please signup');
  });
  it('should return a token when given correct credentials', async () => {
    const res = await chai
      .request(app)
      .post('/api/login')
      .send({ email: encryptData('test@gmail.com'), password: encryptData('TestUser@123') });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });
});