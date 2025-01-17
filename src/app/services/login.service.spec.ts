import { TestBed } from "@angular/core/testing";
import { LoginService } from "./login.service";
import { HttpClient, provideHttpClient } from "@angular/common/http"; // Se importa para poder hacer pruebas con las peticiones
//Importar herramientas que permitan simular interacciones con las peticiones HTTP
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing"



//Definir nuestro bloque de prueba

describe('Pruebas para servicio de login', () => {

    /*
        Mock -> objeto o funcion falsa: El proposito de un Mock es simular un comportamiento
    */
    
    let service: LoginService // Definimos nuestro servicio -> el nombre puede ser personalizado
    let httpMock: HttpTestingController // Simula interacciones con http
    const urlTest = "http://localhost:9000/iniciarSesion" // url del backend a la que debe apuntar la petición

    //Creamos variables que almacenan los valores de prueba para los parametros que necesita la petición
    const emailTest = "jame291104@test.com";
    const passwordTest = "123";
    const tokenTest = "ab367627828278jf378edla89m";

    // beforeEch y afterAll -> configuración global
    beforeEach(() => {
        TestBed.configureTestingModule({
            //todo lo que necesitamos injectar / Proveedores, importaciones, servicios o componente y demas
            providers: [LoginService, provideHttpClient(), provideHttpClientTesting()]

        });

        //Injección de servicios
        service = TestBed.inject(LoginService);
        httpMock = TestBed.inject(HttpTestingController)
    })

    afterAll(() => {
        httpMock.verify(); // Evalua que despues de todas las pruebas no queden peticiones pendientes
        
    })


    //Caso de prueba 1
    it('Debería hacer una petición POST para iniciar sesión', () => {
        const mockResponse = {
            mensaje: "Inicio de sesión exitoso",
            token: tokenTest
        }

        service.login(emailTest, passwordTest).subscribe(
            (res) => {
                // res va a ser === mockResponse
                expect(res).toEqual(mockResponse)
            }
        )

        // garantizar que la peticion se esta haciendo a la url
        const peticion = httpMock.expectOne(urlTest)
        //garantizar el metodo
        expect(peticion.request.method).toBe('POST')

        //ESTO ES LO QUE SIMULA la respuesta del SERVIDOR
        peticion.flush(mockResponse)
    });

    //Caso de prueba 2
    it("Debería obtener el token almacenado en el localStorage", () => {
        localStorage.setItem('token', tokenTest) // Esto es lo que estoy guardando en el localStorage
        expect(service.getToken()).toBe(tokenTest);
    })

    //Caso de prueba 3
    it("Debería verificar si el user est logueado", () => {
        //Tenemos token
        localStorage.setItem('token', tokenTest)
        expect(service.isLoggedIn()).toBeTrue()
    })

    //Caso de prueba 4
    it("Debería cerrar sesión", () => {
        service.logout()
        expect(localStorage.getItem('token')).toBeNull()
    })
});

