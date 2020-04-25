import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from './../../../services/api.service';

@Component({
  selector: 'app-hub-control',
  templateUrl: './hub-control.component.html',
  styleUrls: ['./hub-control.component.css']
})
export class HubControlComponent implements OnInit {

  @Input() hub: any;
  hubConfig:any;
  configReady = false;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getHubConfig();
  }

  getHubConfig(){
    this.apiService.getHubConfig(this.hub._id).subscribe((data) => {
      this.hubConfig = data;
      this.configReady = true;
     })
  }
}
