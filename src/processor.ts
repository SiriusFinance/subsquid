import { lookupArchive } from '@subsquid/archive-registry'
import { TypeormDatabase } from '@subsquid/typeorm-store'
import { BatchBlock, SubstrateBatchProcessor } from '@subsquid/substrate-processor'
import * as SwapNormal from './abi/SwapNormal'
import * as MetaSwap from './abi/SwapNormal'
import * as VotingEscrow from './abi/VotingEscrow'
import * as XSwapDeposit from './abi/XSwapDeposit'
import * as MetaSwapHandlers from './mappings/metaSwap'
import * as SwapNormalHandlers from './mappings/swapNormal'
import * as VotingEscrowHandlers from './mappings/votingEscrow'
import * as XSwapDepositHandlers from './mappings/xSwapDeposit'
import { Item } from '@subsquid/ss58'
import { getTokenPrice } from './libs/uniswap'

const SRS4_SWAP = '0x417E9d065ee22DFB7CC6C63C403600E27627F333'.toLowerCase()
const LAY4_SWAP = '0x0fB8C4eB33A30eBb01588e3110968430E3E69D58'.toLowerCase()
const NASTR_SWAP = '0xEEa640c27620D7C448AD655B6e3FB94853AC01e3'.toLowerCase()
const AVAULT_SWAP = '0xD8Bc543273B0E19eed34a295614963720c89f9e4'.toLowerCase()
const BAI_META_SWAP = '0x290c7577D209c2d8DB06F377af31318cE31938fB'.toLowerCase()
const OUSD_META_SWAP = '0xD18AbE9bcedeb5A9a65439e604b0BE8db0bdB176'.toLowerCase()
const VE_TOKEN_ADDRESS = '0xc9D383f1e6E5270D77ad8e198729e237b60b6397'.toLowerCase()

const JPYC_META_DEPOSIT = '0x3cd1Fa4EeeFdf6c30E66c66A474e8E4dd509f54c'.toLowerCase()
const WBTC_META_DEPOSIT = '0xD25Cf814EeE54840A08Db8dfAbFE445B1DE37f0f'.toLowerCase()
const WETH_META_DEPOSIT = '0x2d5Da7c463B3E8f4CF1AF08a1aA0a5DB9BB644F7'.toLowerCase()
const WBNB_META_DEPOSIT = '0xC9d4f937Fa8e0193b46817a41435a262867ff090'.toLowerCase()
const JPYC_ADDRESS = '0x431d5dff03120afa4bdf332c61a6e1766ef37bdb'.toLowerCase()
const WBTC_ADDRESS = '0xad543f18cff85c77e140e3e5e3c3392f6ba9d5ca'.toLowerCase()
const WETH_ADDRESS = '0x81ecac0d6be0550a00ff064a4f9dd2400585fe9c'.toLowerCase()
const WBNB_ADDRESS = '0x7f27352d5f83db87a5a3e00f4b07cc2138d8ee52'.toLowerCase()
const POOL_ADDRESSES = {
    [JPYC_META_DEPOSIT]: JPYC_ADDRESS,
    [WBTC_META_DEPOSIT]: WBTC_ADDRESS,
    [WETH_META_DEPOSIT]: WETH_ADDRESS,
    [WBNB_META_DEPOSIT]: WBNB_ADDRESS,
}

const database = new TypeormDatabase()
const processor = new SubstrateBatchProcessor().setBatchSize(100).setDataSource({
    archive: lookupArchive('astar', { release: 'FireSquid' }),
    chain: 'wss://astar.api.onfinality.io/ws?apikey=de31ed37-c90e-48fd-8d05-2920113e89d1',
})

