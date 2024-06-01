import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-compiler',
  standalone: true,
  imports: [],
  templateUrl: './compiler.component.html',
  styleUrl: './compiler.component.scss',
})
export class CompilerComponent {
  constructor(private readonly location: Location) {}

  public goBack(): void {
    this.location.back();
  }
}
