import {Component, ElementRef} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Location} from "@angular/common";

declare global {
  interface Window {
    SEC?: any;
    SE?: any;
  }
}

@Component({
  selector: 'app-compiler',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
})
export class ContainerComponent {


  public token: string = '';
  public tokenInput: string = '';
  public lastResponse: string = '';
  public workspaceId: string = '';
  public workspaceIdInput: string = '';
  public loading: boolean = false;
  private workspace: any;
  public submissionId: string = '';

  public scenario: string = "";
  public file: File | null = null;
  public projectId: string = "";

  public constructor(private elementRef: ElementRef, private readonly location: Location) {
  }


  public ngAfterViewInit() {
    const s2 = document.createElement('script');
    s2.type = 'text/javascript';
    s2.text = `
    (function(d, s, id) {
      SE_HTTPS = true;
      SE_BASE = "fe530c0e.containers.sphere-engine.com"
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
    this.elementRef.nativeElement.appendChild(s2);
  }

  public setToken(): void {
    this.token = this.tokenInput;
    this.tokenInput = '';
  }

  public clearToken(): void {
    this.token = '';
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.file = fileList[0];
    } else {
      this.file = null;
    }
  }

  public setWorkspaceId(): void {
    if (!this.workspaceIdInput)
      return;

    if (this.workspace)
      this.workspace.destroy();

    this.workspaceId = this.workspaceIdInput;
    this.workspaceIdInput = '';
    this.loading = true;

    setTimeout(() => {
      this.workspace = window.SE.workspace("example-container");
      this.loading = false;
    }, 100);
  }

  public clearWorkspaceId(): void {
    this.workspaceId = '';
    if (this.workspace) {
      this.workspace.destroy();
      this.workspace = null;
    }
  }

  public testContainers(): void {
    const response = fetch(`http://localhost:3000/container/test/${this.token}`, {
      method: 'GET',
    });
    response.then((res) => {
      res.text().then((text) => {
        this.lastResponse = text;
      });
    });
  }

  public goBack(): void {
    this.location.back();
  }

  public getSubmission(): void {
    const response = fetch(`http://localhost:3000/container/submission/${this.token}/${this.submissionId}`, {
      method: 'GET',
    });
    response.then((res) => {
      res.text().then((text) => {
        this.lastResponse = text;
      });
    });

    this.submissionId = '';
  }

  public createSubmission(): void {
    if (!this.file) {
      alert('Please select a file.');
      return;
    }

    const form = new FormData();
    form.append('source', this.file, this.file?.name);
    form.append('scenario', this.scenario);
    const response = fetch(`http://localhost:3000/container/submission/${this.token}/${this.projectId}`, {
      method: 'POST', body: form,
    });
    response.then((res) => {
      res.text().then((text) => {
        this.lastResponse = text;
      });
    });

    this.file = null;
    this.scenario = '';
    this.projectId = '';
  }
}
