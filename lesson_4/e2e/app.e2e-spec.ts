import { Lesson4Page } from './app.po';

describe('lesson4 App', () => {
  let page: Lesson4Page;

  beforeEach(() => {
    page = new Lesson4Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
