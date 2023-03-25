import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { GalleryDialogComponent } from './features/file-upload/components/gallery-dialog/gallery-dialog.component';
import { GalleryDialogData } from './features/file-upload/interfaces/gallery-dialog-data.interface';
import { Resource } from './features/file-upload/interfaces/resource.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public selectedImage: Resource | null = null;

  constructor(private readonly dialog: MatDialog) {}

  public openFileSelectDialog(): void {
    const galleryDialog = this.dialog.open(GalleryDialogComponent, {
      autoFocus: false,
    });

    galleryDialog
      .afterClosed()
      .pipe(take(1))
      .subscribe((data) => {
        this.selectedImage = data?.selectedFile;
      });
  }

  public openFileEditDialog(): void {
    const data: GalleryDialogData = {
      isEditable: true,
    };

    const galleryDialog = this.dialog.open(GalleryDialogComponent, {
      autoFocus: false,
      data,
    });

    galleryDialog
      .afterClosed()
      .pipe(take(1))
      .subscribe((data) => {
        this.selectedImage = data?.selectedFile;
      });
  }
}
