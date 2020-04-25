import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HubCreateComponent } from './components/hub-create/hub-create.component';
import { HubListComponent } from './components/hub-list/hub-list.component';
import { ApiService } from './services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HubDeviceComponent } from './components/hub-list/hub-control/hub-device/hub-device.component';
import { HubControlComponent } from './components/hub-list/hub-control/hub-control.component';


@NgModule({
  declarations: [
    AppComponent,
    HubCreateComponent,
    HubListComponent,
    HubControlComponent,
    HubDeviceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
