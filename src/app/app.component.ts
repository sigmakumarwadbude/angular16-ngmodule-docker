import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav class="bg-slate-800 shadow-md">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div class="text-xl font-bold text-white">
          {{pageTitle}}
        </div>

        <div class="flex gap-6">
          <a
            routerLink="/"
            routerLinkActive="text-white border-b-2 border-white"
            class="pb-1 text-slate-300 transition hover:text-white"
          >
            Home
          </a>

          <a
            routerLink="/products"
            routerLinkActive="text-white border-b-2 border-white"
            class="pb-1 text-slate-300 transition hover:text-white"
          >
            Products
          </a>
        </div>
      </div>
    </nav>

    <main class="mx-auto max-w-7xl p-6">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
 protected readonly pageTitle = 'Product Management';
}
