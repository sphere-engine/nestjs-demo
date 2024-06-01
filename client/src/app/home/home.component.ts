import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private readonly router: Router) {}

  public goToCompilers(): void {
    this.router.navigate(['compilers']);
  }

  public goToProblems(): void {
    this.router.navigate(['problems']);
  }

  public goToContainers(): void {
    this.router.navigate(['containers']);
  }
}
