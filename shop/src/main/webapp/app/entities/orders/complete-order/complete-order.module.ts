import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopSharedModule } from 'app/shared';
import {
    CompleteOrderComponent,
    CompleteOrderDetailComponent,
    CompleteOrderUpdateComponent,
    CompleteOrderDeletePopupComponent,
    CompleteOrderDeleteDialogComponent,
    completeOrderRoute,
    completeOrderPopupRoute
} from '.';

const ENTITY_STATES = [...completeOrderRoute, ...completeOrderPopupRoute];

@NgModule({
    imports: [ShopSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CompleteOrderComponent,
        CompleteOrderDetailComponent,
        CompleteOrderUpdateComponent,
        CompleteOrderDeleteDialogComponent,
        CompleteOrderDeletePopupComponent
    ],
    entryComponents: [
        CompleteOrderComponent,
        CompleteOrderUpdateComponent,
        CompleteOrderDeleteDialogComponent,
        CompleteOrderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShopCompleteOrderModule {}
