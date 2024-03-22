import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BehaviorService {
  private dataSubject = new BehaviorSubject<string>('');
  private groupSubject = new BehaviorSubject<string>('');
  constructor() {}

  data$ = this.dataSubject.asObservable();
  group$ = this.groupSubject.asObservable();

  // Method to update the data
  updateData(newValue: any) {
    this.dataSubject.next(newValue);
  }

  updateGroup(newValue: any) {
    this.groupSubject.next(newValue);
  }
}
