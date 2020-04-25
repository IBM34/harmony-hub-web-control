import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from './../../../../services/api.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-hub-device',
  templateUrl: './hub-device.component.html',
  styleUrls: ['./hub-device.component.css']
})
export class HubDeviceComponent implements OnInit {
  
  @Input() hub:any
  @Input() device:any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
  }

  sendCommand(commandName){
    this.apiService.sendDeviceCommand(this.hub._id,this.device.id,commandName).subscribe((data) => {
     })
  }

  getCommands() {
    let commands =  this.device.controlGroup
        .reduce((acc: any, arr: any) => acc.concat(arr.function), []);
    commands.forEach(element => {
      element.command = element.action.split('"')[3];
    });
    return commands;
  }
}
