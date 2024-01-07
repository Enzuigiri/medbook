import { AwsStorage, SftpStorage, Storage, WebDavStorage } from "./storage";
export enum Destination {
  AWS,
  SFTP,
  WebDav,
}

export var storage_config = {
  awsKey: "abc",
  awsAccessKey: "abc",
  sftp_companies: {
    sftpComp1: { port: 1, access_key: "abc" },
    sftpComp2: { port: 2, access_key: "abc" },
  },
  webdav_companies: {
    webdavComp1: { URI: "abc", access_key: "abc" },
    webdavComp2: { URI: "abc", access_key: "abc" },
  },
};

export class storage_factory {
  static create_factory(company_id: string): Storage {
    if (storage_config.sftp_companies[company_id]) {
      const config = storage_config.sftp_companies[company_id];
      return new SftpStorage(config.port, config.access_key);
    } else if (storage_config.webdav_companies[company_id]) {
      const config = storage_config.webdav_companies[company_id];
      return new WebDavStorage(config.URI, config.access_key);
    } else {
      return new AwsStorage(storage_config.awsKey, storage_config.awsAccessKey);
    }
  }
}
