import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CdkTableModule} from '@angular/cdk/table';

import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from '@angular/material-moment-adapter';

import {
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
    //MatAutocompleteModule,
    MatButtonModule,
    //MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    //MatNativeDateModule,
    //MatPaginatorModule,
    MatProgressBarModule,
    //MatProgressSpinnerModule,
    MatRadioModule,
    //MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    //MatSliderModule,
    //MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    //MatStepperModule,
} from '@angular/material';

@NgModule({
  exports: [
    CdkTableModule,
    //MatAutocompleteModule,
    MatButtonModule,
    //MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    //MatStepperModule,
    MatDatepickerModule,
    MatMomentDateModule,
    //MatNativeDateModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    //MatNativeDateModule,
    //MatPaginatorModule,
    MatProgressBarModule,
    //MatProgressSpinnerModule,
    MatRadioModule,
    //MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    //MatSliderModule,
    //MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    CdkTableModule
  ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } }
    ]
})export class MaterialDesignModule {}

