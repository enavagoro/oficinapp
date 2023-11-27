import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.page.html',
  styleUrls: ['./pdf.page.scss'],
})
export class PdfPage implements OnInit {
  pdf : string;
  constructor(private navParams : NavParams) { 
    console.log(navParams.get("pdf"));
    this.pdf = navParams.get("pdf");
  }

  ngOnInit() {

  }

}
