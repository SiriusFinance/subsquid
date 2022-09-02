import { BigNumber } from 'ethers'
import * as IUniswapV2Pair from '../abi/IUniswapPair'
import * as ERC20 from '../abi/ERC20'
import { EvmLogHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'

type Token = {
    address: string
    decimals: number
    symbol: string
}
type PairInfo = {
    token0: Token
    token1: Token
}

const PAIRS = {} as { [address: string]: PairInfo }

async function getPairInfo(ctx: EvmLogHandlerContext<Store>, pairAddress: string) {
    const pair = new IUniswapV2Pair.Contract(ctx, pairAddress)
    if (!PAIRS[pairAddress]) {
        const token0 = new ERC20.Contract(ctx, await pair.token0())
        const token1 = new ERC20.Contract(ctx, await pair.token1())

        PAIRS[pairAddress] = {
            token0: {
                address: token0.address,
                decimals: await token0.decimals(),
                symbol: await token0.symbol(),
            },
            token1: {
                address: token1.address,
                decimals: await token1.decimals(),
                symbol: await token1.symbol(),
            },
        }
    }

    return PAIRS[pairAddress]
}

export async function getToken1Price(ctx: EvmLogHandlerContext<Store>, pairAddress: string): Promise<number> {
    const pair = new IUniswapV2Pair.Contract(ctx, pairAddress)
    const info = await getPairInfo(ctx, pairAddress)
    const { _reserve0, _reserve1 } = await pair.getReserves()
    const result = _reserve0.mul(BigNumber.from(10).pow(info.token1.decimals)).div(_reserve1)
    return result.toNumber() / 10 ** info.token0.decimals
}
