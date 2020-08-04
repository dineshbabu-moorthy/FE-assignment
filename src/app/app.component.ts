import { Component, OnInit } from '@angular/core';
import 'reflect-metadata';
import { MyService } from './services/service';
import { Router } from '@angular/router';
import { FilterPipe } from './app.filterPipe.pipe';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [MyService,FilterPipe]
})
export class AppComponent implements OnInit {
    title = 'RapoBank File Customer statment processing';
    file = null;
    successMsg= null;
    errorMsg= null;
    error = null;
    outputData = null;
  
    constructor(private _router: Router,private _service: MyService,filterPipe: FilterPipe) {

    }

    ngOnInit() {

    }

    getFiles(files: any) {
        let empDataFiles: FileList = files.files;
        this.file = empDataFiles[0];
    }

    postfile() {
        if (this.file !== undefined) {
            this._service.postFormData(this.file).map(responce => {
              this.outputData = responce;
            }).catch( error => 
                this.errorMsg = "Failed to Upload File"
            );
            this.successMsg = "Successfully uploaded !!";
        } else {
            this.errorMsg = "Failed to Upload File";
        }
    }

}


