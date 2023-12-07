import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../services/websocket.service';

import { ChartOptions, ChartDataset } from 'chart.js';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {
  public stocks: any[] = [];
  public newsFeed: any[] = [];
  public figures: any[] = [];
  public chartType: ChartType = 'line';
  public chartData: ChartDataset[] = [{ data: [], label: 'Stocks' }];
  public chartLabels: string[] = [];  
  public chartOptions: ChartOptions = {
    responsive: true,
  };

  private stockDataSubscription: Subscription | null = null;

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    // Conectar ao WebSocket e iniciar a escuta de dados
    this.webSocketService.connect('ws://your-websocket-url'); // Substitua pela URL correta
    this.stockDataSubscription = this.webSocketService.messages$.subscribe(
      (stockData: any) => {
        this.processStockData(stockData);
      },
      error => console.error('Error receiving stock data:', error)
    );
  }

  private processStockData(stockData: any): void {
    // Processar os dados de ações recebidos do WebSocket
    if (stockData && stockData['Time Series (5min)']) {
      this.stocks = Object.values(stockData['Time Series (5min)']);
      this.chartData[0].data = this.stocks.map(stock => parseFloat(stock['close'])); // Ajuste para a chave correta
      this.chartLabels = Object.keys(stockData['Time Series (5min)']);
    }
  }

  ngOnDestroy(): void {
    // Encerrar a assinatura e a conexão do WebSocket ao destruir o componente
    if (this.stockDataSubscription) {
      this.stockDataSubscription.unsubscribe();
    }
    this.webSocketService.close();
  }
}