// Sirius4Pool
processor.addEvmLog(SRS4_SWAP, {
    filter: [
        [
            SwapNormal.events['NewAdminFee(uint256)'].topic,
            SwapNormal.events['NewSwapFee(uint256)'].topic,
            SwapNormal.events['NewWithdrawFee(uint256)'].topic,
            SwapNormal.events['RampA(uint256,uint256,uint256,uint256)'].topic,
            SwapNormal.events['StopRampA(uint256,uint256)'].topic,
            SwapNormal.events['AddLiquidity(address,uint256[],uint256[],uint256,uint256)'].topic,
            SwapNormal.events['RemoveLiquidity(address,uint256[],uint256)'].topic,
            SwapNormal.events['RemoveLiquidityImbalance(address,uint256[],uint256[],uint256,uint256)'].topic,
            SwapNormal.events['RemoveLiquidityOne(address,uint256,uint256,uint256,uint256)'].topic,
            SwapNormal.events['TokenSwap(address,uint256,uint256,uint128,uint128)'].topic,
        ],
    ],
    range: { from: 815000 },
})
// Starlay4Pool
processor.addEvmLog(LAY4_SWAP, {
    filter: [
        [
            SwapNormal.events['NewAdminFee(uint256)'].topic,
            SwapNormal.events['NewSwapFee(uint256)'].topic,
            SwapNormal.events['NewWithdrawFee(uint256)'].topic,
            SwapNormal.events['RampA(uint256,uint256,uint256,uint256)'].topic,
            SwapNormal.events['StopRampA(uint256,uint256)'].topic,
            SwapNormal.events['AddLiquidity(address,uint256[],uint256[],uint256,uint256)'].topic,
            SwapNormal.events['RemoveLiquidity(address,uint256[],uint256)'].topic,
            SwapNormal.events['RemoveLiquidityImbalance(address,uint256[],uint256[],uint256,uint256)'].topic,
            SwapNormal.events['RemoveLiquidityOne(address,uint256,uint256,uint256,uint256)'].topic,
            SwapNormal.events['TokenSwap(address,uint256,uint256,uint128,uint128)'].topic,
        ],
    ],
    range: { from: 1049234 },
})
// nastrPool
processor.addEvmLog(NASTR_SWAP, {
    filter: [
        [
            SwapNormal.events['NewAdminFee(uint256)'].topic,
            SwapNormal.events['NewSwapFee(uint256)'].topic,
            SwapNormal.events['NewWithdrawFee(uint256)'].topic,
            SwapNormal.events['RampA(uint256,uint256,uint256,uint256)'].topic,
            SwapNormal.events['StopRampA(uint256,uint256)'].topic,
            SwapNormal.events['AddLiquidity(address,uint256[],uint256[],uint256,uint256)'].topic,
            SwapNormal.events['RemoveLiquidity(address,uint256[],uint256)'].topic,
            SwapNormal.events['RemoveLiquidityImbalance(address,uint256[],uint256[],uint256,uint256)'].topic,
            SwapNormal.events['RemoveLiquidityOne(address,uint256,uint256,uint256,uint256)'].topic,
            SwapNormal.events['TokenSwap(address,uint256,uint256,uint128,uint128)'].topic,
        ],
    ],
    range: { from: 1501293 },
})
// Avault4Pool
processor.addEvmLog(AVAULT_SWAP, {
    filter: [
        [
            SwapNormal.events['NewAdminFee(uint256)'].topic,
            SwapNormal.events['NewSwapFee(uint256)'].topic,
            SwapNormal.events['NewWithdrawFee(uint256)'].topic,
            SwapNormal.events['RampA(uint256,uint256,uint256,uint256)'].topic,
            SwapNormal.events['StopRampA(uint256,uint256)'].topic,
            SwapNormal.events['AddLiquidity(address,uint256[],uint256[],uint256,uint256)'].topic,
            SwapNormal.events['RemoveLiquidity(address,uint256[],uint256)'].topic,
            SwapNormal.events['RemoveLiquidityImbalance(address,uint256[],uint256[],uint256,uint256)'].topic,
            SwapNormal.events['RemoveLiquidityOne(address,uint256,uint256,uint256,uint256)'].topic,
            SwapNormal.events['TokenSwap(address,uint256,uint256,uint128,uint128)'].topic,
        ],
    ],
    range: { from: 1642199 },
})
// oUSDmetapool
processor.addEvmLog(OUSD_META_SWAP, {
    filter: [
        [
            MetaSwap.events['NewAdminFee(uint256)'].topic,
            MetaSwap.events['NewSwapFee(uint256)'].topic,
            MetaSwap.events['NewWithdrawFee(uint256)'].topic,
            MetaSwap.events['RampA(uint256,uint256,uint256,uint256)'].topic,
            MetaSwap.events['StopRampA(uint256,uint256)'].topic,
            MetaSwap.events['AddLiquidity(address,uint256[],uint256[],uint256,uint256)'].topic,
            MetaSwap.events['RemoveLiquidity(address,uint256[],uint256)'].topic,
            MetaSwap.events['RemoveLiquidityImbalance(address,uint256[],uint256[],uint256,uint256)'].topic,
            MetaSwap.events['RemoveLiquidityOne(address,uint256,uint256,uint256,uint256)'].topic,
            MetaSwap.events['TokenSwap(address,uint256,uint256,uint128,uint128)'].topic,
        ],
    ],
    range: { from: 908500 },
})
// BAImetapool
processor.addEvmLog(BAI_META_SWAP, {
    filter: [
        [
            MetaSwap.events['NewAdminFee(uint256)'].topic,
            MetaSwap.events['NewSwapFee(uint256)'].topic,
            MetaSwap.events['NewWithdrawFee(uint256)'].topic,
            MetaSwap.events['RampA(uint256,uint256,uint256,uint256)'].topic,
            MetaSwap.events['StopRampA(uint256,uint256)'].topic,
            MetaSwap.events['AddLiquidity(address,uint256[],uint256[],uint256,uint256)'].topic,
            MetaSwap.events['RemoveLiquidity(address,uint256[],uint256)'].topic,
            MetaSwap.events['RemoveLiquidityImbalance(address,uint256[],uint256[],uint256,uint256)'].topic,
            MetaSwap.events['RemoveLiquidityOne(address,uint256,uint256,uint256,uint256)'].topic,
            MetaSwap.events['TokenSwap(address,uint256,uint256,uint128,uint128)'].topic,
        ],
    ],
    range: { from: 914000 },
})
// VotingEscrow
processor.addEvmLog(VE_TOKEN_ADDRESS, {
    filter: [[VotingEscrow.events['Deposit(address,uint256,uint256,int128,uint256)'].topic]],
    range: { from: 815000 },
})
// JPYC Metapool
processor.addEvmLog(JPYC_META_DEPOSIT, {
    filter: [
        [
            XSwapDeposit.events['TokenExchange(address,uint256,uint256,uint256,uint256,uint256)'].topic,
            XSwapDeposit.events['AddLiquidity(address,uint256[],uint256,uint256,uint256)'].topic,
            XSwapDeposit.events['RemoveLiquidity(address,uint256[2],uint256,uint256)'].topic,
            XSwapDeposit.events['RemoveLiquidityOne(address,uint256,uint256,uint256,uint256)'].topic,
        ],
    ],
    range: { from: 1099458 },
})
processor.addEvmLog(WBTC_META_DEPOSIT, {
    filter: [
        [
            XSwapDeposit.events['TokenExchange(address,uint256,uint256,uint256,uint256,uint256)'].topic,
            XSwapDeposit.events['AddLiquidity(address,uint256[],uint256,uint256,uint256)'].topic,
            XSwapDeposit.events['RemoveLiquidity(address,uint256[2],uint256,uint256)'].topic,
            XSwapDeposit.events['RemoveLiquidityOne(address,uint256,uint256,uint256,uint256)'].topic,
        ],
    ],
    range: { from: 1138805 },
})
processor.addEvmLog(WETH_META_DEPOSIT, {
    filter: [
        [
            XSwapDeposit.events['TokenExchange(address,uint256,uint256,uint256,uint256,uint256)'].topic,
            XSwapDeposit.events['AddLiquidity(address,uint256[],uint256,uint256,uint256)'].topic,
            XSwapDeposit.events['RemoveLiquidity(address,uint256[2],uint256,uint256)'].topic,
            XSwapDeposit.events['RemoveLiquidityOne(address,uint256,uint256,uint256,uint256)'].topic,
        ],
    ],
    range: { from: 1138820 },
})
processor.addEvmLog(WBNB_META_DEPOSIT, {
    filter: [
        [
            XSwapDeposit.events['TokenExchange(address,uint256,uint256,uint256,uint256,uint256)'].topic,
            XSwapDeposit.events['AddLiquidity(address,uint256[],uint256,uint256,uint256)'].topic,
            XSwapDeposit.events['RemoveLiquidity(address,uint256[2],uint256,uint256)'].topic,
            XSwapDeposit.events['RemoveLiquidityOne(address,uint256,uint256,uint256,uint256)'].topic,
        ],
    ],
    range: { from: 1138838 },
})

