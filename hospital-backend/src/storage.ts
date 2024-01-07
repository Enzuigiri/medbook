export type Attachment = string;

export interface Storage {
  /**
   * Store an atachment
   *
   * @param atatchment the attachment to store
   * @return the attachment id
   */
  upload(attachment: Attachment): Promise<string>;

  /**
   * Retrive the attachment from the storage server
   * @param attachment_id the attachment id
   */
  download(attachment_id: string): Promise<Attachment>;
}

export class AwsStorage implements Storage {
  private readonly s3: { key: string; access_key: string };

  public constructor(key: string, access_key: string) {
    this.s3.key = key;
    this.s3.access_key = access_key;
  }

  upload(attachment: Attachment): Promise<string> {
    throw new Error("Method not implemented.");
  }

  download(attachment_id: string): Promise<Attachment> {
    throw new Error("Method not implemented.");
  }
}

export class SftpStorage implements Storage {
  private readonly host: { port: Number; access_key: string };

  public constructor(port: Number, access_key: string) {
    this.host.port = port;
    this.host.access_key = access_key;
  }

  upload(attachment: Attachment): Promise<string> {
    throw new Error("Method not implemented.");
  }

  download(attachment_id: string): Promise<Attachment> {
    throw new Error("Method not implemented.");
  }
}

export class WebDavStorage implements Storage {
  private readonly client: { URI: string; access_key: string };

  public constructor(URI: string, access_key: string) {
    this.client.URI = URI;
    this.client.access_key = access_key;
  }

  upload(attachment: Attachment): Promise<string> {
    throw new Error("Method not implemented.");
  }

  download(attachment_id: string): Promise<Attachment> {
    throw new Error("Method not implemented.");
  }
}
