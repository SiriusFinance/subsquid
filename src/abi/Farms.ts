import * as ethers from "ethers";
import assert from "assert";

export const abi = new ethers.utils.Interface(getJsonAbi());

export interface EmergencyWithdraw0Event {
  user: string;
  amount: ethers.BigNumber;
}

export interface Paused0Event {
  account: string;
}

export interface Recovered0Event {
  tokenAddress: string;
  to: string;
  amount: ethers.BigNumber;
}

export interface RewardAdded0Event {
  reward: ethers.BigNumber;
  poolId: ethers.BigNumber;
  sender: string;
}

export interface RewardPaid0Event {
  user: string;
  reward: ethers.BigNumber;
}

export interface SetAdmin0Event {
  newAdmin: string;
}

export interface SetAuth0Event {
  account: string;
  authState: boolean;
}

export interface Staked0Event {
  user: string;
  amount: ethers.BigNumber;
  poolId: ethers.BigNumber;
  balance: ethers.BigNumber;
}

export interface Unpaused0Event {
  account: string;
}

export interface UnstakePeriodUpdated0Event {
  oldValue: ethers.BigNumber;
  newValue: ethers.BigNumber;
}

export interface Unstaked0Event {
  user: string;
  amount: ethers.BigNumber;
  poolId: ethers.BigNumber;
  balance: ethers.BigNumber;
}

export interface EvmEvent {
  data: string;
  topics: string[];
}

export const events = {
  "EmergencyWithdraw(address,uint256)":  {
    topic: abi.getEventTopic("EmergencyWithdraw(address,uint256)"),
    decode(data: EvmEvent): EmergencyWithdraw0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("EmergencyWithdraw(address,uint256)"),
        data.data || "",
        data.topics
      );
      return  {
        user: result[0],
        amount: result[1],
      }
    }
  }
  ,
  "Paused(address)":  {
    topic: abi.getEventTopic("Paused(address)"),
    decode(data: EvmEvent): Paused0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("Paused(address)"),
        data.data || "",
        data.topics
      );
      return  {
        account: result[0],
      }
    }
  }
  ,
  "Recovered(address,address,uint256)":  {
    topic: abi.getEventTopic("Recovered(address,address,uint256)"),
    decode(data: EvmEvent): Recovered0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("Recovered(address,address,uint256)"),
        data.data || "",
        data.topics
      );
      return  {
        tokenAddress: result[0],
        to: result[1],
        amount: result[2],
      }
    }
  }
  ,
  "RewardAdded(uint256,uint256,address)":  {
    topic: abi.getEventTopic("RewardAdded(uint256,uint256,address)"),
    decode(data: EvmEvent): RewardAdded0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("RewardAdded(uint256,uint256,address)"),
        data.data || "",
        data.topics
      );
      return  {
        reward: result[0],
        poolId: result[1],
        sender: result[2],
      }
    }
  }
  ,
  "RewardPaid(address,uint256)":  {
    topic: abi.getEventTopic("RewardPaid(address,uint256)"),
    decode(data: EvmEvent): RewardPaid0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("RewardPaid(address,uint256)"),
        data.data || "",
        data.topics
      );
      return  {
        user: result[0],
        reward: result[1],
      }
    }
  }
  ,
  "SetAdmin(address)":  {
    topic: abi.getEventTopic("SetAdmin(address)"),
    decode(data: EvmEvent): SetAdmin0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("SetAdmin(address)"),
        data.data || "",
        data.topics
      );
      return  {
        newAdmin: result[0],
      }
    }
  }
  ,
  "SetAuth(address,bool)":  {
    topic: abi.getEventTopic("SetAuth(address,bool)"),
    decode(data: EvmEvent): SetAuth0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("SetAuth(address,bool)"),
        data.data || "",
        data.topics
      );
      return  {
        account: result[0],
        authState: result[1],
      }
    }
  }
  ,
  "Staked(address,uint256,uint256,uint256)":  {
    topic: abi.getEventTopic("Staked(address,uint256,uint256,uint256)"),
    decode(data: EvmEvent): Staked0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("Staked(address,uint256,uint256,uint256)"),
        data.data || "",
        data.topics
      );
      return  {
        user: result[0],
        amount: result[1],
        poolId: result[2],
        balance: result[3],
      }
    }
  }
  ,
  "Unpaused(address)":  {
    topic: abi.getEventTopic("Unpaused(address)"),
    decode(data: EvmEvent): Unpaused0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("Unpaused(address)"),
        data.data || "",
        data.topics
      );
      return  {
        account: result[0],
      }
    }
  }
  ,
  "UnstakePeriodUpdated(uint256,uint256)":  {
    topic: abi.getEventTopic("UnstakePeriodUpdated(uint256,uint256)"),
    decode(data: EvmEvent): UnstakePeriodUpdated0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("UnstakePeriodUpdated(uint256,uint256)"),
        data.data || "",
        data.topics
      );
      return  {
        oldValue: result[0],
        newValue: result[1],
      }
    }
  }
  ,
  "Unstaked(address,uint256,uint256,uint256)":  {
    topic: abi.getEventTopic("Unstaked(address,uint256,uint256,uint256)"),
    decode(data: EvmEvent): Unstaked0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("Unstaked(address,uint256,uint256,uint256)"),
        data.data || "",
        data.topics
      );
      return  {
        user: result[0],
        amount: result[1],
        poolId: result[2],
        balance: result[3],
      }
    }
  }
  ,
}

