class Thread {
    constructor(Id, Title, Description, CreationDate, Username, UserId, Content, Posts) {
        this.Id = Id;
        this.Title = Title;
        this.Description = Description;
        this.CreationDate = CreationDate;
        this.Username = Username;
        this.UserId = UserId;
        this.Content = Content;
        this.Posts = Posts;
    }
}

module.exports = Thread;