import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {CommonModule, TitleCasePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {StorageService} from './services/storage.service';
import {HttpService} from './services/http.service';
import {SaveModule} from './modules/save/save.module';

// all singleton modules and services

const importExportDeclarationArray = [

];



@NgModule({
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        HttpClientModule,
        RouterModule,
        FormsModule,

        SaveModule

    ],
    declarations: [
        ...importExportDeclarationArray
    ],
    exports: [
        ...importExportDeclarationArray
    ],
    providers: [
        // { provide: ErrorHandler, useClass: RollbarService }
    ],
    entryComponents: [
    ]
})

export class CoreModule {

    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,

            providers: [
                StorageService,
                HttpService,
            ]
        };
    }
}
