export interface DonationSaveRequest {
    wallet: string,
    projectId: number,
    amount: number,
    blockchainaddress: string | undefined
}