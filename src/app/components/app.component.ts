import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionQuery } from './search/connectionQuery.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    constructor(private router: Router) { }

    requestConnections(data) {
        console.log('Received data => Redirect');
        console.log(data);
        this.router.navigate(['connections']).then(e => console.log(e)).catch(e => console.log(e));
    }
}
