import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';

//Definir nuestro bloque de prueba
describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;
  const urlTest = 'http://localhost:9000/usuarios';
  const emailTest = 'jame291104@test.com';
  const passwordTest = '123';
  const tokenTest = 'ab367627828278jf378edla89m';
  const fullName = 'Jesús Morán';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterAll(() => {
    httpMock.verify(); // Evalua que despues de todas las pruebas no queden peticiones pendientes
    
})

  // it('can load instance', () => {
  //   expect(service).toBeTruthy();
  // });

  it('deberia hacer una petición GET para mostrar los usuarios exitosamente', () => {
      const mockUsers = [
        {
          fullName: 'Jesús',
          email: 'jesus@test.com',
          password: "123"
        },
        {
          fullName: 'Jesús',
          email: 'jesus@test.com',
          password: "123"
        },
        {
          fullName: 'Jesús',
          email: 'jesus@test.com',
          password: "123"
        },
        {
          fullName: 'Jesús',
          email: 'jesus@test.com',
          password: "123"
        }
      ]
      const mockResponse = {
        mensaje: "Los usuarios",
        data: mockUsers,
        numeroUsers: mockUsers.length
      }

      service.getUser().subscribe(
        (res) => {
          expect(res).toEqual(mockResponse)
        }
      )

      // garantizar que la peticion se esta haciendo a la url
      const peticion = httpMock.expectOne(urlTest)

      //garantizar el metodo
      expect(peticion.request.method).toBe('GET')

      //ESTO ES LO QUE SIMULA la respuesta del SERVIDOR
      peticion.flush(mockResponse)
  })
});
