class StoredCategory {
    constructor(id) {
        this.id = id;
        this.currentQuestion = 0;
        this.isFinished = false;
        this.score = 0;
        this.correctAnswers = [];
        this.wrongAnswers = [];
    }
    
  }

  export default StoredCategory;