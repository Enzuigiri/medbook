import { PreviewGenerator } from "./preview-generator";


export class PreviewGeneratorFactory {
    private readonly preview_registry: { [key: string]: PreviewGenerator } = {};

    register(mime_type: string, preview_type: PreviewGenerator) {
        this.preview_registry[mime_type] =  preview_type
    }

    generate(mime_type: string): PreviewGenerator {
        return this.preview_registry[mime_type];
    }
}