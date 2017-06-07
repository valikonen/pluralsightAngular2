import { PluralsightAngular2Page } from './app.po';

describe('pluralsight-angular2 App', () => {
  let page: PluralsightAngular2Page;

  beforeEach(() => {
    page = new PluralsightAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
