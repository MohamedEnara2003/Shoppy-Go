import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NavListItemComponent } from "../../../../shared/components/navigations/nav-list-item/nav-list-item.component";
import { SharedModule } from '../../../../shared/modules/shared.module';

interface ContactInfo {
  icon: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SharedModule , NavListItemComponent],
  template: `
    <section class="w-full">
      <app-nav-list-item [items]="navLinks()"/>

      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
          <!-- Contact Form Section -->
          <div class="md:col-span-8">
            <p-card header="Write to Us" styleClass="shadow-lg rounded-lg">
              <form class="space-y-6">
                <div class="space-y-2">
                  <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                  <input id="name" type="text" pInputText 
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Enter your name">
                </div>

                <div class="space-y-2">
                  <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                  <input id="email" type="email" pInputText 
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Enter your email">
                </div>

                <div class="space-y-2">
                  <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                  <input id="phone" type="tel" pInputText 
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Enter your phone number">
                </div>

                <div class="space-y-2">
                  <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
                  <textarea id="message" pInputTextarea [rows]="5" 
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Enter your message"></textarea>
                </div>

                <p-button label="Send Message" icon="pi pi-send" 
                  styleClass="w-full  text-white font-medium   btn-secondary
                  py-2.5 px-4 rounded-lg transition-opacity duration-200"
                  [style]="{backgroundColor : 'var(--color-secondary)' , border : '1px solid'}"/>
              </form>
            </p-card>
          </div>

          <!-- Contact Information Section -->
          <div class="md:col-span-4">
            <p-card header="Call to Us" styleClass="shadow-lg rounded-lg">
              <div class="space-y-6">
                @for (item of contactInfo(); track item.title) {
                  <div class="flex items-center space-x-4">
                    <i [class]="'pi ' + item.icon + ' text-2xl text-secondary'"></i>
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">{{item.title}}</h3>
                      <p class="text-gray-600">{{item.content}}</p>
                    </div>
                  </div>
                
                  <p-divider />
                  
                }
              </div>
            </p-card>
          </div>
        </div>
      </div>
    </section>
  `,
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContactComponent {
  navLinks = signal<MenuItem[]>([
    {label: 'Home', routerLink: '/main/home'},
    {label: 'Contact'}
  ]);

  contactInfo = signal<ContactInfo[]>([
    {
      icon: 'pi-map-marker',
      title: 'Our Location',
      content: '123 Commerce Street, City, Country'
    },
    {
      icon: 'pi-phone',
      title: 'Phone Number',
      content: '+1 234 567 890'
    },
    {
      icon: 'pi-envelope',
      title: 'Email Address',
      content: 'contact@example.com'
    },
    {
      icon: 'pi-clock',
      title: 'Working Hours',
      content: 'Mon - Fri: 9:00 AM - 6:00 PM'
    }
  ]);
}
