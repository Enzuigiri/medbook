export type KeyStore = string;

export interface Encryption {
  /**
   * Give an encriptyion file
   *
   * @param user_id The user id key to encrypt the file
   * @param file_path The file path
   * @return The ouput file_path encrypted
   */
  encrypt(user_id: string, file_path: string): Promise<string>;
}

export class AesEncrypt implements Encryption {
  private keyStore: KeyStore;

  private readonly IV = ":oajsdajsdjoajsdo";
  private readonly ENCRYPTION_METHOD = "aes256";

  constructor(keystore: KeyStore) {
    this.keyStore = keystore;
  }

  async encrypt(user_id: string, file_path: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
}
