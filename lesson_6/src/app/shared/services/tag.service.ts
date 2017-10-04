import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TagService {
    private _tagJsonUrl = "./assets/tags.json";
    
    tags: string[];

    constructor(private http: HttpClient) {}

    loadTags(): void {
        this.http.get(this._tagJsonUrl)            
            .subscribe(response => 
                {   
                    if (response["tags"] != undefined && response["tags"] != null) {
                        this.tags = response["tags"];
                    }
                    //console.log('tags=', this.tags);
                }
            );
    }
}