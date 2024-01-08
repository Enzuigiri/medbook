import { ImageScaler, SharpImageScaler } from "./image_scaler";
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
const image_scaler = new SharpImageScaler()

class UploadRequest {
  private readonly storage: Storage;
  private readonly scanner: Scanner;
  private readonly scaller: ImageScaler;

  constructor(storage: Storage, scanner: Scanner, scaller: ImageScaler) {
    this.storage = storage;
    this.scanner = scanner;
    this.scaller = scaller
  }

  async upload(attachment: Attachment, mime_type: string) {
    if (await this.scanner.scan(attachment)) {
      throw Error("Virus scanner detected issue");
    }

    if (this.scaller.supported(mime_type)) {

    }
    
    return await this.storage.upload(attachment);
  }
}

const storage = storage_factory.create_factory("test");
const request = new UploadRequest(storage, virus_scanner, image_scaler);
