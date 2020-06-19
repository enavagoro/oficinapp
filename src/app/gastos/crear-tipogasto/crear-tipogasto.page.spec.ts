import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearTipogastoPage } from './crear-tipogasto.page';

describe('CrearTipogastoPage', () => {
  let component: CrearTipogastoPage;
  let fixture: ComponentFixture<CrearTipogastoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearTipogastoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearTipogastoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
