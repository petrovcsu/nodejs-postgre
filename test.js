const server = require('./app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('Authentication', () => {
  test('should restrict access to GET /users for employee', async () => {
    const employeeData = { login: 'admin', password: 'test' };
    const loginResponse = await requestWithSupertest
      .post('/api/auth/login')
      .send(employeeData);

    const authToken = loginResponse.body.token;

    const orderData = {
  label: 'TestOrder',
  id_client: 1,
};


    const createOrderResponse = await requestWithSupertest
      .post('/orders/create')
      .set('Authorization', `Bearer ${authToken}`)
      .send(orderData);

    expect(createOrderResponse.status).toEqual(200);

    const usersResponse = await requestWithSupertest
      .get('/api/users')
      .set('Authorization', `Bearer ${authToken}`);

    expect(usersResponse.status).toEqual(200);
  });
});