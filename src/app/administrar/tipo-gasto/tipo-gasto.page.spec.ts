import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TipoGastoPage } from './tipo-gasto.page';

describe('TipoGastoPage', () => {
  let component: TipoGastoPage;
  let fixture: ComponentFixture<TipoGastoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoGastoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TipoGastoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
