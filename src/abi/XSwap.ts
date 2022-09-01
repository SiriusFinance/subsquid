import * as ethers from 'ethers'
import assert from 'assert'

export const abi = new ethers.utils.Interface(getJsonAbi())

export interface AddLiquidity0Event {
    provider: string
    tokenAmounts: Array<ethers.BigNumber>
    fee: ethers.BigNumber
    tokenSupply: ethers.BigNumber
}

export interface OwnershipTransferred0Event {
    previousOwner: string
    newOwner: string
}

export interface Paused0Event {
    account: string
}

export interface RampAgamma0Event {
    initialA: ethers.BigNumber
    futureA: ethers.BigNumber
    initialGamma: ethers.BigNumber
    futureGamma: ethers.BigNumber
    initialTime: ethers.BigNumber
    futureTime: ethers.BigNumber
}

export interface RemoveLiquidity0Event {
    provider: string
    tokenAmounts: Array<ethers.BigNumber>
    tokenSupply: ethers.BigNumber
}

export interface RemoveLiquidityOne0Event {
    provider: string
    tokenAmount: ethers.BigNumber
    coinIndex: ethers.BigNumber
    coinAmount: ethers.BigNumber
}

export interface StopRampA0Event {
    currentA: ethers.BigNumber
    currentGamma: ethers.BigNumber
    time: ethers.BigNumber
}

export interface TokenExchange0Event {
    buyer: string
    soldId: ethers.BigNumber
    tokensSold: ethers.BigNumber
    boughtId: ethers.BigNumber
    tokensBought: ethers.BigNumber
}

export interface Unpaused0Event {
    account: string
}

export interface EvmEvent {
    data: string
    topics: string[]
}

export const events = {
    'AddLiquidity(address,uint256[],uint256,uint256)': {
        topic: abi.getEventTopic('AddLiquidity(address,uint256[],uint256,uint256)'),
        decode(data: EvmEvent): AddLiquidity0Event {
            const result = abi.decodeEventLog(
                abi.getEvent('AddLiquidity(address,uint256[],uint256,uint256)'),
                data.data || '',
                data.topics
            )
            return {
                provider: result[0],
                tokenAmounts: result[1],
                fee: result[2],
                tokenSupply: result[3],
            }
        },
    },
    'OwnershipTransferred(address,address)': {
        topic: abi.getEventTopic('OwnershipTransferred(address,address)'),
        decode(data: EvmEvent): OwnershipTransferred0Event {
            const result = abi.decodeEventLog(
                abi.getEvent('OwnershipTransferred(address,address)'),
                data.data || '',
                data.topics
            )
            return {
                previousOwner: result[0],
                newOwner: result[1],
            }
        },
    },
    'Paused(address)': {
        topic: abi.getEventTopic('Paused(address)'),
        decode(data: EvmEvent): Paused0Event {
            const result = abi.decodeEventLog(abi.getEvent('Paused(address)'), data.data || '', data.topics)
            return {
                account: result[0],
            }
        },
    },
    'RampAgamma(uint256,uint256,uint256,uint256,uint256,uint256)': {
        topic: abi.getEventTopic('RampAgamma(uint256,uint256,uint256,uint256,uint256,uint256)'),
        decode(data: EvmEvent): RampAgamma0Event {
            const result = abi.decodeEventLog(
                abi.getEvent('RampAgamma(uint256,uint256,uint256,uint256,uint256,uint256)'),
                data.data || '',
                data.topics
            )
            return {
                initialA: result[0],
                futureA: result[1],
                initialGamma: result[2],
                futureGamma: result[3],
                initialTime: result[4],
                futureTime: result[5],
            }
        },
    },
    'RemoveLiquidity(address,uint256[2],uint256)': {
        topic: abi.getEventTopic('RemoveLiquidity(address,uint256[2],uint256)'),
        decode(data: EvmEvent): RemoveLiquidity0Event {
            const result = abi.decodeEventLog(
                abi.getEvent('RemoveLiquidity(address,uint256[2],uint256)'),
                data.data || '',
                data.topics
            )
            return {
                provider: result[0],
                tokenAmounts: result[1],
                tokenSupply: result[2],
            }
        },
    },
    'RemoveLiquidityOne(address,uint256,uint256,uint256)': {
        topic: abi.getEventTopic('RemoveLiquidityOne(address,uint256,uint256,uint256)'),
        decode(data: EvmEvent): RemoveLiquidityOne0Event {
            const result = abi.decodeEventLog(
                abi.getEvent('RemoveLiquidityOne(address,uint256,uint256,uint256)'),
                data.data || '',
                data.topics
            )
            return {
                provider: result[0],
                tokenAmount: result[1],
                coinIndex: result[2],
                coinAmount: result[3],
            }
        },
    },
    'StopRampA(uint256,uint256,uint256)': {
        topic: abi.getEventTopic('StopRampA(uint256,uint256,uint256)'),
        decode(data: EvmEvent): StopRampA0Event {
            const result = abi.decodeEventLog(
                abi.getEvent('StopRampA(uint256,uint256,uint256)'),
                data.data || '',
                data.topics
            )
            return {
                currentA: result[0],
                currentGamma: result[1],
                time: result[2],
            }
        },
    },
    'TokenExchange(address,uint256,uint256,uint256,uint256)': {
        topic: abi.getEventTopic('TokenExchange(address,uint256,uint256,uint256,uint256)'),
        decode(data: EvmEvent): TokenExchange0Event {
            const result = abi.decodeEventLog(
                abi.getEvent('TokenExchange(address,uint256,uint256,uint256,uint256)'),
                data.data || '',
                data.topics
            )
            return {
                buyer: result[0],
                soldId: result[1],
                tokensSold: result[2],
                boughtId: result[3],
                tokensBought: result[4],
            }
        },
    },
    'Unpaused(address)': {
        topic: abi.getEventTopic('Unpaused(address)'),
        decode(data: EvmEvent): Unpaused0Event {
            const result = abi.decodeEventLog(abi.getEvent('Unpaused(address)'), data.data || '', data.topics)
            return {
                account: result[0],
            }
        },
    },
}

