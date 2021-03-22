import { AccountModel, AddAccount, AddAccountModel, Encrypter, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepositoryStub: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepositoryStub = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    await this.addAccountRepositoryStub.add({ ...accountData, password: hashedPassword })
    return new Promise(resolve => resolve({ id: '1', name: 'any_name', email: 'any_email@mail.com', password: 'na' }))
  }
}
