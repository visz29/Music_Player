
const saveUserData = (userData) => {
  localStorage.setItem('userData', JSON.stringify(userData));
};


export {saveUserData}