interface ChainContext {
    _chain: Chain
}

interface BlockContext {
    _chain: Chain
    block: Block
}

interface Block {
    height: number
}

interface Chain {
    client: {
        call: <T = any>(method: string, params?: unknown[]) => Promise<T>
    }
}

export class Contract {
    private readonly _chain: Chain
    private readonly blockHeight: number
    readonly address: string

    constructor(ctx: BlockContext, address: string)
    constructor(ctx: ChainContext, block: Block, address: string)
    constructor(ctx: BlockContext, blockOrAddress: Block | string, address?: string) {
        this._chain = ctx._chain
        if (typeof blockOrAddress === 'string') {
            this.blockHeight = ctx.block.height
            this.address = ethers.utils.getAddress(blockOrAddress)
        } else {
            assert(address != null)
            this.blockHeight = blockOrAddress.height
            this.address = ethers.utils.getAddress(address)
        }
    }

    private async call(name: string, args: any[]): Promise<ReadonlyArray<any>> {
        const fragment = abi.getFunction(name)
        const data = abi.encodeFunctionData(fragment, args)
        const result = await this._chain.client.call('eth_call', [{ to: this.address, data }, this.blockHeight])
        return abi.decodeFunctionResult(fragment, result)
    }

    async A(): Promise<ethers.BigNumber> {
        const result = await this.call('A', [])
        return result[0]
    }

    async ADMIN_ACTIONS_DELAY(): Promise<ethers.BigNumber> {
        const result = await this.call('ADMIN_ACTIONS_DELAY', [])
        return result[0]
    }

    async A_MULTIPLIER(): Promise<ethers.BigNumber> {
        const result = await this.call('A_MULTIPLIER', [])
        return result[0]
    }

    async D(): Promise<ethers.BigNumber> {
        const result = await this.call('D', [])
        return result[0]
    }

    async EXP_PRECISION(): Promise<ethers.BigNumber> {
        const result = await this.call('EXP_PRECISION', [])
        return result[0]
    }

    async MAX_A(): Promise<ethers.BigNumber> {
        const result = await this.call('MAX_A', [])
        return result[0]
    }

    async MAX_ADMIN_FEE(): Promise<ethers.BigNumber> {
        const result = await this.call('MAX_ADMIN_FEE', [])
        return result[0]
    }

    async MAX_A_CHANGE(): Promise<ethers.BigNumber> {
        const result = await this.call('MAX_A_CHANGE', [])
        return result[0]
    }

