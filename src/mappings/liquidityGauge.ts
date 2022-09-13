import { getOrCreateAirdropee } from '../entities/swap'
import { decodeHex, EvmLogHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'

import * as LiquidityGauge from '../abi/LiquidityGauge'
import { toSeconds } from '../entities/system'

export async function handleDeposit(ctx: EvmLogHandlerContext<Store>) {
    let event = LiquidityGauge.events['Deposit(address,uint256)'].decode(((ctx.event.args as any).log || ctx.event.args))
    // Tuesday, March 29, 2022 12:00:00 PM
    if (toSeconds(ctx.block.timestamp) < 1648555200) {
        let airdropee = await getOrCreateAirdropee(ctx, event.provider) // tx.from
        airdropee.count += 1n
        airdropee.farmDepositCount += 1n

        airdropee.updated = BigInt(toSeconds(ctx.block.timestamp))
        airdropee.updatedAtBlock = BigInt(ctx.block.height)
        airdropee.updatedAtTransaction = decodeHex(ctx.event.evmTxHash)
        await ctx.store.save(airdropee)
    }
}

export async function handleWithdraw(ctx: EvmLogHandlerContext<Store>) {
    let event = LiquidityGauge.events['Withdraw(address,uint256)'].decode(((ctx.event.args as any).log || ctx.event.args))

    // Tuesday, March 29, 2022 12:00:00 PM
    if (toSeconds(ctx.block.timestamp) < 1648555200) {
        let airdropee = await getOrCreateAirdropee(ctx, event.provider) // tx.from
        airdropee.count += 1n
        airdropee.farmDepositCount += 1n

        airdropee.updated = BigInt(toSeconds(ctx.block.timestamp))
        airdropee.updatedAtBlock = BigInt(ctx.block.height)
        airdropee.updatedAtTransaction = decodeHex(ctx.event.evmTxHash)
        await ctx.store.save(airdropee)
    }
}
