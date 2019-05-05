import { Injectable } from '@angular/core';
import { GitUsers } from '../interfaces/git-users';
import { HttpClient } from '@angular/common/http';


@Injectable({
	providedIn: 'root'
})
export class GitUsersService {

	private arrayUsuarios: Array<{
		[usuario: string]: GitUsers
	}> = [];
	private http: HttpClient;
	constructor(http2: HttpClient) {
		this.http = http2;
	}

	metodoGitUsuario = (usuario: string) => {
		let promesa = new Promise<GitUsers>((resolve, reject) => {
			if (this.arrayUsuarios[usuario]) {	// Existe ya.
				resolve(this.arrayUsuarios[usuario]);
			}
			else {
				this.http.get('https://api.github.com/search/users?q=' + usuario) // Observable<GitUsers>.
					.toPromise()
					.then((respuesta) => {
						resolve(respuesta as GitUsers);
					}).catch((error) => {
						reject(error);
					})
			}
		});

		return promesa;
	}
}