    async MAX_FEE(): Promise<ethers.BigNumber> {
        const result = await this.call('MAX_FEE', [])
        return result[0]
    }

    async MAX_GAMMA(): Promise<ethers.BigNumber> {
        const result = await this.call('MAX_GAMMA', [])
        return result[0]
    }

    async MIN_A(): Promise<ethers.BigNumber> {
        const result = await this.call('MIN_A', [])
        return result[0]
    }

    async MIN_FEE(): Promise<ethers.BigNumber> {
        const result = await this.call('MIN_FEE', [])
        return result[0]
    }

    async MIN_GAMMA(): Promise<ethers.BigNumber> {
        const result = await this.call('MIN_GAMMA', [])
        return result[0]
    }

    async MIN_RAMP_TIME(): Promise<ethers.BigNumber> {
        const result = await this.call('MIN_RAMP_TIME', [])
        return result[0]
    }

    async NOISE_FEE(): Promise<ethers.BigNumber> {
        const result = await this.call('NOISE_FEE', [])
        return result[0]
    }

    async N_COINS(): Promise<ethers.BigNumber> {
        const result = await this.call('N_COINS', [])
        return result[0]
    }

    async PRECISION(): Promise<ethers.BigNumber> {
        const result = await this.call('PRECISION', [])
        return result[0]
    }

    async PRECISIONS(index: ethers.BigNumber): Promise<ethers.BigNumber> {
        const result = await this.call('PRECISIONS', [index])
        return result[0]
    }

    async adjustmentStep(): Promise<ethers.BigNumber> {
        const result = await this.call('adjustmentStep', [])
        return result[0]
    }

    async adminFee(): Promise<ethers.BigNumber> {
        const result = await this.call('adminFee', [])
        return result[0]
    }

    async adminFeeReceiver(): Promise<string> {
        const result = await this.call('adminFeeReceiver', [])
        return result[0]
    }

    async allowedExtraProfit(): Promise<ethers.BigNumber> {
        const result = await this.call('allowedExtraProfit', [])
        return result[0]
    }

    async balances(index: ethers.BigNumber): Promise<ethers.BigNumber> {
        const result = await this.call('balances', [index])
        return result[0]
    }

    async calcTokenAmount(_amounts: Array<ethers.BigNumber>): Promise<ethers.BigNumber> {
        const result = await this.call('calcTokenAmount', [_amounts])
        return result[0]
    }

    async calcWithdrawOneCoin(_tokenAmount: ethers.BigNumber, _i: ethers.BigNumber): Promise<ethers.BigNumber> {
        const result = await this.call('calcWithdrawOneCoin', [_tokenAmount, _i])
        return result[0]
    }

    async all_coins(): Promise<string[]> {
        const result = await this.call('coins', [])
        return result[0]
    }

    async coins(index: ethers.BigNumber): Promise<string> {
        const result = await this.call('coins', [index])
        return result[0]
    }

    async fee(): Promise<ethers.BigNumber> {
        const result = await this.call('fee', [])
        return result[0]
    }

    async feeGamma(): Promise<ethers.BigNumber> {
        const result = await this.call('feeGamma', [])
        return result[0]
    }

    async futureAGamma(): Promise<ethers.BigNumber> {
        const result = await this.call('futureAGamma', [])
        return result[0]
    }

    async futureAGammaTime(): Promise<ethers.BigNumber> {
        const result = await this.call('futureAGammaTime', [])
        return result[0]
    }

    async futureAdjustmentStep(): Promise<ethers.BigNumber> {
        const result = await this.call('futureAdjustmentStep', [])
        return result[0]
    }

    async futureAdminFee(): Promise<ethers.BigNumber> {
        const result = await this.call('futureAdminFee', [])
        return result[0]
    }

    async futureAllowedExtraProfit(): Promise<ethers.BigNumber> {
        const result = await this.call('futureAllowedExtraProfit', [])
        return result[0]
    }

    async futureFeeGamma(): Promise<ethers.BigNumber> {
        const result = await this.call('futureFeeGamma', [])
        return result[0]
    }

    async futureMaHalfTime(): Promise<ethers.BigNumber> {
        const result = await this.call('futureMaHalfTime', [])
        return result[0]
    }

    async futureMidFee(): Promise<ethers.BigNumber> {
        const result = await this.call('futureMidFee', [])
        return result[0]
    }

