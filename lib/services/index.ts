import { AccountService } from "./accounts";
import { DictionaryService } from "./dictionary";
import { FeedbackService } from "./feedback";

class DataService {
  readonly accounts = new AccountService();
  readonly feedbacks = new FeedbackService();
  readonly dictionary = new DictionaryService();
  constructor() {}
}

export const database = new DataService();
