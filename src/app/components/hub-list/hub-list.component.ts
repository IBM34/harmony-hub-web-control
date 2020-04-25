import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-hub-list',
  templateUrl: './hub-list.component.html',
  styleUrls: ['./hub-list.component.css']
})
export class HubListComponent implements OnInit {

  Hub:any = [];

  constructor(private apiService: ApiService) { 
  }

  ngOnInit() {
    this.getHubs();
  }

  getHubs(){
    this.apiService.getHubs().subscribe((data) => {
     this.Hub = data;
    })
  }

  removeHub(hub, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteHub(hub._id).subscribe((data) => {
          this.Hub.splice(index, 1);
        }
      )    
    }
  }

}