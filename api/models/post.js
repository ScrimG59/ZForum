class Post {
    constructor(Id, Content, User, Thread, CreationDate) {
        this.Id = Id;
        this.Content = Content;
        this.User = User;
        this.Thread = Thread;
        this.CreationDate = CreationDate;
    }
}

module.exports = Post;