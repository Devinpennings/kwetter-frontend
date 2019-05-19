import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {SearchService} from '../../shared/services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  inputValue: string;
  options = [];

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onInput(value: string): void {
    if (value.length < 3) { return; }

    this.searchService.search(value).subscribe(result => {
      this.options = result;
    });
  }

  isSelected(s: string) {
    return this.router.url === s;
  }
}
