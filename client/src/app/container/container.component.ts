import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';

declare global {
  interface Window {
    SEC?: any;
  }
}

@Component({
  selector: 'app-compiler',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './container.component.html',
})
export class ContainerComponent {

  public token: string = '';
  public tokenInput: string = '';
  public lastResponse: string = '';

  public setToken(): void {
    this.token = this.tokenInput;
    this.tokenInput = '';
  }

  public clearToken(): void {
    this.token = '';
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
}
