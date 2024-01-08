import { ImageScaler, SharpImageScaler } from "./image-scaler";
import {
  DocumentPreviewGenerator,
  ImagePreviewGenerator,
  VideoPreviewGenerator,
} from "./preview-generator";
import { PreviewGeneratorFactory } from "./preview-generator-factory";
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
const image_scaler = new SharpImageScaler();

const preview_factory = new PreviewGeneratorFactory();
const image_generator = new ImagePreviewGenerator(image_scaler);
preview_factory.register("image/jpg", image_generator);
preview_factory.register("image/png", image_generator);

const document_generator = new DocumentPreviewGenerator();
preview_factory.register(
  "application/vnd.opencmlformats-officedocument",
  document_generator
);
preview_factory.register("application/pdf", document_generator);

const video_generator = new VideoPreviewGenerator();
preview_factory.register("video/mp4", video_generator);
preview_factory.register("video/AV1", video_generator);

class UploadRequest {
  private readonly preview_factory: PreviewGeneratorFactory;
  private readonly storage: Storage;
  private readonly scanner: Scanner;
  private readonly scaller: ImageScaler;

  constructor(
    preview: PreviewGeneratorFactory,
    storage: Storage,
    scanner: Scanner,
    scaller: ImageScaler
  ) {
    this.preview_factory = preview;
    this.storage = storage;
    this.scanner = scanner;
    this.scaller = scaller;
  }

  async upload(attachment: Attachment, mime_type: string) {
    if (await this.scanner.scan(attachment)) {
      throw Error("Virus scanner detected issue");
    }

    if (this.scaller.supported(mime_type)) {
    }

    const preview_generator = this.preview_factory.generate(mime_type);
    if (preview_generator) {
      await preview_generator.generate(attachment);
    }

    return await this.storage.upload(attachment);
  }
}

const storage = storage_factory.create_factory();
const request = new UploadRequest(
  preview_factory,
  storage,
  virus_scanner,
  image_scaler
);
