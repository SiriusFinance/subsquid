import { lookupArchive } from '@subsquid/archive-registry'
import { Store, TypeormDatabase } from '@subsquid/typeorm-store'
import {
    BatchContext,
    BatchProcessorItem,
    EvmLogEvent,
    SubstrateBatchProcessor,
    SubstrateBlock,
    SubstrateProcessor,
} from '@subsquid/substrate-processor'
import { In } from 'typeorm'
import { ethers } from 'ethers'
import * as SwapNormal from './abi/SwapNormal'
import * as MetaSwap from './abi/SwapNormal'
import * as VotingEscrow from './abi/VotingEscrow'
import * as XSwapDeposit from './abi/XSwapDeposit'
import * as MetaSwapHandlers from './mappings/metaSwap'
import * as SwapNormalHandlers from './mappings/swapNormal'
import * as VotingEscrowHandlers from './mappings/votingEscrow'
import * as XSwapDepositHandlers from './mappings/xSwapDeposit'

const SRS4_SWAP = '0x417E9d065ee22DFB7CC6C63C403600E27627F333'
const LAY4_SWAP = '0x0fB8C4eB33A30eBb01588e3110968430E3E69D58'
const NASTR_SWAP = '0xEEa640c27620D7C448AD655B6e3FB94853AC01e3'
const AVAULT_SWAP = '0xD8Bc543273B0E19eed34a295614963720c89f9e4'
const BAI_META_SWAP = '0x290c7577D209c2d8DB06F377af31318cE31938fB'
const OUSD_META_SWAP = '0xD18AbE9bcedeb5A9a65439e604b0BE8db0bdB176'
const JPYC_META_DEPOSIT = '0x3cd1Fa4EeeFdf6c30E66c66A474e8E4dd509f54c'
const WBTC_META_DEPOSIT = '0xD25Cf814EeE54840A08Db8dfAbFE445B1DE37f0f'
const WETH_META_DEPOSIT = '0x2d5Da7c463B3E8f4CF1AF08a1aA0a5DB9BB644F7'
const WBNB_META_DEPOSIT = '0xC9d4f937Fa8e0193b46817a41435a262867ff090'
const VE_TOKEN_ADDRESS = '0xc9D383f1e6E5270D77ad8e198729e237b60b6397'

// for pkex
import * as PoolsABI from './abi/Pools'
import * as PoolsTierABI from './abi/PoolsTier'
import * as FarmsABI from './abi/Farms'
import * as pkexStake from './mappings/pkexStake'
// pkex pools
const PKEX_PKEX_DEPOSIT = '0xC8f9d27B4e5E9c956c7344C87D2eF05381D89Fc9'
const PKEX_PKEX2_DEPOSIT = '0x81e92630B409Fc1A593853B1f35115C7d7E6F0bc'
// pkex farms
const ASTR_PKEX_STAKE = '0x9F519083A069Cee2585cB4931C77C6EA21c3517E'
const ASTR_USDC_STAKE = '0x228a56F238F5441B1469B3bc6F64ddd362a3a0AF'
const USDC_USDT_STAKE = '0x367545a43B89A81d1a3816F13505cC7bB840c1f6'
const PKEX_DOT_STAKE = '0x6B44EF63fe77C56478a191bC1673E24e0408a780'

const database = new TypeormDatabase()
const processor = new SubstrateBatchProcessor().setBatchSize(100).setDataSource({
    archive: lookupArchive('astar', { release: 'FireSquid' }),
    chain: 'wss://rpc.pinknode.io/astar/6e3fa591-e24f-483a-95fa-1d773f7f2be3',
})

