import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import mongConfig from '../../../globalConfig'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(mongConfig.mongoUri)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  test('Should return an account on success', async () => {
    await request(app).post('/api/signup').send({
      name: 'victor shermon',
      email: 'victor804.gt@gmail.com',
      password: 'Victor!1999',
      passwordConfirm: 'Victor!1999'
    }).expect(200)
  })
})
