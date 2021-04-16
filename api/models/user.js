class User {
    constructor(Id, Forename, Lastname, Email, Password) {
        this.Id = Id;
        this.Forename = Forename;
        this.Lastname = Lastname;
        this.Email = Email;
        this.Password = Password;
    }
}

module.exports = User;