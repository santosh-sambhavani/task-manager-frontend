import { Component } from '@angular/core';
import { ModalComponent } from './create-project-modal/create-project-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectsService } from '../services/projects.service';
import { Project } from '../projects-list/project.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule
  ],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {
  project: Project = this.projectsService.defaultProject;
  constructor(
    public dialog: MatDialog,
    private projectsService: ProjectsService,
  ) {}

  openDialog(): void {
    this.projectsService.newProject.next({
      title: "",
      startDate: undefined,
      endDate: undefined,
      owner: "",
    });
    const dialogRef = this.dialog.open(ModalComponent, {
      data: this.project,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectsService.addProject(result);
      }
    });
  }
}