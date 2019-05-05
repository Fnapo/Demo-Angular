import { Component, OnInit } from "@angular/core";
import { GitSearchService } from "../servicios/git-search.service";
import { GitSearch } from '../interfaces/git-search';
import { ActivatedRoute, ParamMap, Router } from "@angular/router"; // Para usar el título de appRoutes.
// Y para redirreccionar, a partir de ParamMap.

@Component({
	selector: "app-git-search", // Etiqueta html para llamar a la componente.
	templateUrl: "./git-search.component.html",
	styleUrls: ["./git-search.component.css"]
})
export class GitSearchComponent implements OnInit {
	searchResultados: GitSearch; // Variable para almacenar el resultado.
	searchEntrada: string; // Almacena la entrada del formulario.
	title: string; // Almacenará el título.
	displayEntrada: string; // Almacenará la entrada actual.
	pagina: number;
	maxPagina: number;
	searchMostrados: GitSearch;
	cuantosPagina: number;


	constructor(
		private GitSearchService: GitSearchService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.pagina = 0;
		this.cuantosPagina = 5;
	} // Inyectar el servicio.

	ngOnInit() {
		this.route.paramMap.subscribe((parametros: ParamMap) => {
			// Parámetro de entrada.

			this.searchEntrada = parametros.get("entrada"); // Iguala la entrada al parámetro de búsqueda.
			this.displayEntrada = parametros.get("entrada"); // Para saber lo que se ve.
			this.metodoGitSearch(); // Y realiza la búsqueda.
		});
		// this.GitSearchService.metodoGitSearch("angular") Ahora se puede borrar, pues ya se realiza la búsqueda.
		// 	.then(response => {
		// 		this.searchResultados = response;
		// 	})
		// 	.catch(error => {
		// 		alert("Error: " + error.statusText);
		// 	});
		this.route.data.subscribe(result => {
			this.title = result.title;
		});
	}

	metodoGitSearch() {
		// Podemos eliminar el parámetro inicial.
		this.GitSearchService.metodoGitSearch(this.searchEntrada) // Y usamos la nueva variable.
			.then(response => {
				let maximo = 0;
				let ultimoMostrado = 0;

				this.searchResultados = response;
				this.searchMostrados = JSON.parse(JSON.stringify(this.searchResultados)); // Clonando.
				maximo = this.searchResultados.items.length;
				this.maxPagina = Math.ceil(maximo / this.cuantosPagina);
				ultimoMostrado = Math.min((this.pagina + 1) * this.cuantosPagina, maximo);
				this.searchMostrados.items = this.searchMostrados.items.slice(this.pagina * this.cuantosPagina,
					ultimoMostrado);
			})
			.catch(error => {
				alert("Error: " + error.statusText);
			});
	}

	metodoRellenarDatos(ultimo: number, maximo: number) {
		let datos = document.getElementsByClassName('datos');

		for (let indice = 0; indice < datos.length; ++indice) {
			datos[indice].innerHTML = ultimo + ' registros de ' + maximo;
		}
	}

	metodoIniciarBotones() {
		let anterior = document.getElementsByClassName('anterior');
		let siguiente = document.getElementsByClassName('siguiente');
		let ultimoMostrado = 0;

		if (this.pagina <= 0) {
			for (let indice = 0; indice < anterior.length; ++indice) {
				anterior[indice].setAttribute('disabled', 'true');
			}
		}
		else {
			for (let indice = 0; indice < anterior.length; ++indice) {
				anterior[indice].removeAttribute('disabled');
			}
		}
		if (this.pagina >= this.maxPagina - 1) {
			for (let indice = 0; indice < siguiente.length; ++indice) {
				siguiente.item(indice).setAttribute('disabled', 'true');
			}
		}
		else {
			for (let indice = 0; indice < siguiente.length; ++indice) {
				siguiente[indice].removeAttribute('disabled');
			}
		}
		ultimoMostrado = Math.min((this.pagina + 1) * this.cuantosPagina, this.searchResultados.items.length);
		this.metodoRellenarDatos(ultimoMostrado, this.searchResultados.items.length);
	}

	metodoPaginaMenos() {
		--this.pagina;
		this.metodoGitSearch();
	}

	metodoPaginaMas() {
		++this.pagina;
		this.metodoGitSearch();
	}

	metodoEnviarEntrada() {
		// Para redireccionar
		// this.searchResultados = null;
		this.pagina = 0;
		this.router.navigate(["/search/" + this.searchEntrada]); // Para navegar.
	}
}
