export function passwordValidator(pass, confirmPass) {
    console.log(confirmPass);
    if (confirmPass) {
        if (confirmPass !== pass) {
            return alert("Passwords don't match!");
        }
        if (pass.length <= 5) {
            return alert('Password must be at least 5 digits long!');
        }
        return true
    } else {
       if (pass.length <= 5) {
        return alert('Password must be at least 5 digits long!');
       }
       return true
    }
}
