import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PreHeaderComponent } from "../../shared/components/header/pre-header/pre-header.component";
import { PrimaryHeaderComponent } from "../../shared/components/header/primary-header/primary-header.component";
import { AppStore } from '../../store/app.store';
import { ResponsiveMainLinksComponent } from "../../shared/components/navigations/responsive-main-links/responsive-main-links.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { catchError, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastComponent } from "../../shared/components/toast/toast.component";


@Component({
    selector: 'app-main',
    imports: [
    RouterOutlet,
    PreHeaderComponent,
    PrimaryHeaderComponent,
    ResponsiveMainLinksComponent,
    FooterComponent,
    ToastComponent
],
    template : `
    <section aria-label="Main Page" class="w-full ">
    <app-pre-header />
    <main aria-label="Main Content" class="pb-10 py-2 px-2 lg:py-5  lg:px-20">
    <app-toast/>
    <app-primary-header/>
    <router-outlet />
    </main>
    <app-footer />
    <app-responsive-main-links class="lg:hidden"/>    

    </section>
    ` ,
})

export class MainComponent implements OnInit{
    readonly appStore = inject(AppStore);

    constructor(){
    this.initUserData();
    this.appStore.getProducts();
    }

    ngOnInit(): void {
        this.appStore.getWishlist();
    }
    
    private initUserData() : void {
        this.appStore.initGetUserData().pipe(
            tap((user) => {
            if (user) {
            this.appStore.loadCarts(user.id);
            }
            }),
            catchError((err) =>  of(err.message)),
            takeUntilDestroyed()
        ).subscribe();
    }
}