    async futureOutFee(): Promise<ethers.BigNumber> {
        const result = await this.call('futureOutFee', [])
        return result[0]
    }

    async gamma(): Promise<ethers.BigNumber> {
        const result = await this.call('gamma', [])
        return result[0]
    }

    async getDy(_i: ethers.BigNumber, _j: ethers.BigNumber, _dx: ethers.BigNumber): Promise<ethers.BigNumber> {
        const result = await this.call('getDy', [_i, _j, _dx])
        return result[0]
    }

    async getVirtualPrice(): Promise<ethers.BigNumber> {
        const result = await this.call('getVirtualPrice', [])
        return result[0]
    }

    async initialAGamma(): Promise<ethers.BigNumber> {
        const result = await this.call('initialAGamma', [])
        return result[0]
    }

    async initialAGammaTime(): Promise<ethers.BigNumber> {
        const result = await this.call('initialAGammaTime', [])
        return result[0]
    }

    async lastPrices(): Promise<ethers.BigNumber> {
        const result = await this.call('lastPrices', [])
        return result[0]
    }

    async lastPricesTimestamp(): Promise<ethers.BigNumber> {
        const result = await this.call('lastPricesTimestamp', [])
        return result[0]
    }

    async lpPrice(): Promise<ethers.BigNumber> {
        const result = await this.call('lpPrice', [])
        return result[0]
    }

    async lpToken(): Promise<string> {
        const result = await this.call('lpToken', [])
        return result[0]
    }

    async maHalfTime(): Promise<ethers.BigNumber> {
        const result = await this.call('maHalfTime', [])
        return result[0]
    }

    async midFee(): Promise<ethers.BigNumber> {
        const result = await this.call('midFee', [])
        return result[0]
    }

    async outFee(): Promise<ethers.BigNumber> {
        const result = await this.call('outFee', [])
        return result[0]
    }

    async owner(): Promise<string> {
        const result = await this.call('owner', [])
        return result[0]
    }

    async paused(): Promise<boolean> {
        const result = await this.call('paused', [])
        return result[0]
    }

    async priceOracle(): Promise<ethers.BigNumber> {
        const result = await this.call('priceOracle', [])
        return result[0]
    }

    async priceScale(): Promise<ethers.BigNumber> {
        const result = await this.call('priceScale', [])
        return result[0]
    }

    async virtualPrice(): Promise<ethers.BigNumber> {
        const result = await this.call('virtualPrice', [])
        return result[0]
    }

    async xcpProfit(): Promise<ethers.BigNumber> {
        const result = await this.call('xcpProfit', [])
        return result[0]
    }

    async xcpProfitA(): Promise<ethers.BigNumber> {
        const result = await this.call('xcpProfitA', [])
        return result[0]
    }

    async xp(): Promise<Array<ethers.BigNumber>> {
        const result = await this.call('xp', [])
        return result[0]
    }
}

