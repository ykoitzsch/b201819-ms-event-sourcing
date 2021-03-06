import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IProduct } from 'app/shared/model/inventory/product.model';
import { ProductService } from './product.service';
import { IProductCategory } from 'app/shared/model/inventory/product-category.model';
import { ProductCategoryService } from 'app/entities/inventory/product-category';
import { ProductEvent } from '../../../shared/model/inventory/product-event-model';

@Component({
    selector: 'jhi-product-update',
    templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent implements OnInit {
    product: IProduct;
    isSaving: boolean;

    productcategories: IProductCategory[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private productService: ProductService,
        private productCategoryService: ProductCategoryService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ product }) => {
            this.product = product;
        });
        this.productCategoryService.query().subscribe(
            (res: HttpResponse<IProductCategory[]>) => {
                this.productcategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.product.image = 'https://via.placeholder.com/250?text=' + this.product.name;
        if (this.product.id !== undefined) {
            this.subscribeToSaveResponse(this.productService.createEvent(new ProductEvent(this.product, 'PRODUCT_UPDATED')));
        } else {
            this.product.id = this.randomInt();
            this.subscribeToSaveResponse(this.productService.createEvent(new ProductEvent(this.product, 'PRODUCT_CREATED')));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
        result.subscribe((res: HttpResponse<any>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackProductCategoryById(index: number, item: IProductCategory) {
        return item.id;
    }

    private randomInt() {
        return Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
    }
}
