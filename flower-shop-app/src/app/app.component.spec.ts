import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  async,
  TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [AppModule, HttpClientTestingModule, RouterTestingModule.withRoutes([])]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.nativeElement).toMatchSnapshot('empty_state');
  });
});
