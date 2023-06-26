import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleRegisternumberComponent } from './vehicle-registernumber.component';

describe('VehicleRegisternumberComponent', () => {
  let component: VehicleRegisternumberComponent;
  let fixture: ComponentFixture<VehicleRegisternumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleRegisternumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleRegisternumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
