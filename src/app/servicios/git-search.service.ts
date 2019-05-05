import { Injectable } from "@angular/core";
import { GitSearch } from "../interfaces/git-search"; // Importamos el formato de los datos (Interface).
import { HttpClient } from "@angular/common/http"; // Se importa ahora, tras el import en app.module.
//import 'rxjs/add/operator/toPromise';	// Necesario por el uso de Promise y su conversión desde Observable. No es necesaria???

@Injectable({
	// Obligado por ser un service.
	providedIn: "root"
})
export class GitSearchService {
	// Introducimos que haremos con los resultados. Los almacenaremos en un Array de GitSearch.

	private cachedValores: Array<{
		// He cambiado el nombre de la propiedad (variable).
		[entrada: string]: GitSearch; // He cambiado el nombre del índice del Array.
	}> = [];
	private http: HttpClient; // Propiedad privada.
	constructor(http: HttpClient) {
		// Nuevo constructor.
		this.http = http;
		/*
			constructor(private http: HttpClient) {}	Es equivalente a las tres líneas anteriores.
		*/
	}
	//constructor() { }	//Se elimina el constructor vacío, por defecto.

	// Ahora añadimos el método (función) en sí, como JS6, con notación '=>'. He cambiado el nombre dado en el tutorial.

	metodoGitSearch = (entrada: string) => {
		// Parámetro de entrada tipificado.
		let promise = new Promise<GitSearch>((resolve, reject) => {
			// Una promise clásica de JS6. Se añade el tipo.
			if (this.cachedValores[entrada]) {
				// Si existe ya el elemento con esa entrada.
				resolve(this.cachedValores[entrada]);
			} else {
				// resolve("Sin datos.");	// Informamos del fallo, de momento no usamos reject.
				this.http
					.get("https://api.github.com/search/repositories?q=" + entrada) // Nueva búsqueda.
					.toPromise()
					.then((response) => {
						// Doble cuerpo del then ... rama correcta y rama con error. Podría usarse un catch.
						this.cachedValores[entrada] = JSON.parse(JSON.stringify(response));
						resolve(response as GitSearch); // Convierte la respuesta al formato GitSearch.
					},
						error => {
							reject(error);
						}
					); // Cuerpo completo de una Promise.
			}
		});

		return promise; // Como cualquier promise se devuelve.
	};
}
