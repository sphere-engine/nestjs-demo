import { Component, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'client';
  public constructor(private elementRef: ElementRef) {}

  public ngAfterViewInit() {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.text = `SEC_HTTPS = true;
    SEC_BASE = "compilers.widgets.sphere-engine.com";
    (function(d, s, id){ SEC = window.SEC || (window.SEC = []);
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return; js = d.createElement(s); js.id = id;
      js.src = (SEC_HTTPS ? "https" : "http") + "://" + SEC_BASE + "/static/sdk/sdk.min.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, "script", "sphere-engine-compilers-jssdk"));

    SEC.ready = function(f) {
      if (document.readyState != "loading" && document.readyState != "interactive") f();
      else window.addEventListener("load", f);
    };`;

    this.elementRef.nativeElement.appendChild(s);
  }
}
