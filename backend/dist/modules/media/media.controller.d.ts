import { MediaService } from "./media.service";
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    createUploadUrl(body: {
        filename: string;
        contentType: string;
    }): {
        message: string;
        body: {
            filename: string;
            contentType: string;
        };
    };
}
