import { TwentyOnePage } from './app.po';

describe('twenty-one App', function() {
  let page: TwentyOnePage;

  beforeEach(() => {
    page = new TwentyOnePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
