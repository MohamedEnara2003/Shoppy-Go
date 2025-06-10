import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  template: `
    <footer class="bg-black text-white py-12" role="contentinfo" aria-label="Main footer">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Exclusive Section -->
          <section aria-labelledby="exclusive-heading">
            <h2 id="exclusive-heading" class="text-2xl font-bold mb-4">Exclusive</h2>
            <p class="mb-4">Subscribe</p>
            <p class="mb-4">Get 10% off your first order</p>
            <form  class="flex" aria-label="Newsletter subscription">
              <input 
                type="email" 
                placeholder="Enter your email" 
                class="px-4 py-2 bg-white text-black rounded-l-md focus:outline-none"
                aria-label="Email address"
                required
                name="email"
              >
              <button 
                type="submit"
                class="bg-secondary px-4 py-2 rounded-r-md hover:bg-secondary/70 duration-200 cursor-pointer"
                aria-label="Subscribe to newsletter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
                stroke="currentColor" class="size-6" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
              </button>
            </form>
          </section>

          <!-- Support Section -->
          <nav aria-labelledby="support-heading">
            <h2 id="support-heading" class="text-xl font-semibold mb-4">Support</h2>
            <ul class="space-y-2">
              @for (item of supportLinks(); track item) {
                <li>
                  <a [href]="item.link" class="hover:text-gray-300" [attr.aria-label]="item.text">{{ item.text }}</a>
                </li>
              }
            </ul>
          </nav>

          <!-- Account Section -->
          <nav aria-labelledby="account-heading">
            <h2 id="account-heading" class="text-xl font-semibold mb-4">Account</h2>
            <ul class="space-y-2">
              @for (item of accountLinks(); track item) {
                <li>
                  <a [href]="item.link" class="hover:text-gray-300" [attr.aria-label]="item.text">{{ item.text }}</a>
                </li>
              }
            </ul>
          </nav>

          <!-- Quick Link Section -->
          <nav aria-labelledby="quick-links-heading">
            <h2 id="quick-links-heading" class="text-xl font-semibold mb-4">Quick Link</h2>
            <ul class="space-y-2">
              @for (item of quickLinks(); track item) {
                <li>
                  <a [href]="item.link" class="hover:text-gray-300" [attr.aria-label]="item.text">{{ item.text }}</a>
                </li>
              }
            </ul>
          </nav>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-700">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <p class="text-gray-500" role="contentinfo">Copyright Rimel 2022. All right reserved.</p>
            <nav aria-label="Social media links" class="flex gap-4 mt-4 md:mt-0">
              @for (social of socialLinks(); track social) {
                <a 
                  [href]="social.link" 
                  class="text-gray-500 hover:text-white transition-colors duration-200"
                  [attr.aria-label]="'Follow us on ' + social.name"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i [class]="social.icon" aria-hidden="true"></i>
                </a>
              }
            </nav>
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
