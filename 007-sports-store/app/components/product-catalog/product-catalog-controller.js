(function(){

    angular.module('sportsStore')
        .constant('productCatalogActiveClass', 'btn-primary')
        .constant('productCatalogProductsPerPage', 3)
        .controller('ProductCatalogController', ['productCatalogActiveClass', 'productCatalogProductsPerPage',
                function(productCatalogActiveClass, productCatalogProductsPerPage) {

            var selectedCategory = null;

            this.selectedPage = 1;
            this.productsPerPage = productCatalogProductsPerPage;

            this.selectPage = function(newPage) {
                this.selectedPage = newPage;
            };

            this.selectCategory = function(category) {
                if (angular.isUndefined(category)) {
                    selectedCategory = null;
                } else {
                    selectedCategory = category;    
                }
                this.selectPage(1);                
            };

            this.isProductInSelectedCategory = function(product) {
                return selectedCategory === null || product.category === selectedCategory;
            };

            this.getCategoryClass = function(category) {
                return selectedCategory === category ? productCatalogActiveClass : '';
            };

            this.getPageClass = function(page) {
                return page === this.selectedPage ? productCatalogActiveClass : ''; 
            };

        }]);
})();