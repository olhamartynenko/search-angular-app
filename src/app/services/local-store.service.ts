import { Injectable } from '@angular/core';
import { OBJECT_TYPE } from '../constants/base.constants';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public getItem(key: string): any {
    let item: string | null = localStorage.getItem(key);

    if (!item) {
      return;
    }

    try {
      item = JSON.parse(item);
    } catch (e) {
      console.warn(`Invalid JSON from localStorage key "${key}"`);
    }

    return item;
  }

  public setItem(key: string, value: any): void {
    localStorage.setItem(
      key,
      typeof value === OBJECT_TYPE ? JSON.stringify(value) : value
    );
  }
}
