export default ({ store, route, redirect }) => {
  const { name, fullPath } = route;
  // The router is undefined by us.
  if (!name) return;

  const hasAuth = !!store.state.auth.token;
  const role = store.state.auth.user ? store.state.auth.user.role : 'user';
  const shouldBeSkipedPathWhenHaveAuth = ['/auth/login', '/auth/signup'];
  const shouldHaveAuthPath = ['/auth/profile'];

  if (hasAuth && shouldBeSkipedPathWhenHaveAuth.indexOf(fullPath) !== -1) {
    return redirect('/')
  }

  if (!hasAuth && shouldHaveAuthPath.indexOf(fullPath) !== -1) {
    return redirect('/auth/login')
  }

  // Check Admins Page
  const isAdminPage = ['/adv/users', '/adv/projects'].includes(fullPath);
  if (hasAuth && isAdminPage && role === 'user') {
    return redirect('/');
  }

}
