import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements OnDestroy {
  private socket$: WebSocketSubject<any> | null = null;
  private messagesSubject = new Subject<any>();
  public messages$ = this.messagesSubject.asObservable();
  private destroy$ = new Subject<void>();

  constructor() {}

  public connect(url: string): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(url);
      this.socket$.pipe(takeUntil(this.destroy$)).subscribe(
        (msg: any) => this.messagesSubject.next(msg),
        (error: any) => console.error('WebSocket error:', error),
        () => console.log('WebSocket connection closed')
      );
    }
  }

  public sendMessage(message: any): void {
    if (this.socket$) {
      this.socket$.next(message);
    } else {
      console.error('WebSocket connection is not established.');
    }
  }

  public close(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.socket$) {
      this.socket$.complete();
      this.socket$ = null;
    }
  }

  ngOnDestroy(): void {
    this.close();
  }
}
