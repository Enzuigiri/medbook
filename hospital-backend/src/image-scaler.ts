export interface ImageScaler {
    /**
     * Scale an images to max width
     * 
     * @param filename The name of the input image
     * @param max_width The max width in inut pixels
     * @return The output filename, scaled
     */
    scale(filename: string, max_width: number): Promise<string>;

    /**
     * Return wheter the image scaler supports scaling the given mime type
     * @param mime_type The mime type
     * @return True if the scaler can scale the image
     */
    supported(mime_type: string): boolean;
}

export class SharpImageScaler implements ImageScaler {
    scale(filename: string, max_width: number): Promise<string> {
        throw new Error("Method not implemented.");
    }
    supported(mime_type: string): boolean {
        return mime_type == 'image/jpeg' ||
        mime_type == 'image/png' ||
        mime_type == 'image/gif';
    }

}