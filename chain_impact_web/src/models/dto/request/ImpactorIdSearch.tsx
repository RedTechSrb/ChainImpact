export class ImpactorIdSearch {
    pageNumber!: number | null
    pageSize!: number | null
    "dto": {
        "id": number
    }

    constructor(num1: number | null, num2: number | null, id: number) {
        this.pageNumber = num1
        this.pageSize = num2
        this.dto = { id }
    }
}