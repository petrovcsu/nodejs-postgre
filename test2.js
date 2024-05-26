const server = require('./app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('Authentication', () => {
  test('should authenticate user with valid credentials', async () => {
  const userData = { login: 'admin', password: 'admin' };
  const response = await requestWithSupertest
    .post('/api/auth/login')
    .send(userData);

  expect(response.status).toEqual(200); // Проверяем, что статус ответа равен 200
  expect(response.body).toHaveProperty('msg', ''); // Ожидаем пустое сообщение об ошибке
});

});
