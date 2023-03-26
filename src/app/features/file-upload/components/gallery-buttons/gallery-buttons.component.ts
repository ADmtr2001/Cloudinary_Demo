import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-gallery-buttons',
  templateUrl: './gallery-buttons.component.html',
  styleUrls: ['./gallery-buttons.component.scss'],
})
export class GalleryButtonsComponent {
  @Output() public selectFile: EventEmitter<void> = new EventEmitter<void>();
  @Output() public editFiles: EventEmitter<void> = new EventEmitter<void>();

  public onFileSelectClick(): void {
    this.selectFile.emit();
  }

  public onFilesEditClick(): void {
    this.editFiles.emit();
  }
}
