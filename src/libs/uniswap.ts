import { BigNumber } from 'ethers'
import * as IUniswapV2Pair from '../abi/IUniswapPair'
import * as ERC20 from '../abi/ERC20'
import { EvmLogHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'

export async function getTokenPrice(ctx: EvmLogHandlerContext<Store>, pairAddress: string, amount: BigInt) {
    const pair = new IUniswapV2Pair.Contract(ctx, pairAddress)
    const token1 = new ERC20.Contract(ctx, await pair.token1())
    const { _reserve0, _reserve1 } = await pair.getReserves()

    console.log({ _reserve0, _reserve1 })

    // decimals
    const res0 = _reserve0.mul(BigNumber.from(10)).pow(await token1.decimals())
    return BigNumber.from(amount).mul(res0).div(_reserve1) //return amount of token0 needed to buy token1
}
