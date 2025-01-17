import { TestBed } from '@angular/core/testing';

import { EjemploService } from './ejemplo.service';


//Definir nuestro bloque de pruebas
describe('EjemploService', () => {
  let service: EjemploService;

  //Configuración global / beforeEach sucede antes de cada caso de prueba
  beforeEach(() => {
    //Configurando el entorno de prueba
    TestBed.configureTestingModule({
      //todo lo que nececitamos injectar -> importaciones, servicios o componente, proveedores
      providers: [EjemploService]
    });
    service = TestBed.inject(EjemploService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe sumar dos numeros correctamente', () => {

    const result = service.suma(1, 5);
    expect(result).toBe(6)
  })
});
