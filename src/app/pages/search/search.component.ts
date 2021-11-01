import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private propService: PropertyService
  ) {}
  searchResults: any;
  loading = true;
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      console.log(params);
      this.propService.search(params).subscribe((res) => {
        console.log(res);
        this.searchResults = res;
        this.loading = false;
      });
    });
  }
}
