import {
    AddLiquidityEventData,
    Exchange,
    RemoveLiquidityEventData,
    StopRampAEventData,
    Swap,
    SwapEvent,
    TokenExchangeData,
} from '../model'
import { getBalancesXSwap, getOrCreateXSwap } from '../entities/swap'
import { getDailyTradeVolume, getHourlyTradeVolume, getWeeklyTradeVolume } from '../entities/volume'
import { getDailyPoolTvl } from '../entities/tvl'

import { getOrCreateToken } from '../entities/token'
import { getSystemInfo, toSeconds } from '../entities/system'
import { decodeHex, EvmLogHandlerContext, toHex } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { Big as BigDecimal } from 'big.js'

import * as XSwapDeposit from '../abi/XSwapDeposit'
import * as XSwap from '../abi/XSwap'
import { BigNumber } from 'ethers'

type Opts = {
    metaTokenAddress: string
}

export async function handleAddLiquidity(ctx: EvmLogHandlerContext<Store>, { metaTokenAddress }: Opts): Promise<void> {
    let swap = await getOrCreateXSwap(ctx, ctx.event.args.address)
    let balances = await getBalancesXSwap(ctx, ctx.event.args.address)

    const event = XSwapDeposit.events['AddLiquidity(address,uint256[],uint256,uint256,uint256)'].decode(ctx.event.args)

    let price = event.price
    swap.balances = balances

    // update TVL
    let tvl: BigDecimal = await updateTVL(swap, ctx, balances, metaTokenAddress, price.toBigInt())
    swap.tvl = tvl.toFixed()

    let dailyTvl = await getDailyPoolTvl(ctx, swap, BigInt(toSeconds(ctx.block.timestamp)))
    dailyTvl.tvl = tvl.toFixed()
    await ctx.store.save(dailyTvl)

    // update APY
    let dailyVolume = await getDailyTradeVolume(ctx, swap, BigInt(toSeconds(ctx.block.timestamp)))
    let dailyTotalSwapFees = BigDecimal(dailyVolume.volume)
        .times(swap.swapFee.toString())
        .div(BigDecimal('10000000000'))
    let apy: BigDecimal = BigDecimal(0)
    if (!tvl.eq(BigDecimal(0))) {
        apy = dailyTotalSwapFees.div(tvl).times(BigDecimal('365'))
    }
    swap.apy = apy.toFixed()

    await ctx.store.save(swap)

    let log = new SwapEvent({ id: 'add_liquidity-' + ctx.event.evmTxHash })

    log.swap = swap

    log.data = new AddLiquidityEventData()
    log.data.provider = decodeHex(event.provider)
    log.data.tokenAmounts = event.tokenAmounts.map((t) => t.toBigInt())
    log.data.fees = []
    log.data.invariant = 0n
    log.data.lpTokenSupply = 0n

    log.block = BigInt(ctx.block.height)
    log.timestamp = BigInt(toSeconds(ctx.block.timestamp))
    log.transaction = decodeHex(ctx.event.evmTxHash)

    await ctx.store.save(log)
}

export async function handleRemoveLiquidity(
    ctx: EvmLogHandlerContext<Store>,
    { metaTokenAddress }: Opts
): Promise<void> {
    let swap = await getOrCreateXSwap(ctx, ctx.event.args.address)
    let balances = await getBalancesXSwap(ctx, ctx.event.args.address)

    const event = XSwapDeposit.events['RemoveLiquidity(address,uint256[2],uint256,uint256)'].decode(ctx.event.args)

    let price = event.price
    swap.balances = balances

    // update TVL
    let tvl: BigDecimal = await updateTVL(swap, ctx, balances, metaTokenAddress, price.toBigInt())
    swap.tvl = tvl.toFixed()

    let dailyTvl = await getDailyPoolTvl(ctx, swap, BigInt(toSeconds(ctx.block.timestamp)))
    dailyTvl.tvl = tvl.toFixed()
    await ctx.store.save(dailyTvl)

    // update APY
    let dailyVolume = await getDailyTradeVolume(ctx, swap, BigInt(toSeconds(ctx.block.timestamp)))
    let dailyTotalSwapFees = BigDecimal(dailyVolume.volume)
        .times(swap.swapFee.toString())
        .div(BigDecimal('10000000000'))
    let apy: BigDecimal = BigDecimal(0)
    if (!tvl.eq(BigDecimal(0))) {
        apy = dailyTotalSwapFees.div(tvl).times(BigDecimal('365'))
    }
    swap.apy = apy.toFixed()

    await ctx.store.save(swap)

    let log = new SwapEvent({ id: 'remove_liquidity-' + ctx.event.evmTxHash })

    log.swap = swap

    log.data = new RemoveLiquidityEventData()
    log.data.provider = decodeHex(event.provider)
    log.data.tokenAmounts = event.tokenAmounts.map((t) => t.toBigInt())
    log.data.lpTokenSupply = 0n

    log.block = BigInt(ctx.block.height)
    log.timestamp = BigInt(toSeconds(ctx.block.timestamp))
    log.transaction = decodeHex(ctx.event.evmTxHash)

    await ctx.store.save(log)
}

