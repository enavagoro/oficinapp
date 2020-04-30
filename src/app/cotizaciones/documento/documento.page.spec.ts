import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocumentoPage } from './documento.page';

describe('DocumentoPage', () => {
  let component: DocumentoPage;
  let fixture: ComponentFixture<DocumentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
