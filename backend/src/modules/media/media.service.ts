import { Injectable } from "@nestjs/common";

@Injectable()
export class MediaService {
  createUploadUrl(body: { filename: string; contentType: string }) {
    return { message: "signed url stub", body };
  }
}
