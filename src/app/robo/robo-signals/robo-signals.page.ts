// robo-signals.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../services/websocket.service';

interface RobotDecision {
  currencyPair: string;
  decision: string;
  time: string;
}

@Component({
  selector: 'app-robo-signals',
  templateUrl: './robo-signals.page.html',
  styleUrls: ['./robo-signals.page.scss']
})
export class RoboSignalsPage implements OnInit, OnDestroy {
  decisions: RobotDecision[] = [];
  private decisionSubscription: Subscription | null = null;

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    // Substitua '/ws/some_path/' pelo caminho real usado no roteamento do Django Channels
    this.webSocketService.connect('ws://127.0.0.1:8000/ws/signal/'); 

    this.decisionSubscription = this.webSocketService.messages$.subscribe(
      (decision: RobotDecision) => {
        this.processDecision(decision);
      },
      error => {
        console.error('Error fetching decisions:', error);
      }
    );
  }

  private processDecision(decision: RobotDecision): void {
    this.decisions.push(decision);
  }

  ngOnDestroy(): void {
    if (this.decisionSubscription) {
      this.decisionSubscription.unsubscribe();
    }
    this.webSocketService.close();
  }
}
