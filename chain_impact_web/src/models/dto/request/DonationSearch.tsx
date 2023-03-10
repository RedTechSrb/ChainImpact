export class DonationSearch {
  pageNumber!: number | null;
  pageSize!: number | null;
  "dto": {
    projectid: number;
  };

  constructor(num1: number | null, num2: number | null, projectid: number) {
    this.pageNumber = num1;
    this.pageSize = num2;
    this.dto = { projectid };
  }
}