processor.run(database, async (ctx) => {
    for (const block of ctx.blocks) {
        for (const item of block.items as unknown as Array<BatchBlock<Item> & { name: string; event: any }>) {
            // console.log(item)
            if (item.name === 'EVM.Log') {
                const evmCtx = {
                    ...ctx,
                    block: block.header,
                    event: item.event,
                }

                // const price = await getTokenPrice(evmCtx, '0xBB1290c1829007F440C771b37718FAbf309cd527', 1000n)
                // console.log({ price: price.toBigInt() })

                const topic = item.event.args.topics[0]
                // blockHeight - pool - event
                const measureKey = `${block.header.height}-${item.event.args.address.substr(-6)}-${topic.substr(-6)}`
                console.time(measureKey)
                switch (item.event.args.address) {
                    case SRS4_SWAP:
                    case LAY4_SWAP:
                    case NASTR_SWAP:
                    case AVAULT_SWAP:
                        switch (topic) {
                            case SwapNormal.events['NewAdminFee(uint256)'].topic:
                                await SwapNormalHandlers.handleNewAdminFee(evmCtx)
                                break
                            case SwapNormal.events['NewSwapFee(uint256)'].topic:
                                await SwapNormalHandlers.handleNewSwapFee(evmCtx)
                                break
                            case SwapNormal.events['NewWithdrawFee(uint256)'].topic:
                                await SwapNormalHandlers.handleNewWithdrawFee(evmCtx)
                                break
                            case SwapNormal.events['RampA(uint256,uint256,uint256,uint256)'].topic:
                                await SwapNormalHandlers.handleRampA(evmCtx)
                                break
                            case SwapNormal.events['StopRampA(uint256,uint256)'].topic:
                                await SwapNormalHandlers.handleStopRampA(evmCtx)
                                break
                            case SwapNormal.events['AddLiquidity(address,uint256[],uint256[],uint256,uint256)'].topic:
                                await SwapNormalHandlers.handleAddLiquidity(evmCtx)
                                break
                            case SwapNormal.events['RemoveLiquidity(address,uint256[],uint256)'].topic:
                                await SwapNormalHandlers.handleRemoveLiquidity(evmCtx)
                                break
                            case SwapNormal.events[
                                'RemoveLiquidityImbalance(address,uint256[],uint256[],uint256,uint256)'
                            ].topic:
                                await SwapNormalHandlers.handleRemoveLiquidityImbalance(evmCtx)
                                break
                            case SwapNormal.events['RemoveLiquidityOne(address,uint256,uint256,uint256,uint256)'].topic:
                                await SwapNormalHandlers.handleRemoveLiquidityOne(evmCtx)
                                break
                            case SwapNormal.events['TokenSwap(address,uint256,uint256,uint128,uint128)'].topic:
                                await SwapNormalHandlers.handleTokenSwap(evmCtx)
                                break
                        }
                        break
                    case OUSD_META_SWAP:
                    case BAI_META_SWAP:
                        switch (item.event.args.topics[0]) {
                            case MetaSwap.events['NewAdminFee(uint256)'].topic:
                                await MetaSwapHandlers.handleNewAdminFee(evmCtx)
                                break
                            case MetaSwap.events['NewSwapFee(uint256)'].topic:
                                await MetaSwapHandlers.handleNewSwapFee(evmCtx)
                                break
                            case MetaSwap.events['RampA(uint256,uint256,uint256,uint256)'].topic:
                                await MetaSwapHandlers.handleRampA(evmCtx)
                                break
                            case MetaSwap.events['StopRampA(uint256,uint256)'].topic:
                                await MetaSwapHandlers.handleStopRampA(evmCtx)
                                break
                            case MetaSwap.events['AddLiquidity(address,uint256[],uint256[],uint256,uint256)'].topic:
                                await MetaSwapHandlers.handleAddLiquidity(evmCtx)
                                break
                            case MetaSwap.events['RemoveLiquidity(address,uint256[],uint256)'].topic:
                                await MetaSwapHandlers.handleRemoveLiquidity(evmCtx)
                                break
                            case MetaSwap.events[
                                'RemoveLiquidityImbalance(address,uint256[],uint256[],uint256,uint256)'
                            ].topic:
                                await MetaSwapHandlers.handleRemoveLiquidityImbalance(evmCtx)
                                break
                            case MetaSwap.events['RemoveLiquidityOne(address,uint256,uint256,uint256,uint256)'].topic:
                                await MetaSwapHandlers.handleRemoveLiquidityOne(evmCtx)
                                break
                            case MetaSwap.events['TokenSwap(address,uint256,uint256,uint128,uint128)'].topic:
                                await MetaSwapHandlers.handleTokenSwap(evmCtx)
                                break
                        }
                        break
                    case VE_TOKEN_ADDRESS:
                        switch (item.event.args.topics[0]) {
                            case VotingEscrow.events['Deposit(address,uint256,uint256,int128,uint256)'].topic:
                                await VotingEscrowHandlers.handleDeposit(evmCtx)
                                await VotingEscrowHandlers.updateVeHolder(evmCtx)
                                break
                        }
                        break
                    case JPYC_META_DEPOSIT:
                    case WBTC_META_DEPOSIT:
                    case WETH_META_DEPOSIT:
                    case WBNB_META_DEPOSIT:
                        switch (item.event.args.topics[0]) {
                            case XSwapDeposit.events['AddLiquidity(address,uint256[],uint256,uint256,uint256)'].topic:
                                await XSwapDepositHandlers.handleAddLiquidity(evmCtx, {
                                    metaTokenAddress: POOL_ADDRESSES[item.event.args.address],
                                })
                                break
                            case XSwapDeposit.events['RemoveLiquidity(address,uint256[2],uint256,uint256)'].topic:
                                await XSwapDepositHandlers.handleRemoveLiquidity(evmCtx, {
                                    metaTokenAddress: POOL_ADDRESSES[item.event.args.address],
                                })
                                break
                            case XSwapDeposit.events['RemoveLiquidityOne(address,uint256,uint256,uint256,uint256)']
                                .topic:
                                await XSwapDepositHandlers.handleRemoveLiquidityOne(evmCtx, {
                                    metaTokenAddress: POOL_ADDRESSES[item.event.args.address],
                                })
                                break
                            case XSwapDeposit.events['TokenExchange(address,uint256,uint256,uint256,uint256,uint256)']
                                .topic:
                                await XSwapDepositHandlers.handleTokenSwap(evmCtx, {
                                    metaTokenAddress: POOL_ADDRESSES[item.event.args.address],
                                })
                                break
                        }
                        break
                }
                console.timeEnd(measureKey)
            }
        }
    }
})
