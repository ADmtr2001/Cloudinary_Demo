import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadDirective } from './directives/image-upload.directive';
import { GalleryDialogComponent } from './components/gallery-dialog/gallery-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { GalleryButtonsComponent } from './components/gallery-buttons/gallery-buttons.component';

@NgModule({
  declarations: [
    ImageUploadDirective,
    GalleryDialogComponent,
    FileUploaderComponent,
    GalleryButtonsComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    ImageUploadDirective,
    FileUploaderComponent,
    GalleryButtonsComponent,
  ],
})
export class FileUploadModule {}
