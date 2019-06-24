import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {SearchBlService} from './search.bl';
import {AppContext, MoviesDataSource} from '../../../app-context.service';
import {MatAutocompleteTrigger} from '@angular/material';

@Component({
  selector: 'app-search-component',
  template: `
    <div class="search-wrapper">
      <div class="loader">
        <mat-progress-bar *ngIf="Loading" mode="indeterminate"></mat-progress-bar>
      </div>
      <form class="search-form">

        <mat-form-field *ngIf="searchFormControl"
                        floatPlaceholder="never" floatLabel="never">
          <input type="text" matInput
                 [formControl]="searchFormControl"
                 [matAutocomplete]="auto"
                 #movieinput
                 placeholder="Search by movie Title">
          <mat-autocomplete #autocomplete (optionSelected)="optionSelected($event)" autoActiveFirstOption #auto="matAutocomplete">
            <mat-option *ngFor="let option of filteredOptions" [value]="(option.title).toLowerCase()"
            >
              {{ option.title }}
            </mat-option>
          </mat-autocomplete>
          <mat-icon matSuffix (click)="closePanel($event)">search</mat-icon>
        </mat-form-field>
      </form>
    </div>
  `,
  styles: [`
    input,
    mat-form-field {
      width: 500px;
    }

    mat-icon {
      padding: 0 0 0 20px;
      color: #ededed;
    }

    .loader {
      width: 100%;
      height: 5px;
      position: fixed;
      top: 0;
      z-index: 100;
      left: 0;
    }
  `]
})

export class SearchComponent implements OnInit, AfterViewInit {

  @ViewChild('movieinput') movieinput: any;
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;
  searchFormControl: FormControl;

  constructor(private searchBl: SearchBlService,
              private app: AppContext) {
  }

  ngOnInit() {

    this.searchFormControl = this.searchBl.createSearchForm();
    this.app.MoviesDataSource = MoviesDataSource.SEARCH;

  }

  ngAfterViewInit() {

    fromEvent(this.movieinput.nativeElement, 'keyup').pipe(
      map((evt: any) => evt.target.value),
      debounceTime(500),
      // emit only if data changes since the last emit
      distinctUntilChanged())
      .subscribe((text: string) => {
          this.searchBl.onSearchChange(text);
        }
      );

    this.searchBl.makeDefaultSearch();
  }

  get filteredOptions() {
    return this.searchBl.FilteredOptions;
  }

  get Loading() {
    return this.app.Loading;
  }

  optionSelected(event) {
    this.searchBl.getMoviesByNameAndYear(event.option.value);
  }

  closePanel($event) {
    $event.stopPropagation();
    $event.preventDefault();
    this.autocomplete.closePanel();
  }


}
