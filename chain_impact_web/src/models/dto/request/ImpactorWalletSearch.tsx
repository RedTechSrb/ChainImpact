export class ImpactorWalletSearch {
    pageNumber!: number | null
    pageSize!: number | null
    "dto": {
        "wallet": string
    }

    constructor(num1: number | null, num2: number | null, wallet: string) {
        this.pageNumber = num1
        this.pageSize = num2
        this.dto = { wallet }
    }
}