import { Component, ElementRef } from '@angular/core';
import { Location } from "@angular/common";
import { FormsModule } from '@angular/forms';

declare global {
  interface Window {
    SEC?: any;
    SE?: any;
  }
}

@Component({
  selector: 'app-problem',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './problem.component.html',
  styleUrl: './problem.component.scss'
})
export class ProblemComponent {

  public accessToken: string = '';
  public tokenInput: string = '';
  public problemId: string = '';
  public problemIdInput: string = '';
  public loading: boolean = false;
  private widget: any;
  public message: string = '';
  public submissionId: string = '';

  public constructor(private elementRef: ElementRef, private readonly location: Location) {
  }

  public ngAfterViewInit() {
    const s3 = document.createElement('script');
    s3.type = 'text/javascript';
    s3.text = `
    (function(d, s, id) {
      SE_HTTPS = true;
      SE_BASE = "fe530c0e.widgets.sphere-engine.com"
      window.SE = window.SE || [];
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = (SE_HTTPS ? "https://" : "http://") + SE_BASE + "/static/sdk/sdk.min.js";
      fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "sphere-engine-jssdk");

      SE.ready = function(f) {
        if (document.readyState != "loading" && document.readyState != "interactive") f();
        else window.addEventListener("load", f);
      }`;
    this.elementRef.nativeElement.appendChild(s3);
  }

  public goBack(): void {
    this.location.back();
  }

  public setToken(): void {
    this.accessToken = this.tokenInput;
    this.tokenInput = '';
  }

  public clearToken(): void {
    this.accessToken = '';
  }

  public setProblemId(): void {
    if (!this.problemIdInput)
      return;

    if (this.widget)
      this.widget.destroy();

    this.problemId = this.problemIdInput;
    this.problemIdInput = '';
    this.loading = true;

    setTimeout(() => {
      this.widget = window.SE.widget("example-widget");
      this.loading = false;
    }, 500);
  }

  public clearProblemId(): void {
    this.problemId = '';
    if (this.widget) {
      this.widget.destroy();
      this.widget = null;
    }
  }

  public testProblems(): void {
    const response = fetch(`http://localhost:3000/problem/test/${this.accessToken}`, {
      method: 'GET',
    });
    response.then((res) => {
      res.text().then((text) => {
        this.message = text;
      });
    });
  }

  public getSubmission(): void {
    const response = fetch(`http://localhost:3000/problem/${this.submissionId}/${this.accessToken}`, {
      method: 'GET',
    });
    response.then((res) => {
      res.text().then((text) => {
        this.message = text;
      });
    });

    this.submissionId = '';
  }

}
