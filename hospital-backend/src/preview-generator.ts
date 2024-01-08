import { ImageScaler } from "./image-scaler";

export interface PreviewGenerator {
    /**
     * Make preview image of the file
     * 
     * @param filename The file to create a thumbnail for
     * @return A promise which results to the image generated
     */
    generate(filename: string): Promise<string>;
}

export class DocumentPreviewGenerator implements PreviewGenerator {
    generate(filename: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
}

export class VideoPreviewGenerator implements PreviewGenerator {
    generate(filename: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
}

export class ImagePreviewGenerator implements PreviewGenerator {
    private readonly scaler: ImageScaler;
    private readonly MAX_WIDTH_PX = 250;

    constructor(scaler: ImageScaler) {
        this.scaler = scaler
    }
    generate(filename: string): Promise<string> {
        return this.scaler.scale(filename, this.MAX_WIDTH_PX)
    }
}