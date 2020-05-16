import { ChangeDetectorRef, OnDestroy,Component, OnInit, Input } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { ApiService } from './../../../../services/api.service';

@Component({
  selector: 'app-hub-device',
  templateUrl: './hub-device.component.html',
  styleUrls: ['./hub-device.component.css']
})
export class HubDeviceComponent implements OnInit, OnDestroy{
  
  @Input() hub:any
  @Input() device:any;
  commandMap = new Map();
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  fxFlexValue = 24;

  constructor(private apiService: ApiService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.getCommands();
  }

  sendCommand(commandName){
    this.apiService.sendDeviceCommand(this.hub._id,this.device.id,commandName).subscribe((data) => {
     })
  }

  getCommands() {
    this.device.controlGroup.forEach(element => {
      let commands = [];
      element.function.forEach(f => {
        let command = f.action.split('"')[3];
        commands.push(command);
      });
      this.commandMap.set(element.name,commands);
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
