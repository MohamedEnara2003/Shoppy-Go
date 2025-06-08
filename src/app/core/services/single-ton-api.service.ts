import { Injectable } from '@angular/core';
import { createClient, SupabaseClient} from '@supabase/supabase-js';
import { environment } from '../../../environment/environment';
import { EMPTY, from, map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SingleTonApiService {
  supabase : SupabaseClient ;
  constructor(){
  this.supabase = createClient(environment.supabaseUrl , environment.supabaseKey);
  }
  
  select<G>(table : string) : Observable<G[]> {
  const promise = this.supabase.from(table).select('*')
  return from(promise).pipe(map((res) => res.data || []))
  }

  selectByEq<G>(tableName : string , column : string , value : string | number ) : Observable<G[]> {
    const promise = this.supabase.from(tableName).select('*').eq(column , value) ;
    return from(promise).pipe(map((res) => res.data!))
  }
  
  selectById<G>(table : string , id : string | number, selectType? : ``) : Observable<G> {
  const promise = this.supabase.from(table).select(selectType || '*')
  .match({id : id})
  .single()
  return from(promise).pipe(map((res) => res.data as G))
  }
  

  insert<G>(tableName : string , data : G) : Observable<G> {
    const promise = this.supabase.from(tableName).insert(data).select()
    .order('created_at' , {ascending : true})
    .single()
    return from(promise).pipe(map((res) => res.data as G))
  }

  update<G>(table : string , data : G ,  id : string | number): Observable<G> {
    const promise = this.supabase.from(table).update(data).match({id}).select().single()
    return from(promise).pipe(map((res) => res.data!))
  }

  uploadAndGetPublicUrl(bucket : string, filePath : string , file : File) : 
  Observable<{file_url : string , file_name : string} | undefined>{
    const promise = this.supabase.storage.from(bucket).upload(file.name ,file ,{upsert : true})
    return from(promise).pipe(map((res) => {
    const file_name = res.data?.path ;
    if(!file_name) return undefined;
    const { data } = this.supabase.storage.from(bucket).getPublicUrl(file_name);
    return {file_url : data.publicUrl , file_name };
    }))
  }
  
  // Methods Delete 
  removeStoragFile(bucket: string , filePath: string): Observable<void> {
    const promise = this.supabase.storage.from(bucket).remove([filePath]);
    return from(promise).pipe(map(() => {}));
  }

  deleteById(table : string , id : string | number) : Observable<void>{
    const promise = this.supabase.from(table)
    .delete()
    .match({id})
    return from(promise).pipe(map(() => {}))
  }

  deleteAllData(table : string ) : Observable<void>{
    const promise = this.supabase.from(table).delete().gt('id', 0);
    return from(promise).pipe(map(() => {}))
  }
}
