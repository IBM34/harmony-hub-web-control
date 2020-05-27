import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ApiService } from './../../../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hub-control',
  templateUrl: './hub-control.component.html',
  styleUrls: ['./hub-control.component.css']
})
export class HubControlComponent implements OnInit {

  @Input() hub: any;
  hubConfig:any;
  configReady = false;

  constructor(private apiService: ApiService, private router: Router,
    private ngZone: NgZone, private toastr: ToastrService) {
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

  deleteHub(){
    this.apiService.deleteHub(this.hub._id).subscribe(
      (res) => {
        this.toastr.success('Hub successfully deleted!');
        this.ngZone.run(() => this.router.navigateByUrl('/hub-create'))
      }, (error) => {
        console.log(error);
      });
  }
}
