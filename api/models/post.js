class Post {
    constructor(Id, Content, Username, UserId, CreationDate) {
        this.Id = Id;
        this.Content = Content;
        this.Username = Username;
        this.UserId = UserId;
        this.CreationDate = CreationDate;
    }
}

module.exports = Post;