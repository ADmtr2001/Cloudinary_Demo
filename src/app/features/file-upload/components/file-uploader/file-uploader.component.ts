import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit {
  public fileForm!: FormGroup;
  public progress = 0;

  private uploadSubscription: Subscription | null = null;

  public get fileControl(): AbstractControl {
    return this.fileForm.get('file') as AbstractControl;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly fileUploadService: FileUploadService
  ) {}

  public ngOnInit(): void {
    this.fileForm = this.fb.group({
      file: [''],
    });
  }

  public onFileDrop(file: File): void {
    this.fileControl.setValue(file);
    this.progress = 0;
  }

  public onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.fileControl.setValue(files[0]);
    this.progress = 0;
  }

  public clearForm(): void {
    this.fileForm.reset();
  }

  public uploadFile(): void {
    const file = this.fileControl.value;
    if (file.type.startsWith('image/')) {
      this.uploadSubscription = this.fileUploadService
        .uploadImage(file)
        .subscribe((event: HttpEvent<unknown>) =>
          this.handleLoadingProgress(event)
        );
    } else if (file.type.startsWith('video/')) {
      this.uploadSubscription = this.fileUploadService
        .uploadVideo(file)
        .subscribe((event: HttpEvent<unknown>) =>
          this.handleLoadingProgress(event)
        );
    }
  }

  public cancelLoading(): void {
    if (this.uploadSubscription) {
      this.uploadSubscription.unsubscribe();
      this.uploadSubscription = null;
      this.clearForm();
    }
  }

  private handleLoadingProgress(event: HttpEvent<unknown>): void {
    if (event.type === HttpEventType.UploadProgress) {
      this.progress = Math.round((event.loaded / event.total!) * 100);
    } else if (event.type === HttpEventType.Response) {
      this.uploadSubscription?.unsubscribe();
      this.uploadSubscription = null;
      this.clearForm();
    }
  }
}
