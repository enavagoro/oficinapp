import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearClienteVentaPage } from './crear-cliente-venta.page';

describe('CrearClienteVentaPage', () => {
  let component: CrearClienteVentaPage;
  let fixture: ComponentFixture<CrearClienteVentaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearClienteVentaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearClienteVentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
