import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appImageUpload]',
})
export class ImageUploadDirective {
  @Output() fileDropped = new EventEmitter<File>();

  @HostBinding('style.background-color') private background = '#ffffff00';
  @HostBinding('style.opacity') private opacity = '1';

  @HostListener('dragover', ['$event']) onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#69f0ae40';
    this.opacity = '0.8';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#ffffff00';
    this.opacity = '1';
  }

  @HostListener('drop', ['$event']) public ondrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#ffffff00';
    this.opacity = '1';
    const files = evt.dataTransfer?.files;
    if (files) {
      this.fileDropped.emit(files[0]);
    }
  }
}
