import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'product',
        data: { pageTitle: 'storeApp.product.home.title' },
        loadChildren: () => import('./product/product.routes'),
      },
      {
        path: 'product-category',
        data: { pageTitle: 'storeApp.productCategory.home.title' },
        loadChildren: () => import('./product-category/product-category.routes'),
      },
      {
        path: 'customer-details',
        data: { pageTitle: 'storeApp.customerDetails.home.title' },
        loadChildren: () => import('./customer-details/customer-details.routes'),
      },
      {
        path: 'shopping-cart',
        data: { pageTitle: 'storeApp.shoppingCart.home.title' },
        loadChildren: () => import('./shopping-cart/shopping-cart.routes'),
      },
      {
        path: 'product-order',
        data: { pageTitle: 'storeApp.productOrder.home.title' },
        loadChildren: () => import('./product-order/product-order.routes'),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