export async function handleRemoveLiquidityOne(
    ctx: EvmLogHandlerContext<Store>,
    { metaTokenAddress }: Opts
): Promise<void> {
    let swap = await getOrCreateXSwap(ctx, ctx.event.args.address)
    let balances = await getBalancesXSwap(ctx, ctx.event.args.address)

    const event = XSwapDeposit.events['RemoveLiquidityOne(address,uint256,uint256,uint256,uint256)'].decode(
        ctx.event.args
    )

    let price = event.price
    swap.balances = balances

    // update TVL
    let tvl: BigDecimal = await updateTVL(swap, ctx, balances, metaTokenAddress, price.toBigInt())
    swap.tvl = tvl.toFixed()

    let dailyTvl = await getDailyPoolTvl(ctx, swap, BigInt(toSeconds(ctx.block.timestamp)))
    dailyTvl.tvl = tvl.toFixed()
    await ctx.store.save(dailyTvl)

    // update APY
    let dailyVolume = await getDailyTradeVolume(ctx, swap, BigInt(toSeconds(ctx.block.timestamp)))
    let dailyTotalSwapFees = BigDecimal(dailyVolume.volume)
        .times(swap.swapFee.toString())
        .div(BigDecimal('10000000000'))
    let apy: BigDecimal = BigDecimal(0)
    if (!tvl.eq(BigDecimal(0))) {
        apy = dailyTotalSwapFees.div(tvl).times(BigDecimal('365'))
    }
    swap.apy = apy.toFixed()

    await ctx.store.save(swap)

    let log = new SwapEvent({ id: 'remove_liquidity_one-' + ctx.event.evmTxHash })

    let tokenAmounts: bigint[] = []
    for (let i = 0; i < swap.numTokens; i++) {
        if (i === event.coinIndex.toNumber()) {
            tokenAmounts.push(event.coinAmount.toBigInt())
        } else {
            tokenAmounts.push(0n)
        }
    }

    log.swap = swap

    log.data = new RemoveLiquidityEventData()
    log.data.provider = decodeHex(event.provider)
    log.data.tokenAmounts = tokenAmounts
    log.data.lpTokenSupply = 0n

    log.block = BigInt(ctx.block.height)
    log.timestamp = BigInt(toSeconds(ctx.block.timestamp))
    log.transaction = decodeHex(ctx.event.evmTxHash)

    await ctx.store.save(log)
}

