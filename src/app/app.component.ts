import { Component  , OnInit  } from '@angular/core';
import 'reflect-metadata';
import { MyService } from './services/service';
import { Router } from '@angular/router';

import { CSVRecord } from './model/CSVRecord'
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
    isValidCsv: Boolean = false;

    constructor(private _router: Router,private _service: MyService,filterPipe: FilterPipe) {

    }

    ngOnInit() {

    }

    getFiles(files: any) {
        let empDataFiles: FileList = files.files;
        this.file = empDataFiles[0];
    }

    postfile() {
      // The below block of commented code is applicable when the uploaded Csv data are 
      // extracted from the backend API
      
        /* if (this.file !== undefined) {
            this._service.postFormData(this.file).map(responce => {
              this.outputData = responce;
            }).catch( error => 
                this.errorMsg = "Failed to Upload File"
            );
            this.successMsg = "Successfully uploaded !!";
        } else {
            this.errorMsg = "Failed to Upload File";
        } */
      if (this.isValidCSVFile(this.file)) {
      let reader = new FileReader();  
      reader.readAsText(this.file);

      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
  
        let headersRow = this.getHeaderArray(csvRecordsArray);  
  
        this.outputData = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);  
       };  
     } else {  
        this.errorMsg = "Failed to Upload File,Please import valid .csv file.";
        this.isValidCsv = false;
        this.fileReset();  
      }   
    }

    isValidCSVFile(file: any) {  
        return file.name.endsWith(".csv");  
    } 

    getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
        let csvArr = [];  
        let lastIndex = csvRecordsArray.length - 1;
        if (csvRecordsArray[0].split(',')[0].replace(/"/g,"") === "First name" 
            && csvRecordsArray[0].split(',')[lastIndex].replace(/"/g,"") === "Date of birth") {
        for (let i = 1; i < csvRecordsArray.length; i++) {  
          let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
          if (curruntRecord.length == headerLength) {  
            let csvRecord: CSVRecord = new CSVRecord();  
            
            csvRecord.firstName = curruntRecord[0].trim().replace(/"/g,""); 
            csvRecord.surName = curruntRecord[1].trim().replace(/"/g,"");  
            csvRecord.issueCount = curruntRecord[2].trim(); 
            csvRecord.dateOfBirth = curruntRecord[3].trim().replace(/"/g,"");  
            this.successMsg = "Successfully uploaded !!";
            this.isValidCsv = true;
            csvArr.push(csvRecord);  
          }  
        }
      }  else {
          this.errorMsg = 'only issue.csv is accepted from the Frontend assignment';
          this.isValidCsv = false;
          this.outputData = [];
      }
        return csvArr;  
    }
    
    getHeaderArray(csvRecordsArr: any) {  
        let headers = (<string>csvRecordsArr[0]).split(',');  
        let headerArray = [];  
        for (let j = 0; j < headers.length; j++) {  
          headerArray.push(headers[j]);  
        }  
        return headerArray;  
    }
    
    fileReset() {
        this.isValidCsv = false;
        this.outputData = [];  
      }  

}


