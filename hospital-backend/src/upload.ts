import { Attachment, Storage } from "./storage";
import { storage_config, storage_factory } from "./storage-factory";
import {
  ThreatProtecScanner,
  SynergySecurityScanner,
  Scanner,
} from "./virus-scanner";

const isProduction = process.env.NODE_ENV == "production";
const virus_scanner = isProduction
  ? new ThreatProtecScanner()
  : new SynergySecurityScanner();

class UploadRequest {
  private readonly storage: Storage;
  private readonly scanner: Scanner;

  constructor(storage: Storage, scanner: Scanner) {
    this.storage = storage;
    this.scanner = scanner;
  }

  async upload(attachment: Attachment, mime_type: string) {
    if (await this.scanner.scan(attachment)) {
      throw Error("Virus scanner detected issue");
    }
    return await this.storage.upload(attachment);
  }
}

const storage = storage_factory.create_factory("test");
const request = new UploadRequest(storage, virus_scanner);