// Sirius4Pool
processor.addEvmLog(SRS4_SWAP.toLowerCase(), {
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
processor.addEvmLog(LAY4_SWAP.toLowerCase(), {
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
processor.addEvmLog(NASTR_SWAP.toLowerCase(), {
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
processor.addEvmLog(AVAULT_SWAP.toLowerCase(), {
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
processor.addEvmLog(OUSD_META_SWAP.toLowerCase(), {
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
processor.addEvmLog(BAI_META_SWAP.toLowerCase(), {
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
processor.addEvmLog(VE_TOKEN_ADDRESS.toLowerCase(), {
    filter: [[VotingEscrow.events['Deposit(address,uint256,uint256,int128,uint256)'].topic]],
    range: { from: 815000 },
})
// JPYC Metapool
processor.addEvmLog(JPYC_META_DEPOSIT.toLowerCase(), {
    filter: [[XSwapDeposit.events['TokenExchange(address,uint256,uint256,uint256,uint256,uint256)'].topic]],
    range: { from: 1099458 },
})
processor.addEvmLog(WBTC_META_DEPOSIT.toLowerCase(), {
    filter: [[XSwapDeposit.events['TokenExchange(address,uint256,uint256,uint256,uint256,uint256)'].topic]],
    range: { from: 1138805 },
})
processor.addEvmLog(WETH_META_DEPOSIT.toLowerCase(), {
    filter: [[XSwapDeposit.events['TokenExchange(address,uint256,uint256,uint256,uint256,uint256)'].topic]],
    range: { from: 1138820 },
})
processor.addEvmLog(WBNB_META_DEPOSIT.toLowerCase(), {
    filter: [[XSwapDeposit.events['TokenExchange(address,uint256,uint256,uint256,uint256,uint256)'].topic]],
    range: { from: 1138838 },
})
processor.addEvmLog(PKEX_PKEX_DEPOSIT.toLowerCase(), {
    filter: [[PoolsABI.events['Stake(address,uint256)'].topic]],
    range: { from: 251038 },
})
processor.addEvmLog(PKEX_PKEX2_DEPOSIT.toLowerCase(), {
    filter: [[PoolsTierABI.events['Stake(address,uint256)'].topic]],
    range: { from: 385556 },
})
processor.addEvmLog(ASTR_PKEX_STAKE.toLowerCase(), {
    filter: [[FarmsABI.events['Staked(address,uint256,uint256,uint256)'].topic]],
    range: { from: 250937 },
})
processor.addEvmLog(ASTR_USDC_STAKE.toLowerCase(), {
    filter: [[FarmsABI.events['Staked(address,uint256,uint256,uint256)'].topic]],
    range: { from: 250947 },
})
processor
    .addEvmLog(USDC_USDT_STAKE.toLowerCase(), {
        filter: [[FarmsABI.events['Staked(address,uint256,uint256,uint256)'].topic]],
        range: { from: 250976 },
    })
    .addEvmLog(PKEX_DOT_STAKE.toLowerCase(), {
        filter: [[FarmsABI.events['Staked(address,uint256,uint256,uint256)'].topic]],
        range: { from: 1155918 },
    })

processor.run(database, async (ctx: any) => {
    for (const block of ctx.blocks) {
        for (const item of block.items as any) {
            console.log(item)
            if (item.name === 'EVM.Log') {
                switch (item.event.args.address) {
                    case SRS4_SWAP.toLowerCase():
                    case LAY4_SWAP.toLowerCase():
                    case NASTR_SWAP.toLowerCase():
                    case AVAULT_SWAP.toLowerCase():
                        switch (item.event.args.topics[0]) {
                            case SwapNormal.events['NewAdminFee(uint256)'].topic:
                                await SwapNormalHandlers.handleNewAdminFee({
                                    ...ctx,
                                    block: block.header,
                                    event: item.event,
                                })
                                break
                            case SwapNormal.events['NewSwapFee(uint256)'].topic:
                                await SwapNormalHandlers.handleNewSwapFee({
                                    ...ctx,
                                    block: block.header,
                                    event: item.event,
                                })
                                break
                            case SwapNormal.events['NewWithdrawFee(uint256)'].topic:
                                await SwapNormalHandlers.handleNewWithdrawFee({
                                    ...ctx,
                                    block: block.header,
                                    event: item.event,
                                })
                                break
                            case SwapNormal.events['RampA(uint256,uint256,uint256,uint256)'].topic:
                                await SwapNormalHandlers.handleRampA({
                                    ...ctx,
                                    block: block.header,
                                    event: item.event,
                                })
                                break
                            case SwapNormal.events['StopRampA(uint256,uint256)'].topic:
                                await SwapNormalHandlers.handleStopRampA({
                                    ...ctx,
                                    block: block.header,
                                    event: item.event,
                                })
                                break
                            case SwapNormal.events['AddLiquidity(address,uint256[],uint256[],uint256,uint256)'].topic:
                                await SwapNormalHandlers.handleAddLiquidity({
                                    ...ctx,
                                    block: block.header,
                                    event: item.event,
                                })
                                break
                            case SwapNormal.events['RemoveLiquidity(address,uint256[],uint256)'].topic:
                                await SwapNormalHandlers.handleRemoveLiquidity({
                                    ...ctx,
                                    block: block.header,
                                    event: item.event,
                                })
                                break
                            case SwapNormal.events[
                                'RemoveLiquidityImbalance(address,uint256[],uint256[],uint256,uint256)'
                            ].topic:
                                await SwapNormalHandlers.handleRemoveLiquidityImbalance({
                                    ...ctx,
                                    block: block.header,
                                    event: item.event,
                                })
                                break
                            case SwapNormal.events['RemoveLiquidityOne(address,uint256,uint256,uint256,uint256)'].topic:
                                await SwapNormalHandlers.handleRemoveLiquidityOne({
                                    ...ctx,
                                    block: block.header,
                                    event: item.event,
                                })
                                break
                            case SwapNormal.events['TokenSwap(address,uint256,uint256,uint128,uint128)'].topic:
                                await SwapNormalHandlers.handleTokenSwap({
                                    ...ctx,
                                    block: block.header,
                                    event: item.event,
                                })
                                break
                        }
                        break
                    case OUSD_META_SWAP.toLowerCase():
                    case BAI_META_SWAP.toLowerCase():
                        switch (item.event.args.topics[0]) {
                            case MetaSwap.events['NewAdminFee(uint256)'].topic:
                                await MetaSwapHandlers.handleNewAdminFee({
                                    ...ctx,
                                    block: block.header,
                                    event: item.event,
                                })
                                break
                            case MetaSwap.events['NewSwapFee(uint256)'].topic:
                                await MetaSwapHandlers.handleNewSwapFee({
                                    ...ctx,
                                    block: block.header,
                                    event: item.event,
                                })
                                break
                            case MetaSwap.events['RampA(uint256,uint256,uint256,uint256)'].topic:
                                await MetaSwapHandlers.handleRampA({
                                    ...ctx,
                                    block: block.header,
                                    event: item.event,
                                })
                                break
                            case MetaSwap.events['StopRampA(uint256,uint256)'].topic:
                                await MetaSwapHandlers.handleStopRampA({
                                    ...ctx,
                                    block: block.header,
                                    event: item.event,
                                })
                                break
                            case MetaSwap.events['AddLiquidity(address,uint256[],uint256[],uint256,uint256)'].topic:
                                await MetaSwapHandlers.handleAddLiquidity({
                                    ...ctx,
                                    block: block.header,
                                    event: item.event,
                                })
                                break
                            case MetaSwap.events['RemoveLiquidity(address,uint256[],uint256)'].topic:
                                await MetaSwapHandlers.handleRemoveLiquidity({
                                    ...ctx,
                                    block: block.header,
                                    event: item.event,
                                })
                                break
                            case MetaSwap.events[
                                'RemoveLiquidityImbalance(address,uint256[],uint256[],uint256,uint256)'
                            ].topic:
                                await MetaSwapHandlers.handleRemoveLiquidityImbalance({
                                    ...ctx,
                                    block: block.header,
                                    event: item.event,
                                })
                                break
                            case MetaSwap.events['RemoveLiquidityOne(address,uint256,uint256,uint256,uint256)'].topic:
                                await MetaSwapHandlers.handleRemoveLiquidityOne({
                                    ...ctx,
                                    block: block.header,
                                    event: item.event,
                                })
                                break
                            case MetaSwap.events['TokenSwap(address,uint256,uint256,uint128,uint128)'].topic:
                                await MetaSwapHandlers.handleTokenSwap({
                                    ...ctx,
                                    block: block.header,
                                    event: item.event,
                                })
                                break
                        }
                        break
                    case VE_TOKEN_ADDRESS.toLowerCase():
                        switch (item.event.args.topics[0]) {
                            case VotingEscrow.events['Deposit(address,uint256,uint256,int128,uint256)'].topic:
                                await Promise.all([
                                    VotingEscrowHandlers.handleDeposit({
                                        ...ctx,
                                        block: block.header,
                                        event: item.event,
                                    }),
                                    VotingEscrowHandlers.updateVeHolder({
                                        ...ctx,
                                        block: block.header,
                                        event: item.event,
                                    }),
                                ])
                                break
                        }
                        break
                    case JPYC_META_DEPOSIT.toLowerCase():
                    case WBTC_META_DEPOSIT.toLowerCase():
                    case WETH_META_DEPOSIT.toLowerCase():
                    case WBNB_META_DEPOSIT.toLowerCase():
                        switch (item.event.args.topics[0]) {
                            case XSwapDeposit.events['TokenExchange(address,uint256,uint256,uint256,uint256,uint256)']
                                .topic:
                                await XSwapDepositHandlers.handleTokenSwap({
                                    ...ctx,
                                    block: block.header,
                                    event: item.event,
                                })
                                break
                        }
                        break
                    case PKEX_PKEX_DEPOSIT.toLowerCase():
                        switch (item.event.args.topics[0]) {
                            case PoolsABI.events['Stake(address,uint256)'].topic:
                                await pkexStake.handlePoolDeposit({
                                    ...ctx,
                                    block: block.header,
                                    event: item.event,
                                })
                                break
                        }
                        break
                    case PKEX_PKEX2_DEPOSIT.toLowerCase():
                        switch (item.event.args.topics[0]) {
                            case PoolsTierABI.events['Stake(address,uint256)'].topic:
                                await pkexStake.handlePoolTierDeposit({
                                    ...ctx,
                                    block: block.header,
                                    event: item.event,
                                })
                                break
                        }
                        break
                    case ASTR_PKEX_STAKE.toLowerCase():
                    case ASTR_USDC_STAKE.toLowerCase():
                    case USDC_USDT_STAKE.toLowerCase():
                    case PKEX_DOT_STAKE.toLowerCase():
                        switch (item.event.args.topics[0]) {
                            case FarmsABI.events['Staked(address,uint256,uint256,uint256)'].topic:
                                await pkexStake.handleFarmStake({
                                    ...ctx,
                                    block: block.header,
                                    event: item.event,
                                })
                                break
                        }
                        break
                }
            }
        }
    }
})
