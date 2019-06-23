import {NgModule} from '@angular/core';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatExpansionModule, MatFormFieldModule, MatGridListModule,
  MatIconModule,
  MatInputModule, MatProgressBarModule,
  MatSidenavModule, MatTooltipModule
} from '@angular/material';
import {BidiModule} from '@angular/cdk/bidi';
import {MatProgressButtonsModule} from 'mat-progress-buttons';
const importExportArray = [

  //  material
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatSidenavModule,
  MatExpansionModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  BidiModule,
  MatProgressButtonsModule,
  MatGridListModule,
  MatCardModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatTooltipModule,
  MatProgressBarModule
];

@NgModule({
  imports: [
    ...importExportArray,
  ],
  exports: [
    ...importExportArray,

  ],
  declarations: [

  ],
  providers: [

  ],
})
export class MaterialSharedModule {
}
