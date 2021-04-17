class Thread {
    constructor(Id, Title, Description, CreationDate, User, Content, Posts) {
        this.Id = Id;
        this.Title = Title;
        this.Description = Description;
        this.CreationDate = CreationDate;
        this.User = User;
        this.Content = Content;
        this.Posts = Posts;
    }
}

module.exports = Thread;