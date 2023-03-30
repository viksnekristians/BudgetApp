export default function authHeader() {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
        return 'Bearer ' + accessToken;
    } else return '';
}
