import { MongoHelper as sut } from './mongo-helper'
import mongConfig from '../../../../../globalConfig'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(mongConfig.mongoUri)
  })
  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
