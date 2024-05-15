import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubjectComponent } from './subject/subject.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';

import { TrainingComponent } from './training/training.component';
import { TrainingSetSliderComponent } from './training-set-slider/training-set-slider.component';
import { NgChartsModule } from 'ng2-charts';
import { GraphComponent } from './graph/graph.component';
import { SimulationComponent } from './simulation/simulation.component';
import { SimulationGraphComponent } from './simulation/simulation-graph/simulation-graph.component';
import { SimulationTimelineComponent } from './simulation/simulation-timeline/simulation-timeline.component';



@NgModule({
  declarations: [
    AppComponent,
    SubjectComponent,
    TrainingComponent,
    TrainingSetSliderComponent,
    GraphComponent,
    SimulationComponent,
    SimulationGraphComponent,
    SimulationTimelineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatIconModule, MatButtonModule,
    MatCheckboxModule, 
    MatSliderModule, FormsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    NgChartsModule,
    MatGridListModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
