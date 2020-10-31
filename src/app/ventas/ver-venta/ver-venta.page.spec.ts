import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerVentaPage } from './ver-venta.page';

describe('VerVentaPage', () => {
  let component: VerVentaPage;
  let fixture: ComponentFixture<VerVentaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerVentaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerVentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
