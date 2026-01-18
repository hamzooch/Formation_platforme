import { Body, Controller, Post } from "@nestjs/common";
import { MediaService } from "./media.service";

@Controller("media")
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post("upload-url")
  createUploadUrl(@Body() body: { filename: string; contentType: string }) {
    return this.mediaService.createUploadUrl(body);
  }
}
