import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.decisionSubscription = this.apiService.getRoboDecisions().subscribe(
      (decisions: RobotDecision[]) => {
        this.decisions = decisions;
      },
      (error: any) => {
        console.error('Error fetching decisions:', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.decisionSubscription) {
      this.decisionSubscription.unsubscribe();
    }
  }
}
