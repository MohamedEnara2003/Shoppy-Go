import { Component, inject } from '@angular/core';
import { MegaMenuModule } from 'primeng/megamenu';
import { AppStore } from '../../../store/app.store';


@Component({
selector: 'app-list-categories',
imports: [MegaMenuModule ],
template: `
<div class="card">
<p-megamenu [model]="appStore.categoryMegaMenuItem()"   
orientation="vertical" 
[style]="{width :  '100%',  textTransform : 'capitalize', border : 'transparent'}"/>
</div>
`,
})
export class ListCategoriesComponent {
readonly appStore = inject(AppStore);

}
