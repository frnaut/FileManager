import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePersonalDocComponent } from './table-personal-doc.component';

describe('TablePersonalDocComponent', () => {
  let component: TablePersonalDocComponent;
  let fixture: ComponentFixture<TablePersonalDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePersonalDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePersonalDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