export async function handleTokenSwap(ctx: EvmLogHandlerContext<Store>, { metaTokenAddress }: Opts): Promise<void> {
    let swap = await getOrCreateXSwap(ctx, ctx.event.args.address)
    let balances = await getBalancesXSwap(ctx, ctx.event.args.address)

    const event = XSwapDeposit.events['TokenExchange(address,uint256,uint256,uint256,uint256,uint256)'].decode(
        ctx.event.args
    )

    let price = event.price
    swap.balances = balances

    if (swap != null) {
        let exchange = new Exchange({ id: 'token_exchange-' + ctx.event.evmTxHash })

        exchange.swap = swap

        exchange.data = new TokenExchangeData()
        exchange.data.buyer = decodeHex(event.buyer)
        exchange.data.soldId = event.soldId.toBigInt()
        exchange.data.tokensSold = event.tokensSold.toBigInt()
        exchange.data.boughtId = event.boughtId.toBigInt()
        exchange.data.tokensBought = event.tokensBought.toBigInt()

        exchange.block = BigInt(ctx.block.height)
        exchange.timestamp = BigInt(toSeconds(ctx.block.timestamp))
        exchange.transaction = decodeHex(ctx.event.evmTxHash)

        await ctx.store.save(exchange)

        // save trade volume

        let tokens = swap.tokens
        if (event.soldId.toNumber() < tokens.length && event.boughtId.toNumber() < tokens.length) {
            let soldToken = await getOrCreateToken(ctx, toHex(tokens[event.soldId.toNumber()].address))
            let sellVolume = BigDecimal(event.tokensSold.toString()).div(Math.pow(10, Number(soldToken.decimals)))
            if (toHex(tokens[event.soldId.toNumber()].address) == metaTokenAddress) {
                sellVolume = sellVolume.times(1e18).div(new BigDecimal(price.toString()))
            }

            let boughtToken = await getOrCreateToken(ctx, toHex(tokens[event.boughtId.toNumber()].address))
            let buyVolume = BigDecimal(event.tokensBought.toString()).div(Math.pow(10, Number(boughtToken.decimals)))
            if (toHex(tokens[event.boughtId.toNumber()].address) == metaTokenAddress) {
                buyVolume = buyVolume.times(1e18).div(new BigDecimal(price.toString()))
            }

            let volume = sellVolume.plus(buyVolume).div(2)

            let hourlyVolume = await getHourlyTradeVolume(ctx, swap, BigInt(toSeconds(ctx.block.timestamp)))
            hourlyVolume.volume = BigDecimal(hourlyVolume.volume).plus(volume).toFixed()
            await ctx.store.save(hourlyVolume)

            let dailyVolume = await getDailyTradeVolume(ctx, swap, BigInt(toSeconds(ctx.block.timestamp)))
            dailyVolume.volume = BigDecimal(dailyVolume.volume).plus(volume).toFixed()
            await ctx.store.save(dailyVolume)

            let weeklyVolume = await getWeeklyTradeVolume(ctx, swap, BigInt(toSeconds(ctx.block.timestamp)))
            weeklyVolume.volume = BigDecimal(weeklyVolume.volume).plus(volume).toFixed()
            await ctx.store.save(weeklyVolume)

            // update TVL
            let tvl: BigDecimal = await updateTVL(swap, ctx, balances, metaTokenAddress, price.toBigInt())
            swap.tvl = tvl.toFixed()

            let dailyTvl = await getDailyPoolTvl(ctx, swap, BigInt(toSeconds(ctx.block.timestamp)))
            dailyTvl.tvl = tvl.toFixed()
            await ctx.store.save(dailyTvl)

            // update APY
            let dailyTotalSwapFees = BigDecimal(dailyVolume.volume)
                .times(swap.swapFee.toString())
                .div(BigDecimal('10000000000'))
            let apy: BigDecimal = BigDecimal(0)
            if (!tvl.eq(BigDecimal(0))) {
                apy = dailyTotalSwapFees.div(tvl).times(BigDecimal('365'))
            }
            swap.apy = apy.toFixed()

            await ctx.store.save(swap)
        }

        // update system
        let system = await getSystemInfo(ctx)
        system.exchangeCount += 1n
        await ctx.store.save(system)
    }
}

async function updateTVL(
    swap: Swap,
    ctx: EvmLogHandlerContext<Store, { event: true }>,
    balances: bigint[],
    metaTokenAddress: string,
    price: BigInt
) {
    let swapDepositContract = new XSwapDeposit.Contract(ctx, toHex(swap.address))
    if (!swap.metaSwapAddress) {
        swap.metaSwapAddress = decodeHex(await swapDepositContract.META_POOL())
        ctx.store.save(swap)
    }
    let swapContract = new XSwap.Contract(ctx, toHex(swap.metaSwapAddress))
    let tokenAddresses = [await swapContract.coins(BigNumber.from(0)), await swapContract.coins(BigNumber.from(1))]

    let tvl: BigDecimal = BigDecimal('0')
    for (let i = 0; i < 2; i++) {
        let token = await getOrCreateToken(ctx, tokenAddresses[i])
        if (token !== null) {
            let balance: BigInt = balances[i]
            let balanceDecimal: BigDecimal = BigDecimal(balance.toString()).div(Math.pow(10, Number(token.decimals)))
            if (tokenAddresses[i] == metaTokenAddress) {
                tvl = tvl.plus(balanceDecimal.times(1e18).div(BigDecimal(price.toString())))
            } else {
                tvl = tvl.plus(balanceDecimal)
            }
        }
    }
    return tvl
}
