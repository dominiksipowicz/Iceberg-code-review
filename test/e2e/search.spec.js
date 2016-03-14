describe('movie search', function () {
    describe('When visiting the homepage', function () {
        beforeEach(function () {
            browser.get('/');
        });

        it('page should have a title', function () {
            expect(browser.getTitle()).toEqual('Iceberg Search');
        });

        it('should have a header', function () {
            expect(element(by.tagName('h1')).getText()).toEqual('Iceberg Movies');
        });

        it('should load some results (lets say results>5)', function () {

            expect(element.all(by.repeater('movie in movies')).count()).toBeGreaterThan(5);

        });

        it('should have the next  button)', function () {
            expect(element(by.css('.pagination-controls button[ng-show=nextPageVisible]')).isDisplayed()).toBeTruthy();
        });

        describe('searching', function() {
            beforeEach(function () {
                element(by.model('typeAhead')).sendKeys('the');
            });

            it('should return results', function() {
                expect(element.all(by.repeater('movie in movies')).count()).toBe(10);

                // there should be no previews button
                expect(element(by.css('.pagination-controls button[ng-show=previousPageVisible]')).isDisplayed()).toBeFalsy();

                // go to next page
                element(by.css('.pagination-controls button[ng-show=nextPageVisible]')).click();

                // now there should be back button
                expect(element(by.css('.pagination-controls button[ng-show=previousPageVisible]')).isDisplayed()).toBeTruthy();

            });

        });

    });
});
