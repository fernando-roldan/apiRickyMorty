import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  dataId: any = String;
  data: any = {};

  constructor(private apiService: ApiService, private router: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {

    this.detailsGet();
  }

  detailsGet() {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.dataId = params.get('id');
      this.apiService.getDetails(this.dataId).subscribe(dataId => {
        this.data = dataId;
        //console.log(this.data);
      })
    })
  }

  goBack(): void {
    this.location.back();
  }

}
