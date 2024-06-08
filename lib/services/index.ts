import { AccountService } from "./accounts";

class DataService {
  readonly accounts = new AccountService();
  constructor() {}
}

export const database = new DataService();
