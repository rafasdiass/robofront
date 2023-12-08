// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarPageModule } from './components/navbar/navbar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

// AngularFire
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';
import { provideStorage, getStorage } from '@angular/fire/storage';

// Services
import { ApiService } from './services/api.service';
import { AuthService } from './services-login/auth-service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'ws://127.0.0.1:8000', options: {} };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NavbarPageModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    SocketIoModule.forRoot(config),  // Adicione esta linha
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ApiService,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
