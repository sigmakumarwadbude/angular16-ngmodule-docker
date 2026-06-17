import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  template: `  
    <div class="mx-auto max-w-4xl rounded-lg bg-white shadow-md">
      <div class="border-b px-6 py-4">
        <h1 class="text-2xl font-semibold text-gray-800">
          {{ pageTitle }}
        </h1>
      </div>

      <div class="p-8">
        <p>Hello Angular 16!</p>
      </div>
    </div>  
  `,
})
export class WelcomeComponent {
  public pageTitle = 'Welcome';
}
