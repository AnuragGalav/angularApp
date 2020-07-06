import { Component } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {

  showTable = false;
  showButton = false;
  csvFile = new FormControl('');  
  displayedColumns: string[] = ['name', 'email', 'phoneNum', 'address'];

  constructor(private papa: Papa) {}

  //On Change Csv to Table Click
  convertCSVtoJSON() {
    this.showTable = true;
  }

  tests = [];

  handleFileSelect(evt) {
    this.tests = [];
    if (!evt || !evt.target || !evt.target.files || evt.target.files.length === 0) {
      this.showButton = false;
      this.showTable = false;
      alert("No file found");
      return;
    }

    var files = evt.target.files; // FileList object
    var file = files[0];

    var name = file.name;
    const lastDot = name.lastIndexOf('.');
    const ext = name.substring(lastDot + 1);

    if(ext != "csv" && ext != "xlsx" && ext != "xls") {
      this.csvFile.setValue('');
      this.showButton = false;
      this.showTable = false;
      alert("Wrong file extension!! Please input only CSV file!");
      return;
    }

    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event: any) => {
      var csv = event.target.result; // Content of CSV file
      this.papa.parse(csv, {
        skipEmptyLines: true,
        header: true,
        complete: (results) => {
          for (let i = 0; i < results.data.length; i++) {
            let details = {
              name: results.data[i].Name,
              email: results.data[i].Email,
              phoneNum: results.data[i].PhoneNumber,
              address: results.data[i].Address,
            };
            this.tests.push(details);
          }
        },
      });
    };
    this.showButton = true;
  }
}
