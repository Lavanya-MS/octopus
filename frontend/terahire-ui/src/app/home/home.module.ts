import { NgModule } from '@angular/core';


import { HomeRoutingModule } from './home-routing.module';
import { TasksComponent } from './tasks/tasks.component';
import { AdminComponent } from './admin/admin.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { UserRegistrationComponent } from './admin/user-registration/user-registration.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from '../service/user.service';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressTableComponent } from './dashboard/progress-table/progress-table.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import { HomeComponent } from './home.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobEditComponent } from './tasks/job-edit/job-edit.component';
import { JobListComponent } from './tasks/job-list/job-list.component';
import { JobComponent } from './tasks/job-registration/job-registration.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressSpinner, MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { CandidateListComponent } from './tasks/candidate-list/candidate-list.component';
import { CandidateUpdateComponent } from './tasks/candidate-update/candidate-update.component';
import { MatIconModule } from '@angular/material/icon';
import { CandidateComponent } from './tasks/candidate/candidate.component';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { BasicAuthInterceptor } from '../_helpers/basic-auth.interceptor';
import { EventComponent } from './dashboard/event/event.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { MatSelectModule } from '@angular/material/select';
import { CandidateInfoComponent } from './recruitment/candidate-info/candidate-info.component';
import { JobInfoComponent } from './recruitment/job-info/job-info.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { EventGeneratorComponent } from './dashboard/event/event-generator/event-generator.component';


import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { AngularEditorModule } from 'node_modules/angular-editor';
import { AppearanceComponent } from './settings/appearance/appearance.component';
import { SettingsComponent } from './settings/settings.component';
import { EventListComponent } from './recruitment/event-list/event-list.component';
import { NotificationSideBarComponent } from './notification-side-bar/notification-side-bar.component';
import { AuthService } from '../service/auth.service';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    TasksComponent,
    AdminComponent,
    UserListComponent,
    UserRegistrationComponent,
    CalendarComponent,
    RecruitmentComponent,
    ProgressTableComponent,
    JobComponent,
    JobListComponent,
    JobEditComponent,
    CandidateComponent,
    CandidateListComponent,
    CandidateUpdateComponent,
    DialogDeleteComponent,
    CalendarComponent,
    EventComponent,
    CandidateInfoComponent,
    JobInfoComponent,
    MyProfileComponent,
    EventGeneratorComponent,
    SettingsComponent,
    MyProfileComponent,
    AppearanceComponent,
    EventListComponent,
    NotificationSideBarComponent

   
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatIconModule,
    MatSelectModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatIntlTelInputComponent,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    

    

  ],
  providers:[
    UserService,
  ]
 
})
export class HomeModule { 
  constructor(private authService:AuthService){
    authService.getServerStatus();
    }
}