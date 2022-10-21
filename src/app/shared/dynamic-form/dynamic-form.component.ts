import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { saveAs as importedSaveAs } from 'file-saver';
import { BusinessService } from 'src/app/service/rest/business.service';

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
  col: string;
  enable: boolean;
  disabled: boolean;
  add: boolean;
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
  @Output() guardar = new EventEmitter<any>();
  fullForm: any;
  formulario:any = [];

  public myForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private service: BusinessService) { }


  ngOnChanges(changes: SimpleChanges) {
 
    if (changes.jsonFormData) {

      this.fullForm = JSON.parse(this.jsonFormData);
      console.log(this.fullForm);

      this.fullForm.forEach(element => {
        this.createForm(element.form);
      });

      console.log(this.myForm);
   
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

      if(control.enable){
        this.myForm.controls[control.name].enable();
      } else if(control.disabled || control.type === 'calc'){
        this.myForm.controls[control.name].disable();
      }

      if((control.type === 'select' || control.type === 'date') && control.value !== ''){
        this.myForm.get(control.name).setValue(control.value);
      }

    }

  }

  getErrorMessage(control) {

    if(control.type === 'date'){
      console.log(control);
    }

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
      if (this.myForm.controls[control.name].hasError('minlength')) {
        return `${control.label} debe tener mas de ${control.validators.minLength} caracteres`;
      }
      if (this.myForm.controls[control.name].hasError('maxlength')) {
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
  
    this.guardar.emit(this.fullForm);

  }

  addCampo(campo, seccion){

    let campoOriginal = Object.assign({}, campo);
		let campoCopia = campoOriginal;
		let cont = 0;
		let indexAuxField = 0;
		let indexAuxSec = 0;

    this.fullForm.forEach((section, indexSec) => {
			section.form.forEach((question, indexField) => {
				if (question.name.includes(campo.name) && seccion === section.section) {
					cont++;
					indexAuxField = indexField;
					indexAuxSec = indexSec;
				}
			});
		});

    cont = cont + 1;

		campoCopia.name = campoOriginal.name + '_' + cont;
    campoCopia.label = campoOriginal.label + ' ' + cont;
		campoCopia.value = '';
		campoCopia.add = false;

    if (this.fullForm[indexAuxSec].section === seccion) {
			this.fullForm[indexAuxSec].form.splice(indexAuxField + 1, 0, campoCopia);
		}

    const arregloEnvio = [];
    arregloEnvio.push(campoCopia);

    this.createForm(arregloEnvio);

  }

  addSeccion(Seccion){

    let seccionOriginal = Object.assign({}, Seccion);
		let seccionCopia = seccionOriginal;
		let cont = 0;
    let indexAuxSec = 0;
  
    this.fullForm.forEach((element, indexSec) => {
      if (element.section.includes(Seccion .section)) {
				cont++;
        indexAuxSec = indexSec;
			}
    });

    cont = cont + 1;

    let sendSection = new FormData();
    sendSection.append('section', JSON.stringify(seccionCopia));
		sendSection.append('cont', cont.toString());
		this.service.duplicateSeccion(sendSection).subscribe((resp) => {

      let respuesta = JSON.parse(resp);

      if (this.fullForm[indexAuxSec].section.includes(Seccion.section)) {
        this.fullForm.splice(indexAuxSec + 1, 0, respuesta);
      }
			this.createForm(respuesta.form);
		});
  }

}
