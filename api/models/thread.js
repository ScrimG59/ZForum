class Thread {
    constructor(Id, Title, Description, CreationDate, User, Content) {
        this.Id = Id;
        this.Title = Title;
        this.Description = Description;
        this.CreationDate = CreationDate;
        this.User = User;
        this.Content = Content;
    }
}

module.exports = Thread;