interface ChainContext  {
  _chain: Chain
}

interface BlockContext  {
  _chain: Chain
  block: Block
}

interface Block  {
  height: number
}

interface Chain  {
  client:  {
    call: <T=any>(method: string, params?: unknown[]) => Promise<T>
  }
}

export class Contract  {
  private readonly _chain: Chain
  private readonly blockHeight: number
  readonly address: string

  constructor(ctx: BlockContext, address: string)
  constructor(ctx: ChainContext, block: Block, address: string)
  constructor(ctx: BlockContext, blockOrAddress: Block | string, address?: string) {
    this._chain = ctx._chain
    if (typeof blockOrAddress === 'string')  {
      this.blockHeight = ctx.block.height
      this.address = ethers.utils.getAddress(blockOrAddress)
    }
    else  {
      assert(address != null)
      this.blockHeight = blockOrAddress.height
      this.address = ethers.utils.getAddress(address)
    }
  }

  private async call(name: string, args: any[]) : Promise<ReadonlyArray<any>> {
    const fragment = abi.getFunction(name)
    const data = abi.encodeFunctionData(fragment, args)
    const result = await this._chain.client.call('eth_call', [{to: this.address, data}, this.blockHeight])
    return abi.decodeFunctionResult(fragment, result)
  }

  async _balances(null: string): Promise<ethers.BigNumber> {
    const result = await this.call("_balances", [null])
    return result[0]
  }

  async _lastUpdateTime(null: string): Promise<ethers.BigNumber> {
    const result = await this.call("_lastUpdateTime", [null])
    return result[0]
  }

  async _lockedBalances(null: string): Promise<ethers.BigNumber> {
    const result = await this.call("_lockedBalances", [null])
    return result[0]
  }

  async _totalSupply(): Promise<ethers.BigNumber> {
    const result = await this.call("_totalSupply", [])
    return result[0]
  }

  async admin(): Promise<string> {
    const result = await this.call("admin", [])
    return result[0]
  }

  async auth(null: string): Promise<boolean> {
    const result = await this.call("auth", [null])
    return result[0]
  }

  async balanceOf(_account: string): Promise<ethers.BigNumber> {
    const result = await this.call("balanceOf", [_account])
    return result[0]
  }

  async earned(_account: string): Promise<ethers.BigNumber> {
    const result = await this.call("earned", [_account])
    return result[0]
  }

  async getRewardForDuration(): Promise<ethers.BigNumber> {
    const result = await this.call("getRewardForDuration", [])
    return result[0]
  }

  async getTotalRewarded(): Promise<ethers.BigNumber> {
    const result = await this.call("getTotalRewarded", [])
    return result[0]
  }

  async lastTimeRewardApplicable(): Promise<ethers.BigNumber> {
    const result = await this.call("lastTimeRewardApplicable", [])
    return result[0]
  }

  async lastUpdateTime(): Promise<ethers.BigNumber> {
    const result = await this.call("lastUpdateTime", [])
    return result[0]
  }

  async myStakeInfo(): Promise<{_staked: ethers.BigNumber,_earned: ethers.BigNumber,_locked: ethers.BigNumber}> {
    const result = await this.call("myStakeInfo", [])
    return  {
      _staked: result[0],
      _earned: result[1],
      _locked: result[2],
    }
  }

  async paused(): Promise<boolean> {
    const result = await this.call("paused", [])
    return result[0]
  }

  async periodFinish(): Promise<ethers.BigNumber> {
    const result = await this.call("periodFinish", [])
    return result[0]
  }

  async poolId(): Promise<ethers.BigNumber> {
    const result = await this.call("poolId", [])
    return result[0]
  }

  async pools(null: ethers.BigNumber): Promise<{from: ethers.BigNumber,to: ethers.BigNumber,totalStaked: ethers.BigNumber,totalAddresses: ethers.BigNumber,totalRewards: ethers.BigNumber,rewardRate: ethers.BigNumber}> {
    const result = await this.call("pools", [null])
    return  {
      from: result[0],
      to: result[1],
      totalStaked: result[2],
      totalAddresses: result[3],
      totalRewards: result[4],
      rewardRate: result[5],
    }
  }

