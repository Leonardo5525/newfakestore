import NavbarItem from 'app/layouts/navbar/navbar-item.model';

export const EntityNavbarItems: NavbarItem[] = [
  {
    name: 'Product',
    route: '/product',
    translationKey: 'global.menu.entities.product',
  },
  {
    name: 'ProductCategory',
    route: '/product-category',
    translationKey: 'global.menu.entities.productCategory',
  },
  {
    name: 'CustomerDetails',
    route: '/customer-details',
    translationKey: 'global.menu.entities.customerDetails',
  },
  {
    name: 'ShoppingCart',
    route: '/shopping-cart',
    translationKey: 'global.menu.entities.shoppingCart',
  },
  {
    name: 'ProductOrder',
    route: '/product-order',
    translationKey: 'global.menu.entities.productOrder',
  },
];
