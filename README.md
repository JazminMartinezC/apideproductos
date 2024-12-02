
# APIconsumible

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.



# USO DE API DE NOTICIAS

## Reporte de practica 
#### Como primer paso lo que hacemos es crear el proyecto en la terminal mediante el comando de:
Run `ng new nombreProyecto`
#### luego de eso agregamos los componentes materials de angular por tanto se usa el comando de:
Run `ng @angular/material`
#### En este caso creare 3 componentes el cual el primero es el el componente 
##### ° component/user-list
##### ° service
##### ° login

![image](https://github.com/user-attachments/assets/599f2dcb-331a-4d15-b4bc-43082262aefd)

# Para la validación de usuarios en el login se hará en base a lo que existe en la API de usuarios.

#### se crea un nuevo componente el cual tiene el nombre de login
Run `ng generate component login`

#### Una vez creado lo que se hace es que en el archivo de login.component. ts se le agrega el codigo para poder validar los datos que se piden en los fild de correo y contraseña  para acceder al siguiente componente 
``` typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common'; 
import { UserService } from '../services/user.service';          // Importar el servicio
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,      
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule, MatStepperModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  remail: string = '';
  rpassword: string = '';
  rconfirmPassword: string = '';

  constructor(private router: Router, private userService: UserService, private snackBar: MatSnackBar) {}

  iniciarPagina() {
    if (this.email && this.password) {
      this.userService.getUsers().subscribe(
        (users) => {
          const user = users.find(u => u.email === this.email && u.password === this.password);
          if (user) {
            this.userService.setLoggedInUser(user); // Guarda al usuario logueado en localStorage
            this.router.navigate(['/user-list']); // Redirige a la lista de usuarios
          } else {
            this.snackBar.open('Credenciales incorrectas', 'Cerrar', { duration: 3000 });
          }
        },
        (error) => {
          console.error('Error al obtener los usuarios', error);
          this.snackBar.open('Error al obtener los usuarios', 'Cerrar', { duration: 3000 });
        }
      );
    } else {
      this.snackBar.open('Por favor complete los campos', 'Cerrar', { duration: 3000 });
    }
  }
  

}
```
 #### En el componente de login.component.html se realizo todo la estructura para poder ingresar los datos necesarios para validar los cuales son correo y contraseña.
 ```html
<style>
    div{
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-size: cover;
            background-color: rgb(255, 222, 112);
            background-image: url("fondo.jpg");
            background-position: center;
            padding: 20px;
            box-sizing: border-box;
          }

          .btn {
            margin-top: 20px;
            padding: 12px 24px;
            font-size: 18px;
            color: white;
            background-color: #007bff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            align-items: center;
          }

          mat-card-title
          {
            align-items: center;
            align-content: center;
          }

          mat-form-field
          {
            color: black;
            background-color: rgb(255, 255, 255);
        }
          </style>
<div >
    
      <mat-card class="example-card">
        <mat-card-header>
          <mat-card-title>Iniciar sesion - Registro </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-tab-group dynamicHeight>
            
            <mat-tab label="Iniciar Sesión">
              <mat-form-field class="example-full-width">
                <mat-label>Correo</mat-label>
                <input type="email" matInput placeholder="Email" [(ngModel)]="email" required>
                <mat-icon matSuffix>email</mat-icon>
              </mat-form-field>
              <br>
              <mat-form-field>
                <mat-label>Contraseña</mat-label>
                <input type="password" matInput placeholder="Password" [(ngModel)]="password" required>
                <mat-icon matSuffix>vpn_key</mat-icon>
              </mat-form-field>
              <br>
              <button class="btn" (click)="iniciarPagina()">Iniciar Sesion</button>
            </mat-tab>

            <mat-tab label="Register">
              <mat-form-field class="example-full-width">
                <mat-label>Correo</mat-label>
                <input type="email" matInput placeholder="Email" [(ngModel)]="remail" required>
                <mat-icon matSuffix>email</mat-icon>
              </mat-form-field>
              <br>
              <mat-form-field class="example-full-width">
                <mat-label>Contraseña</mat-label>
                <input type="password" matInput placeholder="Password" [(ngModel)]="rpassword" required>
                <mat-icon matSuffix>vpn_key</mat-icon>
              </mat-form-field>
              <br>
              <mat-form-field class="example-full-width">
                <mat-label>Confirmar contraseña</mat-label>
                <input type="password" matInput placeholder="Confirm Password" [(ngModel)]="rconfirmPassword" required>
                <mat-icon matSuffix>vpn_key</mat-icon>
              </mat-form-field>
              <br>
              <button class="btn" (click)="iniciarPagina()">Register</button>
            </mat-tab>
          </mat-tab-group>
        </mat-card-content>
      </mat-card>
    </div>
```

![image](https://github.com/user-attachments/assets/f7473c97-15fd-40e7-94be-b49e0135f016)


#### En el el archivo de app.routes.ts se realiza la codificación para poder navegar entre los componentes. Por tanto se crean las rutas que se mostraran durante el uso.
```typescript
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
export const routes: Routes = [
    {
        path: '', redirectTo: '/login',pathMatch:'full'
    },
    {
        path: 'login', component:LoginComponent
    },
    {
        path: 'user-list', component:UserListComponent
    },
];

```

#### Una vez creado los componentes de service, login y user-list se accede a el componente service en el archivo user.service.ts
#### en el cual se agregaran los apis con los que se trabajaran en el proyecto 
![image](https://github.com/user-attachments/assets/23ae80db-a8af-4319-a466-ef69671f5dd7)

#### en el caso de este archivo tambien haremos metodos que nos sirvan para validar los usuarios que entran a el programa. 
por tanto se hacen los siguientes 

```typescript
 getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  authenticateUser(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users: any[]) =>
        users.find(user => user.email === email && user.password === password)
      )
    );
  }

  setLoggedInUser(user: any): void {
    if (this.isBrowser()) {
      localStorage.setItem('loggedInUser', JSON.stringify(user)); // Guardar en localStorage
    }
  }

  getLoggedInUser(): any {
    if (this.isBrowser()) {
      const user = localStorage.getItem('loggedInUser');
      return user ? JSON.parse(user) : null; // Recuperar desde localStorage
    }
    return null; // Si no está en el navegador, retorna null
  }

  clearLoggedInUser(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('loggedInUser'); // Eliminar del almacenamiento
    }
  }

  // Obtener noticias
  getNews(): Observable<any> {
    const headers = new HttpHeaders().set('X-Api-Key', this.apiKey);
    return this.http.get<any>(this.newsApiUrl, { headers });
  }
```



#### En el componente de user-list.component.ts

#### UserListComponent

Este componente de Angular muestra una tabla con una lista de Noticias que estan en la API de noticias. Este componente utiliza Angular Material para proporcionar funcionalidad de paginación, ordenamiento y filtrado.

En este mismo archivo se inncorpora el uso de SweetAlert2 el cual es un componente para mostrar ventanas modales las cuales tienen un cierto diseño definido en su pagina 

#### Código del Componente

```typescript
import { AfterViewInit, Component, OnInit, viewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DateAdapter } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatPaginator,MatSort,
    MatTableModule,MatFormFieldModule,
    MatInputModule,MatMenuModule,NgIf
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [];
  loggedInUser: any;
  dataSource = new MatTableDataSource<any>([]);
  activeData: 'users' | 'news' = 'news';

  readonly paginator = viewChild.required(MatPaginator);
  readonly sort = viewChild.required(MatSort);


  constructor(private userService: UserService, private router: Router) {} // Inyecta Router

  ngOnInit(): void {
    this.loggedInUser = this.userService.getLoggedInUser(); // Recupera el usuario desde localStorage
    if (!this.loggedInUser) {
      this.router.navigate(['/login']); // Redirige al login si no hay usuario logueado
    } else {
      this.loadData(); // Carga los datos si hay un usuario logueado
    }
  }
  
  loadData(): void {
    if (this.activeData === 'users') {
      this.userService.getUsers().subscribe((data) => {
        this.dataSource.data = data;
        this.displayedColumns = ['id', 'name', 'email', 'role'];
      });
    } else {
      this.userService.getNews().subscribe((data) => {
        // Añadir un ID autoincrementable a cada noticia
        const articlesWithId = data.articles.map((article: any, index: number) => ({
          id: index + 1, // Generar un ID autoincrementable
          ...article, // Mantener los datos originales
        }));
        this.dataSource.data = articlesWithId;
        this.displayedColumns = ['id', 'author', 'title', 'imagen', 'info', 'edit', 'delete'];
       });
    }
  }
  
  // Método para manejar acciones de botones
  handleAction(action: string, row: any): void {
    switch (action) {
      case 'info':
        this.showInfoModal(row);
        break;
      case 'edit':
        this.showEditModal(row);
        break;
      case 'delete':
        this.showDeleteModal(row);
        break;
      default:
        break;
    }
  }
  showInfoModal(row: any): void {

    Swal.fire({
      title: 'Más información de la noticia',
      imageUrl:row.urlToImage,
      imageHeight:180,
      imageWidth:250,
      html: `<strong>Autor:</strong> ${row.author || 'N/A'}<br>
             <strong>Título:</strong> ${row.title}<br>
             <strong>Descripción:</strong> ${row.description || 'Sin descripción'}`,

      confirmButtonText: 'Cerrar'
    });
  }

  showInfoUser(): void {
    if (!this.loggedInUser) {
      Swal.fire({
        title: 'Error',
        text: 'No se encontraron datos del usuario logueado.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
      return;
    }
  
    Swal.fire({
      title: 'Información del Usuario',
      imageUrl: this.loggedInUser.avatar || '', // Si tienes un avatar asociado al usuario
      imageHeight: 100,
      imageWidth: 100,
      html: `
        <strong>Nombre:</strong> ${this.loggedInUser.name || 'N/A'}<br>
        <strong>Rol:</strong> ${this.loggedInUser.role || 'Sin rol'}<br>
        <strong>Correo:</strong> ${this.loggedInUser.email || 'Sin correo'}`,
    
      confirmButtonText: 'Cerrar'
    });
  }
  

  showEditModal(row: any): void {
    Swal.fire({
      title: 'Editar Noticia',
      html: `<label for="edit-title">Título</label><br>
             <input id="edit-title" class="swal2-input" value="${row.title}"><br>
             <label for="edit-author">Autor</label><br>
             <input id="edit-author" class="swal2-input" value="${row.author}">`,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const title = (document.getElementById('edit-title') as HTMLInputElement).value;
        const author = (document.getElementById('edit-author') as HTMLInputElement).value;
        if (!title || !author) {
          Swal.showValidationMessage('Ambos campos son obligatorios');
        }
        return { title, author };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Actualizar solo en la tabla, no en la API
        row.title = result.value?.title;
        row.author = result.value?.author;
        this.dataSource.data = [...this.dataSource.data];
        Swal.fire('Guardado', 'Los cambios han sido aplicados.', 'success');
      }
    });
  }

  showDeleteModal(row: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará la fila seleccionada.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar solo de la tabla
        this.dataSource.data = this.dataSource.data.filter((item) => item !== row);
        Swal.fire('Eliminado', 'La fila ha sido eliminada.', 'success');
      }
    });
  }

  
  switchData(type: 'users' | 'news'): void {
    this.activeData = type;
    this.loadData();
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator();
    this.dataSource.sort = this.sort();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  logout(): void {
    this.userService.clearLoggedInUser(); // Elimina al usuario del almacenamiento
    this.router.navigate(['/login']); // Redirige al login
  }
  
}

```

#### para el caso del uso de sweetalert2 se creo para las opciones de editar, ver información y borrar, por tanto se creo una sección de codigo para que funcione como un switch, el cual se manda a llamar cuando el usuario hace uso de este 
```typescript
 handleAction(action: string, row: any): void {
    switch (action) {
      case 'info':
        this.showInfoModal(row);
        break;
      case 'edit':
        this.showEditModal(row);
        break;
      case 'delete':
        this.showDeleteModal(row);
        break;
      default:
        break;
    }
  }
  showInfoModal(row: any): void {

    Swal.fire({
      title: 'Más información de la noticia',
      imageUrl:row.urlToImage,
      imageHeight:180,
      imageWidth:250,
      html: `<strong>Autor:</strong> ${row.author || 'N/A'}<br>
             <strong>Título:</strong> ${row.title}<br>
             <strong>Descripción:</strong> ${row.description || 'Sin descripción'}`,

      confirmButtonText: 'Cerrar'
    });
  }

  showInfoUser(): void {
    if (!this.loggedInUser) {
      Swal.fire({
        title: 'Error',
        text: 'No se encontraron datos del usuario logueado.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
      return;
    }
  
    Swal.fire({
      title: 'Información del Usuario',
      imageUrl: this.loggedInUser.avatar || '', // Si tienes un avatar asociado al usuario
      imageHeight: 100,
      imageWidth: 100,
      html: `
        <strong>Nombre:</strong> ${this.loggedInUser.name || 'N/A'}<br>
        <strong>Rol:</strong> ${this.loggedInUser.role || 'Sin rol'}<br>
        <strong>Correo:</strong> ${this.loggedInUser.email || 'Sin correo'}`,
    
      confirmButtonText: 'Cerrar'
    });
  }
  

  showEditModal(row: any): void {
    Swal.fire({
      title: 'Editar Noticia',
      html: `<label for="edit-title">Título</label><br>
             <input id="edit-title" class="swal2-input" value="${row.title}"><br>
             <label for="edit-author">Autor</label><br>
             <input id="edit-author" class="swal2-input" value="${row.author}">`,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const title = (document.getElementById('edit-title') as HTMLInputElement).value;
        const author = (document.getElementById('edit-author') as HTMLInputElement).value;
        if (!title || !author) {
          Swal.showValidationMessage('Ambos campos son obligatorios');
        }
        return { title, author };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Actualizar solo en la tabla, no en la API
        row.title = result.value?.title;
        row.author = result.value?.author;
        this.dataSource.data = [...this.dataSource.data];
        Swal.fire('Guardado', 'Los cambios han sido aplicados.', 'success');
      }
    });
  }

  showDeleteModal(row: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará la fila seleccionada.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar solo de la tabla
        this.dataSource.data = this.dataSource.data.filter((item) => item !== row);
        Swal.fire('Eliminado', 'La fila ha sido eliminada.', 'success');
      }
    });
  }
```

## En el componente de user-list en el archivo usere-list.component.html

### Tabla de Noticias


Este código HTML muestra una tabla interactiva de noticias que se recuperan de la API con funcionalidades de editar, borrar, eliminar y para la tabala de aplica el filtrado y paginación, utilizando Angular Material.
Dentro del codigo tambien se presenta la recuperación del usuario que ingreso por el login. 

## Código del Componente HTML 

### HTML

```html
   <body >
    
      <!-- Barra de menú principal -->
      <nav class="navbar">
              <div class="user-info">

                <strong><h1>Sección de Noticias 
                    <span class="user-info"> Hola   {{ loggedInUser?.name }} , te presentamos las noticias día.</span> 
                </h1></strong>
          <!-- <span class="user-info">{{ loggedInUser?.name }}</span>
         <img *ngIf="loggedInUser?.avatar" [src]="loggedInUser.avatar" alt="Avatar" class="user-avatar" />
              --></div>
      
       
                 <!-- Barra de menú interactiva -->
        <div class="menu-bar">
          <button mat-button [matMenuTriggerFor]="menu1" class="color">
             <span class="welcome-containeruser">{{ loggedInUser?.name }}</span>
            <br>
            <img *ngIf="loggedInUser?.avatar" [src]="loggedInUser.avatar" alt="Avatar" class="user-avatar" />
  </button>
          <mat-menu  #menu1="matMenu" yPosition="above">
            <button mat-menu-item class="mat-menui" (click)="showInfoUser()">Mi información</button>

            <button mat-menu-item class="mat-menui" (click)="logout()">  Cerrar sesion  </button>
          </mat-menu>

        </div>     
      </nav>
    
      <div class="main-container ">
        <!-- Pantalla de bienvenida -->
      <!----> <div class="welcome-container">
          <h1>Noticias de Estados Unidos de América</h1>
        </div>
      
        <!-- Botones para cambiar de datos -->
        <div class="button-container">
          <!--<button mat-raised-button color="primary" (click)="switchData('users')">Ver Usuarios</button>-->
        <!-- <button mat-raised-button color="accent" (click)="switchData('news')">Ver Noticias</button>-->
        </div>
      
        <!-- Filtro -->
        <mat-form-field class="mat-form-field">
          <mat-label>Filtrar</mat-label>
          <input matInput (keyup)="applyFilter($event)" placeholder="Filtrar resultados" />
        </mat-form-field>
      
        <!-- Tabla dinámica -->
        <div class="mat-elevation-z8 table-container ">
          <table mat-table [dataSource]="dataSource" matSort>
            <!-- Columna ID -->
            <ng-container matColumnDef="id" *ngIf="activeData === 'users'">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> ID </th>
              <td mat-cell *matCellDef="let row">{{ row.id }}</td>
            </ng-container>
      
            <!-- Columna Nombre -->
            <ng-container matColumnDef="name" *ngIf="activeData === 'users'">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Nombre </th>
              <td mat-cell *matCellDef="let row">{{ row.name }}</td>
            </ng-container>
      
            <!-- Columna Email -->
            <ng-container matColumnDef="email" *ngIf="activeData === 'users'">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Email </th>
              <td mat-cell *matCellDef="let row">{{ row.email }}</td>
            </ng-container>
      
            <!-- Columna Rol -->
            <ng-container matColumnDef="role" *ngIf="activeData === 'users'">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Rol </th>
              <td mat-cell *matCellDef="let row">{{ row.role }}</td>
            </ng-container>
      
            <!-- Columna Fuente -->
             
            <!-- Columna ID-->


          
            <!-- Columna Autor -->
           <!-- Columna Autor -->
           <ng-container matColumnDef="id" *ngIf="activeData === 'news'">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> ID </th>
            <td mat-cell *matCellDef="let row">{{ row.id }}</td>
          </ng-container>


<ng-container matColumnDef="author" *ngIf="activeData === 'news'">
  <th mat-header-cell *matHeaderCellDef mat-sort-header> Autor </th>
  <td mat-cell *matCellDef="let row">{{ row.author || 'N/A' }}</td>
</ng-container>

<!-- Columna Título -->
<ng-container matColumnDef="title" *ngIf="activeData === 'news'">
  <th mat-header-cell *matHeaderCellDef mat-sort-header> Título </th>
  <td mat-cell *matCellDef="let row">{{ row.title }}</td>
</ng-container>

<!-- Columna Imagen -->
<ng-container matColumnDef="imagen" *ngIf="activeData === 'news'">
  <th mat-header-cell *matHeaderCellDef> Imagen </th>
  <td mat-cell *matCellDef="let row">
    <img *ngIf="row.urlToImage" [src]="row.urlToImage" width="90" />
    <span *ngIf="!row.urlToImage">Imagen NO Disponible</span>
  </td>
</ng-container>

<!-- Columna Información -->
<ng-container matColumnDef="info" *ngIf="activeData === 'news'">
  <th mat-header-cell *matHeaderCellDef> Información </th>
  <td mat-cell *matCellDef="let row">
    <img src="info.png" alt="Información" width="50" (click)="handleAction('info', row)" style="cursor: pointer;" />
  </td>
</ng-container>

<!-- Columna Editar -->
<ng-container matColumnDef="edit" *ngIf="activeData === 'news'">
  <th mat-header-cell *matHeaderCellDef> Editar </th>
  <td mat-cell *matCellDef="let row">
    <img src="editar.png" alt="Editar" width="30" (click)="handleAction('edit', row)" style="cursor: pointer;" />
  </td>
</ng-container>

<!-- Columna Borrar -->
<ng-container matColumnDef="delete" *ngIf="activeData === 'news'">
  <th mat-header-cell *matHeaderCellDef> Borrar </th>
  <td mat-cell *matCellDef="let row">
    <img src="borrar.png" alt="Borrar" width="30" (click)="handleAction('delete', row)" style="cursor: pointer;" />
  </td>
</ng-container>



      
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            <tr class="mat-row" *matNoDataRow>
              <td class="mat-cell" [attr.colspan]="displayedColumns.length">No se encontraron resultados</td>
            </tr>
          </table>
        </div>
      
    
        <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]" aria-label="componente"></mat-paginator>
        <br>
<!--
        <a class="welcome-button" (click)="logout()">Regresar a Login</a>
      -->
      </div>
      
    </body>
```
![image](https://github.com/user-attachments/assets/9fff32f5-a65a-4a85-aead-b6e5e67be73b)


#### En el componente de app.component.ts se coloca el codigo de 

![image](https://github.com/user-attachments/assets/73327243-ec02-4df2-896f-dc0c1ce61a4c)



### Resultado de la ejecución 
#### Login

![image](https://github.com/user-attachments/assets/f9c9cb26-85ca-4e58-9962-5bddd94af1bc)



### muestra el siguiente componente 

![image](https://github.com/user-attachments/assets/32ad0d22-a38d-4496-a502-b16d40e03a57)


## Modificaciones en la tabla
![image](https://github.com/user-attachments/assets/9e611d91-f894-473c-9ef9-0f535f7334f9)


### cuando se hacen modificaciones

![image](https://github.com/user-attachments/assets/e90800fe-764b-4636-b331-0780e8b069ff)

### Aplicar el filtro 

![image](https://github.com/user-attachments/assets/c9c874f2-f48e-49cc-b34f-3f8454295e77)

### Información del usuario que esta en sesión 

![image](https://github.com/user-attachments/assets/8c3f35f9-1daf-446e-a617-f508c9c4b615)

### Nueva modificacion a la tabla
![image](https://github.com/user-attachments/assets/305b7aa4-991b-4d15-9a6d-13485459d955)

### Aplica el filtro 
![image](https://github.com/user-attachments/assets/a00591f8-20b0-4092-ac56-59da16ece231)

### Eliminar un regitro
![image](https://github.com/user-attachments/assets/b2ab6b02-a384-494e-abf3-5867931e0271)


![image](https://github.com/user-attachments/assets/1b8aa05b-a381-4e6a-a9b7-05ac2fbdb51f)





