// Angular Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// Angular utilities
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

// Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';

// Project components
import { AppComponent } from './app.component';
import { SubjectComponent } from './subject/subject.component';
import { TrainingComponent } from './training/training.component';
import { TrainingSetSliderComponent } from './training-set-slider/training-set-slider.component';
import { GraphComponent } from './graph/graph.component';
import { SimulationComponent } from './simulation/simulation.component';
import { SimulationGraphComponent } from './simulation/simulation-graph/simulation-graph.component';
import { SimulationTimelineComponent } from './simulation/simulation-timeline/simulation-timeline.component';
import { TelegramConfigurationDialogComponent } from './simulation/simulation-timeline/telegram-configuration-dialog/telegram-configuration-dialog.component';

// External libraries
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    SubjectComponent,
    TrainingComponent,
    TrainingSetSliderComponent,
    GraphComponent,
    SimulationComponent,
    SimulationGraphComponent,
    SimulationTimelineComponent,
    TelegramConfigurationDialogComponent
  ],
  imports: [
    // Angular Modules
    BrowserModule,
    FormsModule,
    // Material Modules
    MatButtonModule,
    NgChartsModule,
    MatCheckboxModule, 
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule, 
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSliderModule,
    MatTooltipModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideClientHydration(),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
