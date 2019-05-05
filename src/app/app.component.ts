import { Component, OnInit } from '@angular/core';	// Para el inicio de la App.
import { GitSearchService } from './servicios/git-search.service';	// El servicio.
import { GitUsersService } from './servicios/git-users.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {	// Implementar OnInit

	constructor(private GitSearchService: GitSearchService, private GitUsersService: GitUsersService) {

	}

	ngOnInit() {
		this.GitUsersService.metodoGitUsuario('fnapo')
			.then((response) => {
				alert(`Total Libraries Found (Con el usuario ${response.items[0].login}): ` + response.total_count);
			})
			.catch((error) => {
				alert("Error: " + error.statusText);
			})
	}

	title = 'GitHub Browser';	// Se ha cambiado el titulo, nombre, de la App.
}
