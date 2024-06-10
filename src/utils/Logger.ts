import morgan from "morgan";

class Logger {
  private logger;

  constructor() {
    this.logger = morgan("dev");
  }

  getLogger() {
    return this.logger;
  }
}

export default new Logger().getLogger();
