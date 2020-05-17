import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from './../../../../services/api.service';
import { isNullOrUndefined } from 'util';
import { ColorEvent } from 'ngx-color';

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

  onChangePower(event,key) {
    this.hueMap.get(key).on = event.checked;
    this.apiService.sendHueCommand(this.hub._id,key,this.hueMap.get(key)).subscribe((data) => {
    })
  }

  onChangeBrightness(event,key) {
    this.hueMap.get(key).brightness = event.value;
    this.apiService.sendHueCommand(this.hub._id,key,this.hueMap.get(key)).subscribe((data) => {
    })
  }

  formatLabel(value: number) {
    return value + '%';
  }

  onChangeColor($event: ColorEvent,key) {
    const r = $event.color.rgb.r;
    const g = $event.color.rgb.g;
    const b = $event.color.rgb.b;
    const { x , y } = this.applyCorrections(r,g,b);
    this.hueMap.get(key).color.mode = 'xy';
    this.hueMap.get(key).color.xy.x = +x;
    this.hueMap.get(key).color.xy.y = +y;
    this.apiService.sendHueCommand(this.hub._id,key,this.hueMap.get(key)).subscribe((data) => {
    })
  }

  applyCorrections (r, g, b) {
    const gammaCorrectedRed = this.computeGammaCorrection(r);
    const gammaCorrectedGreen = this.computeGammaCorrection(g);
    const gammaCorrectedBlue = this.computeGammaCorrection(b);
    const { X, Y, Z } = this.computeD65Conversion(
      gammaCorrectedRed,
      gammaCorrectedGreen,
      gammaCorrectedBlue
    );
    return this.calculateXYValues(X, Y, Z);
  }

  computeGammaCorrection (color) {
    return (color > 0.04045)
      ? Math.pow((color + 0.055) / (1.0 + 0.055), 2.4)
      : (color / 12.92);
  }

  computeD65Conversion (r, g, b) {
    const X = r * 0.664511 + g * 0.154324 + b * 0.162028;
    const Y = r * 0.283881 + g * 0.668433 + b * 0.047685;
    const Z = r * 0.000088 + g * 0.072310 + b * 0.986039;
    return { X, Y, Z };
  }

  calculateXYValues (X, Y, Z) {
    const x = (X / (X + Y + Z)).toFixed(4);
    const y = (Y / (X + Y + Z)).toFixed(4);
    return { x, y };
  }
}
