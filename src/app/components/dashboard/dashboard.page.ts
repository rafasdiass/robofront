import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Fazer chamada HTTP para obter dados das ações
    this.stockDataSubscription = this.apiService.getStockData().subscribe(
      (stockData: any) => {
        this.processStockData(stockData);
      },
      (error: any) => console.error('Error receiving stock data:', error)
    );
  }

  private processStockData(stockData: any): void {
    // Processar os dados de ações recebidos da API
    if (stockData && stockData['Time Series (5min)']) {
      this.stocks = Object.values(stockData['Time Series (5min)']);
      this.chartData[0].data = this.stocks.map(stock => parseFloat(stock['4. close'])); // Ajuste para a chave correta
      this.chartLabels = Object.keys(stockData['Time Series (5min)']);
    }
  }

  ngOnDestroy(): void {
    // Encerrar a assinatura ao destruir o componente
    if (this.stockDataSubscription) {
      this.stockDataSubscription.unsubscribe();
    }
  }
}
