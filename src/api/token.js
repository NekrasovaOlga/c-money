export const setToken = (token) => {
  localStorage.setItem('bearer', token);
};

export const getToken = (data) => {
  let token = '';
  if (data) {
    token = data;
  }
  if (localStorage.getItem('bearer')) {
    setToken(localStorage.getItem('bearer'));
    token = localStorage.getItem('bearer');
  }
  return token;
};
