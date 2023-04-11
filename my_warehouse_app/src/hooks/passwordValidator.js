export function passwordValidator(pass, confirmPass) {
    if (confirmPass) {
        if (confirmPass !== pass) {
            return alert("Passwords don't match!");
        }
        if (pass.length <= 5) {
            return alert('Password must be at least 5 digits long');
        }
        return true
    } else {
       return pass.length <= 5 ? true : false
    }
}
