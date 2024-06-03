import { Location } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

declare global {
  interface Window {
    SEC?: any;
  }
}

@Component({
  selector: 'app-compiler',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './compiler.component.html',
  styleUrl: './compiler.component.scss',
})
export class CompilerComponent {
  constructor(private readonly location: Location) {}

  public id: string = '';
  public idInput: string = '';
  public loading: boolean = false;
  private widget: any;

  public setId(): void {
    this.id = this.idInput;
    this.idInput = '';
    this.loading = true;
    setTimeout(() => {
      this.widget = window.SEC.widget('example-widget');
      this.loading = false;
    }, 1000);
  }

  public deleteId(): void {
    this.id = '';
    this.widget.destroy();
  }

  public goBack(): void {
    this.location.back();
  }
}
