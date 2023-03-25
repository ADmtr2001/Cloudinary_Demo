import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-gallery-buttons',
  templateUrl: './gallery-buttons.component.html',
  styleUrls: ['./gallery-buttons.component.scss'],
})
export class GalleryButtonsComponent {
  @Output() selectFile: EventEmitter<void> = new EventEmitter<void>();
  @Output() editFiles: EventEmitter<void> = new EventEmitter<void>();

  onFileSelectClick() {
    this.selectFile.emit();
  }

  onFilesEditClick() {
    this.editFiles.emit();
  }
}
