/* Copyright 2024 Pelayo Vieites Pérez
 * 
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * 
 */

import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
