class Category {
    constructor(id, entries) {
        this.id = id;
        this.entries = entries;
        this.currentQuestion = 0;
        this.isFinished = false;
        this.score = 0;
        this.thumbnail = this.entries[0].imageNum;
    }
  }

  export default Category;