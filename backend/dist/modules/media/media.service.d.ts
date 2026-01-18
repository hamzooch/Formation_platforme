export declare class MediaService {
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
