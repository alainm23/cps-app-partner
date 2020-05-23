import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSelectPage } from './map-select.page';

describe('MapSelectPage', () => {
  let component: MapSelectPage;
  let fixture: ComponentFixture<MapSelectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSelectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
