import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { saveAs as importedSaveAs } from 'file-saver';

interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}

interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
}

interface JsonFormControls {
  name: string;
  label: string;
  value: string;
  type: string;
  options?: JsonFormControlOptions;
  required: boolean;
  validators: JsonFormValidators;
}

export interface JsonFormData {
  controls: JsonFormControls[];
}

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnChanges {

  @Input() jsonFormData: any;
  fullForm: any;

  public myForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) { }


  ngOnChanges(changes: SimpleChanges) {
 
    if (changes.jsonFormData) {

      this.fullForm = JSON.parse(this.jsonFormData.form);

      this.fullForm.forEach(element => {
        this.createForm(element.form);
      });
   
    }

  }

  createForm(controls: JsonFormControls[]) {
    for (const control of controls) {
      const validatorsToAdd = [];

      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'required':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'email':
            if (value) {
              validatorsToAdd.push(Validators.email);
            }
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            if (value) {
              validatorsToAdd.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }
      }

      this.myForm.addControl(
        control.name,
        this.fb.control(control.value, validatorsToAdd)
      );
    }
  }

  getErrorMessage(control) {
    if (this.myForm.controls[control.name]) {
      if (this.myForm.controls[control.name].hasError('required')) {
        return `${control.label} es requerido`;
      }
      if (this.myForm.controls[control.name].hasError('min')) {
        return `${control.label} debe ser minimo ${control.validators.min}`;
      }
      if (this.myForm.controls[control.name].hasError('max')) {
        return `${control.label} debe ser maximo ${control.validators.max}`;
      }
      if (this.myForm.controls[control.name].hasError('requiredTrue')) {
        return `${control.label} es requerido`;
      }
      if (this.myForm.controls[control.name].hasError('email')) {
        return `${control.label} debe ser un email`;
      }
      if (this.myForm.controls[control.name].hasError('minLength')) {
        return `${control.label} debe tener mas de ${control.validators.minLength} caracteres`;
      }
      if (this.myForm.controls[control.name].hasError('maxLength')) {
        return `${control.label} debe tener menos de ${control.validators.maxLength} caracteres`;
      }
    }
  }

  onFileSelected(e, control) {
    control['nameFile'] = e.target.files[0].name;
    control['File'] = e.target.files[0];
  }

  downloadFile(control) {
    importedSaveAs(control.File, control.name);
  }

  onSubmit() {

    this.fullForm.forEach(element => {
      element.form.forEach(element => {
        element.value = this.myForm.value[element.name];
      });
    });    

  }

  controles(){
    console.log(this.myForm.controls);
  }

}
