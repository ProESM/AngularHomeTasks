import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppSliderComponent } from './shared/containers/app-slider/app-slider.component';
import { ItemComponent } from './shared/components/item/item.component';
import { TodoComponent } from './shared/components/todo/todo.component';

import { TagService } from './shared/services/tag.service';
import { TodoItemService } from './shared/services/todo-item.service';
import { TodoItemsService } from './shared/services/todo-items.service';

export function loadTags(tagService: TagService) {
  return () => {
    return tagService.loadTags();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    AppSliderComponent,
    ItemComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    TagService,
    TodoItemService,
    TodoItemsService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadTags,
      deps: [TagService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
