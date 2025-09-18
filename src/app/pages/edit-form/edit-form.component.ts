import { Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AnnonationsService } from '../services/annonations.service';
import { EventService } from '../services/event.service';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.scss',
  standalone: true
})
export class EditFormComponent {
  private formBuilder = inject(FormBuilder);
  private annotationService = inject(AnnonationsService);
  private eventService = inject(EventService);
  showEditor = signal<boolean>(false);
  sectionId = 0;
  x = signal<number>(0);
  y = signal<number>(0);

  constructor(){
    this.eventService
      .editor$
      .subscribe(params => {
        console.log('params: ', params)
        this.x.set(params?.x ? params.x : 0);
        this.y.set(params?.y ? params.y : 0);
        this.sectionId = params.secId;
        this.showEditor.set(true);
      })
  }
  editorParams = computed(() => {
    return {
      'left.px': this.x || 0,
      'top.px': this.y || 0
    }
  });

  annotation = this.formBuilder.group({
    content: ['', Validators.required]
  });

  close(){
    this.showEditor.set(false);
    this.clear();
  }
  add(){
    this.annotation.updateValueAndValidity();
    if(this.annotation.valid){
      const content = this.annotation.controls.content.getRawValue() || '';
      const section = this.sectionId || 0;
      this.annotationService.addAnnotation(section, content, this.x(), this.y());
      this.close();
    }
  }
  clear(){
    this.x.set(0);
    this.y.set(0);
    this.annotation.patchValue({content: ''});
    this.annotation.markAllAsDirty();
  }
}
