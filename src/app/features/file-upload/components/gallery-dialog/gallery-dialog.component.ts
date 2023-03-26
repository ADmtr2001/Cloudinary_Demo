import { ChangeDetectorRef, Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { Folder } from '../../interfaces/folder.interface';
import { GalleryDialogData } from '../../interfaces/gallery-dialog-data.interface';
import { Resource } from '../../interfaces/resource.interface';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-gallery-dialog',
  templateUrl: './gallery-dialog.component.html',
  styleUrls: ['./gallery-dialog.component.scss'],
})
export class GalleryDialogComponent implements OnInit {
  public resources: Resource[] = [];
  public folders: Folder[] = [];

  private selectedFileTypeChips: string[] = ['image'];
  private selectedFolderChips: string[] = [];
  public selectedResource: Resource | null = null;

  constructor(
    private readonly fileUploadService: FileUploadService,
    private readonly matDialogRef: MatDialogRef<GalleryDialogComponent>,
    private readonly cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: GalleryDialogData
  ) {}

  ngOnInit(): void {
    this.initDialogPanelClass();
    this.fileUploadService.resetNextCursor();
    this.loadAllResources();
    this.loadAllFolders();
  }

  public toggleFolderChip(chip: string): void {
    const index = this.selectedFolderChips.indexOf(chip);
    if (index >= 0) {
      this.selectedFolderChips.splice(index, 1);
    } else {
      this.selectedFolderChips.push(chip);
    }
    this.cdr.detectChanges();

    this.fileUploadService.resetNextCursor();
    this.loadAllResources();
  }

  public toggleFileTypeChip(chip: string): void {
    const index = this.selectedFileTypeChips.indexOf(chip);
    if (index >= 0 && this.selectedFileTypeChips.length === 1) return;

    if (index >= 0) {
      this.selectedFileTypeChips.splice(index, 1);
    } else {
      this.selectedFileTypeChips.push(chip);
    }
    this.cdr.detectChanges();

    this.fileUploadService.resetNextCursor();
    this.loadAllResources();
  }

  public checkIfFolderChipIsSelected(chip: string): boolean {
    return this.selectedFolderChips.includes(chip);
  }

  public checkIfFileTypeChipIsSelected(chip: string): boolean {
    return this.selectedFileTypeChips.includes(chip);
  }

  public onResourceSelect(file: Resource): void {
    if (!this.data?.isEditable) {
      this.matDialogRef.close({ selectedFilResource: file });
    }

    if (this.selectedResource === file) {
      this.selectedResource = null;
    } else {
      this.selectedResource = file;
    }
  }

  public selectResource(file: Resource): void {
    this.matDialogRef.close({ selectedResource: file });
  }

  public isResourceSelected(file: Resource): boolean {
    return this.selectedResource === file;
  }

  public deleteResource(file: Resource): void {
    if (file.resource_type === 'image') {
      this.fileUploadService.deleteImage(file.public_id).subscribe();
    } else if (file.resource_type === 'video') {
      this.fileUploadService.deleteVideo(file.public_id).subscribe();
    }
  }

  public loadMoreResources(): void {
    this.fileUploadService
      .getAllImages(this.selectedFolderChips, this.selectedFileTypeChips)
      .pipe(take(1))
      .subscribe((resources) => {
        this.resources.push(...resources);
      });
  }

  private loadAllResources(): void {
    this.fileUploadService
      .getAllImages(this.selectedFolderChips, this.selectedFileTypeChips)
      .pipe(take(1))
      .subscribe((resources) => {
        this.resources = resources;
      });
  }

  private loadAllFolders(): void {
    this.fileUploadService
      .getAllFolders()
      .pipe(take(1))
      .subscribe((data) => {
        this.folders = data;
      });
  }

  private initDialogPanelClass(): void {
    this.matDialogRef.addPanelClass('gallery-dialog-component');
  }
}
