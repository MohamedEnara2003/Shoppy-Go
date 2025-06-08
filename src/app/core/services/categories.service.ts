import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categories = signal([
    {
    img_url : 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/categories//071a9167-a3b9-4289-ab09-dd8afb88eb99.webp',
    paht : ''
    },
    {
    img_url : 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/categories//9ac5d1ec-3b32-4adb-a2f5-adc8b3c047e9.webp',
    paht : ''
    }
    ,
    {
    img_url : 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/categories//76d7109c-ebd3-4c0b-bccb-d73b65386c6e.webp',
    paht : ''
    }
    ,
    {
    img_url : 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/categories//6576598_sd.webp',
    paht : ''
    }
    ,
    {
    img_url : 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/categories//6573589cv17d.webp',
    paht : ''
    }
    ,
    {
    img_url : 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/categories//6566195_sd.webp',
    paht : ''
    }
    ,
    {
    img_url : 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/categories//6537993_sd.webp',
    paht : ''
    }
    ,
    {
    img_url : 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/categories//6507317_sd.webp',
    paht : ''
    }
    ,
    {
    img_url : 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/categories//2848236-img-icons-laptops-6471f1dd-4057-4dc1-a71c-16c19adb2e34.webp',
    paht : ''
    },
    {
    img_url : 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/categories//1d618edf-3074-4605-8172-24a91caad0b3.webp',
    paht : ''
    }
    ]).asReadonly();
}
