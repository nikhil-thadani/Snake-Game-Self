export class Score {
  static count: number = 0;
  static getScore() {
    return this.count;
  }
  public static updateScore(count: number) {
    this.count += count;
  }
  public static reset() {
    this.count = 0;
  }
}
