import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from './../../../../services/api.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-hub-hue',
  templateUrl: './hub-hue.component.html',
  styleUrls: ['./hub-hue.component.css']
})
export class HubHueComponent implements OnInit{

  @Input() hub: any;
  hueMap = new Map();
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  fxFlexValue = 24;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getHueConfig();
  }

  getHueConfig(){
    this.apiService.getHueConfig(this.hub._id).subscribe((data) => {
      if (!isNullOrUndefined(data)){
        Object.keys(data).forEach((key) => {
          if (!isNullOrUndefined(data[key].color)){
            this.hueMap.set(key,data[key]);
          }
        });
      }
     })
  }

  onChange(event,key) {
    this.hueMap.get(key).on = event.checked;
    this.apiService.sendHueCommand(this.hub._id,key,this.hueMap.get(key)).subscribe((data) => {
    })
  }
}
