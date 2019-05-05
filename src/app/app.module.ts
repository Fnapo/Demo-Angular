import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http"; // Necesario para el servicio Git-search.
import { FormsModule, ReactiveFormsModule } from "@angular/forms"; // Para los formularios, lo he instalado con npm update.
import { AppComponent } from "./app.component";
// Finalmente importamos el servicio.
import { GitSearchService } from "./servicios/git-search.service";
import { GitUsersService } from "./servicios/git-users.service";
// Ahora la componente. Automáticamente.
import { GitSearchComponent } from "./git-search/git-search.component";
// Para routing
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { NotFoundComponent } from "./not-found/not-found.component";

// Caminos (Rutas) a los componentes.
const appRoutes: Routes = [
	{
		path: "",
		component: HomePageComponent
	},
	{
		path: "search",
		redirectTo: "search/angular",
		pathMatch: "full",
		data: {
			title: "Búsqueda de Git."
		}
	},
	{
		path: "search/:entrada",
		//redirectTo: 'search/:entrada',
		component: GitSearchComponent,
		data: {
			title: "Búsqueda de Git."
		}
	},
	// {
	// 	path: "search/:entrada/:pagina",
	// 	component: GitSearchComponent,
	// 	data: {
	// 		title: "Búsqueda de Git."
	// 	}
	// },
	{
		path: "**",
		component: NotFoundComponent
	}
];

@NgModule({
	declarations: [
		AppComponent,
		GitSearchComponent,
		HomePageComponent,
		NotFoundComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		RouterModule.forRoot(appRoutes) // Origen de las rutas.
	],
	providers: [GitSearchService, GitUsersService], // Añadimos el servicio a los providers.
	bootstrap: [AppComponent]
})
export class AppModule { }
