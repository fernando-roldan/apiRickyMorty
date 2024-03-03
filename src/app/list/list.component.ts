import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  data: any[] = [];
  nextPageUrl: string | null = null;
  prevPageUrl: string | null = null;
  totalCharacters: number = 0;
  currentPage: number = 1;
  totalPages: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.dataGet('https://rickandmortyapi.com/api/character/');
  }

  dataGet(url: string): void {
    /**
     * Obtener el arreglo de los personajes
     */
    this.apiService.getData(url).subscribe(data => {
      this.data = data.results;
      this.nextPageUrl = data.info.next;
      this.prevPageUrl = data.info.prev;
      this.totalCharacters = data.info.count;
      this.currentPage = this.getCurrentPageNumber(url);
      this.totalPages = data.info.pages;
    })
  }

  getCurrentPageNumber(url: string): number {
    const match = url.match(/page=(\d+)/);
    return match ? parseInt(match[1], 10) : 1;
  }

  getPageArray(): number[] {
    const pagesToShow = 4; 
    const currentPage = this.currentPage;
    const totalPages = this.totalPages;
    const pages = [];

    let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    if (endPage - startPage + 1 < pagesToShow) {
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  goToPage(page: number): void {
    const url = `https://rickandmortyapi.com/api/character/?page=${page}`;
    this.dataGet(url);
  }

  goToFirstPage(): void {
    this.goToPage(1);
  }

  goToLastPage(): void {
    this.goToPage(this.totalPages);
  }

  goToNextPage(): void {
    if (this.nextPageUrl) {
      this.dataGet(this.nextPageUrl);
    }
  }

  goToPrevPage(): void {
    if (this.prevPageUrl) {
      this.dataGet(this.prevPageUrl);
    }
  }

  pageChanged(event: any): void {
    const nextPage = event.pageIndex + 1;
    const url = `https://rickandmortyapi.com/api/character/?page=${nextPage}`;
    this.dataGet(url);
  }
}