function getJsonAbi(): any {
    return [
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'provider',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'uint256[]',
                    name: 'tokenAmounts',
                    type: 'uint256[]',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'fee',
                    type: 'uint256',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'tokenSupply',
                    type: 'uint256',
                },
            ],
            name: 'AddLiquidity',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'previousOwner',
                    type: 'address',
                },
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'newOwner',
                    type: 'address',
                },
            ],
            name: 'OwnershipTransferred',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: 'address',
                    name: 'account',
                    type: 'address',
                },
            ],
            name: 'Paused',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'initialA',
                    type: 'uint256',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'futureA',
                    type: 'uint256',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'initialGamma',
                    type: 'uint256',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'futureGamma',
                    type: 'uint256',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'initialTime',
                    type: 'uint256',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'futureTime',
                    type: 'uint256',
                },
            ],
            name: 'RampAgamma',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'provider',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'uint256[2]',
                    name: 'tokenAmounts',
                    type: 'uint256[2]',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'tokenSupply',
                    type: 'uint256',
                },
            ],
            name: 'RemoveLiquidity',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'provider',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'tokenAmount',
                    type: 'uint256',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'coinIndex',
                    type: 'uint256',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'coinAmount',
                    type: 'uint256',
                },
            ],
            name: 'RemoveLiquidityOne',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'currentA',
                    type: 'uint256',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'currentGamma',
                    type: 'uint256',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'time',
                    type: 'uint256',
                },
            ],
            name: 'StopRampA',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'buyer',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'soldId',
                    type: 'uint256',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'tokensSold',
                    type: 'uint256',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'boughtId',
                    type: 'uint256',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'tokensBought',
                    type: 'uint256',
                },
            ],
            name: 'TokenExchange',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: 'address',
                    name: 'account',
                    type: 'address',
                },
            ],
            name: 'Unpaused',
            type: 'event',
        },
        {
            inputs: [],
            name: 'A',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'ADMIN_ACTIONS_DELAY',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'A_MULTIPLIER',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'D',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'EXP_PRECISION',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'MAX_A',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'MAX_ADMIN_FEE',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'MAX_A_CHANGE',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'MAX_FEE',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'MAX_GAMMA',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'MIN_A',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'MIN_FEE',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'MIN_GAMMA',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'MIN_RAMP_TIME',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'NOISE_FEE',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'N_COINS',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'PRECISION',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            name: 'PRECISIONS',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: '_A',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '_gamma',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '_midFee',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '_outFee',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '_allowedExtraProfit',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '_feeGamma',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '_adjustmentStep',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '_maHalfTime',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '_initialPrice',
                    type: 'uint256',
                },
            ],
            name: '__XSwap_init',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256[]',
                    name: '_amounts',
                    type: 'uint256[]',
                },
                {
                    internalType: 'uint256',
                    name: '_minMintAmount',
                    type: 'uint256',
                },
                {
                    internalType: 'address',
                    name: '_receiver',
                    type: 'address',
                },
            ],
            name: 'addLiquidity',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'adjustmentStep',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'adminFee',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'adminFeeReceiver',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'allowedExtraProfit',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            name: 'balances',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256[]',
                    name: '_amounts',
                    type: 'uint256[]',
                },
            ],
            name: 'calcTokenAmount',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: '_tokenAmount',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '_i',
                    type: 'uint256',
                },
            ],
            name: 'calcWithdrawOneCoin',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'dy',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'claimAdminFees',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            name: 'coins',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: '_i',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '_j',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '_dx',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '_minDy',
                    type: 'uint256',
                },
                {
                    internalType: 'address',
                    name: '_receiver',
                    type: 'address',
                },
            ],
            name: 'exchange',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'fee',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'feeGamma',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'futureAGamma',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'futureAGammaTime',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'futureAdjustmentStep',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'futureAdminFee',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'futureAllowedExtraProfit',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'futureFeeGamma',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'futureMaHalfTime',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'futureMidFee',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'futureOutFee',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'gamma',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: '_i',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '_j',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '_dx',
                    type: 'uint256',
                },
            ],
            name: 'getDy',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'getVirtualPrice',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'initialAGamma',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'initialAGammaTime',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'lastPrices',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'lastPricesTimestamp',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'lpPrice',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'lpToken',
            outputs: [
                {
                    internalType: 'contract ILPToken',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'maHalfTime',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'midFee',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'outFee',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'owner',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'pause',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'paused',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'priceOracle',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'priceScale',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: '_futureA',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '_futureGamma',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '_futureTime',
                    type: 'uint256',
                },
            ],
            name: 'rampAGamma',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: '_amount',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256[]',
                    name: '_minAmounts',
                    type: 'uint256[]',
                },
                {
                    internalType: 'address',
                    name: '_receiver',
                    type: 'address',
                },
            ],
            name: 'removeLiquidity',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: '_tokenAmount',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '_i',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '_minAmount',
                    type: 'uint256',
                },
                {
                    internalType: 'address',
                    name: '_receiver',
                    type: 'address',
                },
            ],
            name: 'removeLiquidityOneCoin',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'renounceOwnership',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: '_feeAmount',
                    type: 'uint256',
                },
            ],
            name: 'setAdminFee',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '_addr',
                    type: 'address',
                },
            ],
            name: 'setAdminFeeReceiver',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address[2]',
                    name: '_coins',
                    type: 'address[2]',
                },
            ],
            name: 'setCoins',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '_addr',
                    type: 'address',
                },
            ],
            name: 'setLPToken',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'stopRampAGamma',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'newOwner',
                    type: 'address',
                },
            ],
            name: 'transferOwnership',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'unpause',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'virtualPrice',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'xcpProfit',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'xcpProfitA',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'xp',
            outputs: [
                {
                    internalType: 'uint256[2]',
                    name: '',
                    type: 'uint256[2]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
    ]
}