  async rewardIndex(): Promise<ethers.BigNumber> {
    const result = await this.call("rewardIndex", [])
    return result[0]
  }

  async rewardPerTokenStored(): Promise<ethers.BigNumber> {
    const result = await this.call("rewardPerTokenStored", [])
    return result[0]
  }

  async rewardRate(): Promise<ethers.BigNumber> {
    const result = await this.call("rewardRate", [])
    return result[0]
  }

  async rewards(null: string): Promise<ethers.BigNumber> {
    const result = await this.call("rewards", [null])
    return result[0]
  }

  async rewardsDistribution(): Promise<string> {
    const result = await this.call("rewardsDistribution", [])
    return result[0]
  }

  async rewardsDuration(): Promise<ethers.BigNumber> {
    const result = await this.call("rewardsDuration", [])
    return result[0]
  }

  async rewardsToken(): Promise<string> {
    const result = await this.call("rewardsToken", [])
    return result[0]
  }

  async stakerCount(): Promise<ethers.BigNumber> {
    const result = await this.call("stakerCount", [])
    return result[0]
  }

  async stakingToken(): Promise<string> {
    const result = await this.call("stakingToken", [])
    return result[0]
  }

  async totalSupply(): Promise<ethers.BigNumber> {
    const result = await this.call("totalSupply", [])
    return result[0]
  }

  async unstakeTime(null: string): Promise<ethers.BigNumber> {
    const result = await this.call("unstakeTime", [null])
    return result[0]
  }

  async unstakingPeriod(): Promise<ethers.BigNumber> {
    const result = await this.call("unstakingPeriod", [])
    return result[0]
  }

  async userRewardPerTokenPaid(null: string): Promise<ethers.BigNumber> {
    const result = await this.call("userRewardPerTokenPaid", [null])
    return result[0]
  }
}

function getJsonAbi(): any {
  return [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "EmergencyWithdraw",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "tokenAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Recovered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "reward",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "poolId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RewardAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "reward",
          "type": "uint256"
        }
      ],
      "name": "RewardPaid",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "newAdmin",
          "type": "address"
        }
      ],
      "name": "SetAdmin",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "authState",
          "type": "bool"
        }
      ],
      "name": "SetAuth",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "poolId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "name": "Staked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "oldValue",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newValue",
          "type": "uint256"
        }
      ],
      "name": "UnstakePeriodUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "poolId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "name": "Unstaked",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_admin",
          "type": "address"
        }
      ],
      "name": "__BaseUpgradeable_init",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_rewardsDistribution",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_rewardsToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_stakingToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_rewardsDuration",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_startRound",
          "type": "uint256"
        }
      ],
      "name": "__Farms_init",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "_balances",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "_lastUpdateTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "_lockedBalances",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "_totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "auth",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "claim",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        }
      ],
      "name": "collect",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_account",
          "type": "address"
        }
      ],
      "name": "earned",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "emergencyWithdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getRewardForDuration",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTotalRewarded",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "totalRewarded",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lastTimeRewardApplicable",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lastUpdateTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "myStakeInfo",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "_staked",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_earned",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_locked",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_reward",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_startTime",
          "type": "uint256"
        }
      ],
      "name": "notifyRewardAmount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "periodFinish",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "poolId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "pools",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "from",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "to",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalStaked",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalAddresses",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalRewards",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "rewardRate",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_tokenAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_tokenAmount",
          "type": "uint256"
        }
      ],
      "name": "recoverERC20",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "rewardIndex",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "rewardPerTokenStored",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "rewardRate",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "rewards",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "rewardsDistribution",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "rewardsDuration",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "rewardsToken",
      "outputs": [
        {
          "internalType": "contract IERC20Upgradeable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_admin",
          "type": "address"
        }
      ],
      "name": "setAdmin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_account",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "_authState",
          "type": "bool"
        }
      ],
      "name": "setAuth",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_time",
          "type": "uint256"
        }
      ],
      "name": "setLastUpdateTime",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "_paused",
          "type": "bool"
        }
      ],
      "name": "setPaused",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_time",
          "type": "uint256"
        }
      ],
      "name": "setPeriodFinish",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_period",
          "type": "uint256"
        }
      ],
      "name": "setUnstakePeriod",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_account",
          "type": "uint256"
        }
      ],
      "name": "stake",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "stakerCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "stakingToken",
      "outputs": [
        {
          "internalType": "contract IERC20Upgradeable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "unstake",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unstakeAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "unstakeTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unstakingPeriod",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "userRewardPerTokenPaid",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
}
