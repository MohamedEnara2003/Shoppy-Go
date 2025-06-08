import { Component, input, signal } from '@angular/core';
import { SharedModule } from '../../../../../../../shared/modules/shared.module';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-tags',
  imports: [SharedModule],
  template: `
    <div class="flex flex-col" role="group" aria-label="Product tags">
      <label for="tags" class="text-sm font-medium text-gray-700 mb-1">Tags</label>
      <div class="flex flex-wrap gap-2 mb-2" role="list" aria-label="Selected tags">
        @for (tag of selectedTags(); track tag) {
          <p-tag 
            [value]="tag" 
            (onRemove)="removeTag(tag)" 
            class="bg-blue-100 text-blue-800"
            [attr.aria-label]="'Tag: ' + tag"
          />
        }
      </div>

      <p-autoComplete 
        id="tags" 
        [suggestions]="filteredTags()" 
        (completeMethod)="filterTags($event)"
        [field]="'name'"
        [multiple]="true"
        [dropdown]="true"
        [forceSelection]="true"
        [minLength]="1"
        placeholder="Type to add tags"
        [inputStyle]="{'width':'100%'}"
        (onSelect)="onTagSelect($event)"
        (onUnselect)="onTagUnselect($event)"
        aria-label="Search and add tags"
      />
    </div>
  `,
})
export class ProductTagsComponent {
  form = input.required<FormGroup>()
  
  selectedTags = signal<string[]>([]);
  filteredTags = signal<any[]>([]);
  availableTags = signal<Array<{name: string}>>([
    { name: 'New' },
    { name: 'Sale' },
    { name: 'Popular' },
    { name: 'Limited' },
    { name: 'Featured' },
    { name: 'Best Seller'}
  ]).asReadonly();

  filterTags(event: any) {
    const query = event.query.toLowerCase();
    this.filteredTags.set(
      this.availableTags().filter(tag => 
        tag.name.toLowerCase().includes(query) && 
        !this.selectedTags().includes(tag.name)
      )
    );
  }

  onTagSelect(event: any) {
    if (!this.selectedTags().includes(event.value.name)) {
      this.selectedTags.update(tags => [...tags, event.value.name]);
      this.form().patchValue({
        tags: this.selectedTags()
      });
    }
  }

  onTagUnselect(event: any) {
    this.removeTag(event.value.name);
  }

  removeTag(tag: string) {
    this.selectedTags.update(tags => tags.filter(t => t !== tag));
    this.form().patchValue({
      tags: this.selectedTags()
    });
  }
}
