import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent {
  @Input() progress = 0;
  @Output() onLoadingCancel: EventEmitter<void> = new EventEmitter<void>();

  public onCancel(): void {
    this.onLoadingCancel.emit();
  }
}
