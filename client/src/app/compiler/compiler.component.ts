import { Location } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrudService } from '../service/crud.service';

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
  constructor(
    private readonly location: Location,
    private readonly crudService: CrudService
  ) {}

  protected id: string = '';
  protected idInput: string = '';
  protected loading: boolean = false;
  private widget: any;
  protected submissionId: string = ''; //'744314680';
  protected token: string = ''; //'29c165edc73086362d91f8f989e3ed72';
  protected getResponse: string = '';
  protected source: string = '';
  protected compilerId: string = '';
  protected createResponse: string = '';

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

  public clear(opt: number): void {
    switch (opt) {
      case 0:
        this.getResponse = '';
        break;
      case 1:
        this.createResponse = '';
        break;
    }
  }

  public getSubmission(): void {
    this.getResponse = '';
    this.crudService.getCompiler(this.submissionId, this.token).subscribe({
      next: (val) => {
        // console.log(val);
        this.getResponse = JSON.stringify(val, null, 2);
        console.log(this.getResponse);
      },
      error: (error) => {
        this.getResponse = error.error.message;
      },
    });
  }

  public createSubmission(): void {
    this.createResponse = '';
    this.crudService
      .createCompiler(
        { compilerId: this.compilerId, source: this.source },
        this.token
      )
      .subscribe({
        next: (val) => {
          this.createResponse = JSON.stringify(val, null, 2);
          // console.log(this.createResponse);
        },
        error: (error) => {
          this.createResponse = error.error.message;
        },
      });
  }
}
