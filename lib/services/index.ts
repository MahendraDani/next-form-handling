import { AccountService } from "./accounts";
import { FeedbackService } from "./feedback";

class DataService {
  readonly accounts = new AccountService();
  readonly feedbacks = new FeedbackService();
  constructor() {}
}

export const database = new DataService();
