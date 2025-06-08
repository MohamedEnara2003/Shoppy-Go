import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  template: `
    <footer class="bg-black text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Exclusive Section -->
          <div>
            <h3 class="text-2xl font-bold mb-4">Exclusive</h3>
            <p class="mb-4">Subscribe</p>
            <p class="mb-4">Get 10% off your first order</p>
            <div class="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                class="px-4 py-2 bg-white text-black rounded-l-md focus:outline-none"
              >
              <button class="bg-secondary px-4 py-2 rounded-r-md hover:bg-secondary/70 duration-200 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Support Section -->
          <div>
            <h3 class="text-xl font-semibold mb-4">Support</h3>
            <ul class="space-y-2">
              @for (item of supportLinks(); track item) {
                <li>
                  <a [href]="item.link" class="hover:text-gray-300">{{ item.text }}</a>
                </li>
              }
            </ul>
          </div>

          <!-- Account Section -->
          <div>
            <h3 class="text-xl font-semibold mb-4">Account</h3>
            <ul class="space-y-2">
              @for (item of accountLinks(); track item) {
                <li>
                  <a [href]="item.link" class="hover:text-gray-300">{{ item.text }}</a>
                </li>
              }
            </ul>
          </div>

          <!-- Quick Link Section -->
          <div>
            <h3 class="text-xl font-semibold mb-4">Quick Link</h3>
            <ul class="space-y-2">
              @for (item of quickLinks(); track item) {
                <li>
                  <a [href]="item.link" class="hover:text-gray-300">{{ item.text }}</a>
                </li>
              }
            </ul>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-700">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <p class="text-gray-500">Copyright Rimel 2022. All right reserved.</p>
            <div class="flex gap-4 mt-4 md:mt-0">
              @for (social of socialLinks(); track social) {
                <a [href]="social.link" class="text-gray-500 hover:text-white transition-colors duration-200">
                  <i [class]="social.icon"></i>
                </a>
              }
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: ``
})
export class FooterComponent {
  supportLinks = signal([
    { text: 'FAQ', link: '/faq' },
    { text: 'Contact', link: '/contact' },
    { text: 'Privacy Policy', link: '/privacy' },
    { text: 'Terms Of Use', link: '/terms' }
  ]);

  accountLinks = signal([
    { text: 'My Account', link: '/account' },
    { text: 'Login / Register', link: '/auth' },
    { text: 'Cart', link: '/cart' },
    { text: 'Wishlist', link: '/wishlist' },
    { text: 'Shop', link: '/shop' }
  ]);

  quickLinks = signal([
    { text: 'Privacy Policy', link: '/privacy' },
    { text: 'Terms Of Use', link: '/terms' },
    { text: 'FAQ', link: '/faq' },
    { text: 'Contact', link: '/contact' }
  ]);

  socialLinks = signal([
    { 
      name: 'Facebook',
      link: 'https://facebook.com',
      icon: 'pi pi-facebook'
    },
    { 
      name: 'Twitter',
      link: 'https://twitter.com',
      icon: 'pi pi-twitter'
    },
    { 
      name: 'Instagram',
      link: 'https://instagram.com',
      icon: 'pi pi-instagram'
    },
    { 
      name: 'LinkedIn',
      link: 'https://linkedin.com',
      icon: 'pi pi-linkedin'
    }
  ]);
}
