export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    if (pathname === '/' || pathname === '') {
      pathname = '/index.html';
    } else if (pathname === '/login') {
      pathname = '/login.html';
    } else if (pathname === '/admin') {
      pathname = '/admin.html';
    } else if (pathname === '/recognition') {
      pathname = '/recognition.html';
    } else if (pathname === '/projects') {
      pathname = '/projects.html';
    } else if (pathname === '/blog') {
      pathname = '/blog.html';
    } else if (pathname.startsWith('/cohorts/')) {
      pathname = '/cohort.html';
    }

    const rewritten = new URL(pathname + url.search, url.origin);
    return env.ASSETS.fetch(new Request(rewritten, request));
  }
};
