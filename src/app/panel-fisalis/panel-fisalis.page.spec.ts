import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PanelFisalisPage } from './panel-fisalis.page';

describe('PanelFisalisPage', () => {
  let component: PanelFisalisPage;
  let fixture: ComponentFixture<PanelFisalisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelFisalisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PanelFisalisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
