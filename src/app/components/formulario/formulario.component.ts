import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  public form: FormGroup;

  departamentos: string[] = ['Artigas', 'Canelones', 'Montevideo', 'Salto'];
  localidad: string[] = [];

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: this.fb.control('', [Validators.required, Validators.pattern('^([0-9]*[a-zA-Z]){2,}[0-9]*$')]),
      apellido: this.fb.control('', [Validators.required, Validators.pattern('^([0-9]*[a-zA-Z]){2,}[0-9]*$')]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      deptos: this.fb.control('', [Validators.required]),
      localidad: this.fb.control('', [Validators.required]),
      cedula: this.fb.control('', [Validators.required, Validators.pattern('^[0-9]{7,8}$'), this.validarCedula]),
      bases: this.fb.control(false, [Validators.requiredTrue])
    }, { updateOn: 'submit' });
  }

  // Validación de cédula (validación personalizada)

  validarCedula(control: AbstractControl): { [key: string]: any } | null {
    var ci: number = control.value;
    var arrCoefs = new Array(2, 9, 8, 7, 6, 3, 4, 1);
    var suma = 0;
    var difCoef = arrCoefs.length - ci.toString().length;

    for (var i = ci.toString().length - 1; i > -1; i--) {
        var dig = ci.toString().substring(i, i + 1);
        var digInt = parseInt(dig);
        var coef = arrCoefs[i + difCoef];
        suma = suma + digInt * coef;
    }

    var result = false;
    if ((suma % 10) === 0) {
        result = true
    }

    return result ? null : { invalidCI: { value: control.value }} ;
  }

  // Arreglo de loalidad se carga cada vez que el usuario elige departamento

  getDepto(event: any): void {
    switch (event.target.value) {
      case 'Artigas':
        this.localidad = ['Artigas', 'Bella Unión'];
        break;
      case 'Canelones':
        this.localidad = ['Canelones', 'Santa Lucía'];
        break;
      case 'Montevideo':
        this.localidad = ['Montevideo'];
        break;
      case 'Salto':
        this.localidad = ['Salto', 'Daymán', 'Arapey'];
        break;
      default:
        this.localidad = [];
        break;
    }
  }

}
