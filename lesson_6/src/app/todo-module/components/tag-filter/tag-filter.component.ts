import { Component, OnInit, AfterViewInit, OnDestroy, forwardRef } from '@angular/core';

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'tag-filter',
    templateUrl: './tag-filter.component.html',
    styleUrls: ['./tag-filter.component.scss'],
    providers: [ 
        { 
            provide: NG_VALUE_ACCESSOR, 
            useExisting: forwardRef(() => TagFilterComponent), 
            multi: true 
        }
    ]
})
export class TagFilterComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
    tags: string[];

    public propagateChange: (any) => void;
    public propagateTouch: (any) => void;

    constructor() {
        this.tags = [];
    }

    ngOnInit() {}

    ngAfterViewInit(): void {}

    // Записываем новое значение элементу (представлению).
    // Этот метод будет вызываться API-шкой формы для записи в представление при программных (в коде) запросах (модель -> представление).
    writeValue(value: any): void {
        this.tags = value;

        console.log(`Получено значение: ${JSON.stringify(value)}. Записываем его в модель, чтобы оно стало доступным в представлении`);
    }

    // Регистрируем функцию обратного вызова, которая должна вызываться, когда элемент управления (контрол) изменится в пользовательском интерфейсе.
    // Этот метод будет вызываться API-шкой формы при инициализации, что даст возможность обновлять модель формы, когда значения распространятся из представления.
    // Здесь нужно сохранить полученную функцию как свойство, чтобы иметь возможность вызвать ее позднее.
    registerOnChange(fn: any): void {
        console.log('Регистрируем функцию обратного вызова для перехвата изменений');
        this.propagateChange = fn;
    }

    // Регистрируем функцию обратного вызова, которая должна вызываться, когда элемент управления теряет фокус (blur событие).
    // Этот метод будет вызываться API-шкой формы при инициализации, что даст возможность обновлять модель формы, когда элемент управления будет терять фокус (blur событие).
    // Здесь нужно сохранить полученную функцию как свойство, чтобы иметь возможность вызвать ее позднее.
    registerOnTouched(fn: any): void {
        console.log('Регистрируем функцию обратного вызова для перехвата потери фокуса');
        this.propagateTouch = fn;
    }

    add(f: any): void {
        this.tags.push("");
        this.propagateChange(this.tags);
    }

    onTagChange(index: number, tag: string): void {
        if (this.tags[index] !== undefined) {
            this.tags[index] = tag;
        }
        this.propagateChange(this.tags);
    }

    delete(index: number): void {
        this.tags.splice(index, 1);
        this.propagateChange(this.tags);
    }

    trackByFn(index, item) {
        return index; // or item.id
    }

    ngOnDestroy() {}
}
