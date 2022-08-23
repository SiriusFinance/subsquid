import { EvmLogHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { PkexStakeAcct } from '../model'
import { events as PoolsEvents } from '../abi/Pools'
import { events as PoolsTierEvents } from '../abi/PoolsTier'
import { events as FarmsEvents } from '../abi/Farms'

export async function updateStakeAcct(ctx: EvmLogHandlerContext<Store>, account: string): Promise<void> {
  let user = await ctx.store.get(PkexStakeAcct, account)
  if (user == null) {
    user = new PkexStakeAcct({
      id: account,
      address: account,
      lastActionTime: BigInt(ctx.block.timestamp),
    })
    await ctx.store.save(user)
  }
}

export async function handlePoolDeposit(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const event = PoolsEvents['Stake(address,uint256)'].decode(ctx.event.args)
  updateStakeAcct(ctx, event.who)
}
export async function handlePoolTierDeposit(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const event = PoolsTierEvents['Stake(address,uint256)'].decode(ctx.event.args)
  updateStakeAcct(ctx, event.who)
}
export async function handleFarmStake(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const event = FarmsEvents['Staked(address,uint256,uint256,uint256)'].decode(ctx.event.args)
  updateStakeAcct(ctx, event.user)
}
