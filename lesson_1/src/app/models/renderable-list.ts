import { IUser } from './../models/user';
export interface IRenderableList<T> {
    render(): void;
    push(item: T): void;
    clear(): void;
}

export class RenderableList<T> {
    private genericList: T[];

    constructor () {
        this.genericList = [];
    }

    render(): void {
        this.genericList
            .forEach(
                item  => {
                    let user = item;
                    document.getElementById('test').innerHTML = `
                        <img class="user-picture" src="${user["picture"]}">
                        <span class="user-name">${user["name"]}</span>
                        <span class="user-email">(${user["email"]})</span>
                        <span class="user-phone">(${user["phone"]})</span>
                    `;
                }
            );
    }

    push(item: T): void {
        this.genericList.push(item);
    }

    clear(): void {
        while (this.genericList.length) {
            this.genericList.pop();
        }
    }
}