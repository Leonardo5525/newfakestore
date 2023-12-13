import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('ShoppingCart e2e test', () => {
  const shoppingCartPageUrl = '/shopping-cart';
  const shoppingCartPageUrlPattern = new RegExp('/shopping-cart(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  // const shoppingCartSample = {"placedDate":"2023-12-13T02:38:16.180Z","status":"CANCELLED","totalPrice":27877.29,"paymentMethod":"CREDIT_CARD"};

  let shoppingCart;
  // let customerDetails;

  beforeEach(() => {
    cy.login(username, password);
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/customer-details',
      body: {"gender":"MALE","phone":"+351 920205622","addressLine1":"vacantly","addressLine2":"superior gently","city":"Guimarães","country":"Ruanda"},
    }).then(({ body }) => {
      customerDetails = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/shopping-carts+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/shopping-carts').as('postEntityRequest');
    cy.intercept('DELETE', '/api/shopping-carts/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/product-orders', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/customer-details', {
      statusCode: 200,
      body: [customerDetails],
    });

  });
   */

  afterEach(() => {
    if (shoppingCart) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/shopping-carts/${shoppingCart.id}`,
      }).then(() => {
        shoppingCart = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
    if (customerDetails) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/customer-details/${customerDetails.id}`,
      }).then(() => {
        customerDetails = undefined;
      });
    }
  });
   */

  it('ShoppingCarts menu should load ShoppingCarts page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('shopping-cart');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ShoppingCart').should('exist');
    cy.url().should('match', shoppingCartPageUrlPattern);
  });

  describe('ShoppingCart page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(shoppingCartPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ShoppingCart page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/shopping-cart/new$'));
        cy.getEntityCreateUpdateHeading('ShoppingCart');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', shoppingCartPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/shopping-carts',
          body: {
            ...shoppingCartSample,
            customerDetails: customerDetails,
          },
        }).then(({ body }) => {
          shoppingCart = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/shopping-carts+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [shoppingCart],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(shoppingCartPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(shoppingCartPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details ShoppingCart page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('shoppingCart');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', shoppingCartPageUrlPattern);
      });

      it('edit button click should load edit ShoppingCart page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ShoppingCart');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', shoppingCartPageUrlPattern);
      });

      it('edit button click should load edit ShoppingCart page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ShoppingCart');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', shoppingCartPageUrlPattern);
      });

      it.skip('last delete button click should delete instance of ShoppingCart', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('shoppingCart').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', shoppingCartPageUrlPattern);

        shoppingCart = undefined;
      });
    });
  });

  describe('new ShoppingCart page', () => {
    beforeEach(() => {
      cy.visit(`${shoppingCartPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ShoppingCart');
    });

    it.skip('should create an instance of ShoppingCart', () => {
      cy.get(`[data-cy="placedDate"]`).type('2023-12-13T11:30');
      cy.get(`[data-cy="placedDate"]`).blur();
      cy.get(`[data-cy="placedDate"]`).should('have.value', '2023-12-13T11:30');

      cy.get(`[data-cy="status"]`).select('CANCELLED');

      cy.get(`[data-cy="totalPrice"]`).type('9147.03');
      cy.get(`[data-cy="totalPrice"]`).should('have.value', '9147.03');

      cy.get(`[data-cy="paymentMethod"]`).select('CREDIT_CARD');

      cy.get(`[data-cy="paymentReference"]`).type('unaccountably after woot');
      cy.get(`[data-cy="paymentReference"]`).should('have.value', 'unaccountably after woot');

      cy.get(`[data-cy="customerDetails"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        shoppingCart = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', shoppingCartPageUrlPattern);
    });
  });
});
