import * as SwapNormal from './abi/SwapNormal'
import * as MetaSwap from './abi/SwapNormal'
import * as VotingEscrow from './abi/VotingEscrow'
import * as XSwapDeposit from './abi/XSwapDeposit'

const pools = {
    SwapNormal,
    MetaSwap,
    VotingEscrow,
    XSwapDeposit,
}

Object.keys(pools).forEach((p) => {
    console.log('==========================================')
    console.log(p)
    console.log('==========================================')

    const events = (pools as any)[p].events

    Object.keys(events).forEach((k) => {
        console.log(`${(events as any)[k].topic.substr(-6)} => ${k.split('(')[0]}`)
    })
    console.log()
})
