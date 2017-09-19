import { Lesson3Page } from './app.po';

describe('lesson3 App', () => {
  let page: Lesson3Page;

  beforeEach(() => {
    page = new Lesson3Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
