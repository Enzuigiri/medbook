export interface IBcryptService {
  hash(hashString: string): Promise<string>;
  compare(string: string, hashString: string): Promise<boolean>;
}
