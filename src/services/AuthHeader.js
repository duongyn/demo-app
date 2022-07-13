export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.jwttoken) {
    return {
      Authorization: 'Bearer ' + user.jwttoken,
      "Content-Type": "application/json",
    }
    // 'Access-Control-Allow-Origin': '*' };
  } else {
    return {};
  }
}