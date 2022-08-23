import * as ethers from "ethers";
import assert from "assert";

export const abi = new ethers.utils.Interface(getJsonAbi());

export interface Claim0Event {
  who: string;
  amountClaimed: ethers.BigNumber;
}

export interface EmergencyWithdraw0Event {
  who: string;
  amountWithdrawn: ethers.BigNumber;
}

export interface Paused0Event {
  account: string;
}

export interface Recovered0Event {
  tokenAddress: string;
  to: string;
  amount: ethers.BigNumber;
}

export interface SetAdmin0Event {
  newAdmin: string;
}

export interface SetAuth0Event {
  account: string;
  authState: boolean;
}

export interface Stake0Event {
  who: string;
  amountStaked: ethers.BigNumber;
}

export interface Unpaused0Event {
  account: string;
}

export interface Unstake0Event {
  who: string;
  amountUnstaked: ethers.BigNumber;
}

export interface EvmEvent {
  data: string;
  topics: string[];
}

export const events = {
  "Claim(address,uint256)":  {
    topic: abi.getEventTopic("Claim(address,uint256)"),
    decode(data: EvmEvent): Claim0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("Claim(address,uint256)"),
        data.data || "",
        data.topics
      );
      return  {
        who: result[0],
        amountClaimed: result[1],
      }
    }
  }
  ,
  "EmergencyWithdraw(address,uint256)":  {
    topic: abi.getEventTopic("EmergencyWithdraw(address,uint256)"),
    decode(data: EvmEvent): EmergencyWithdraw0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("EmergencyWithdraw(address,uint256)"),
        data.data || "",
        data.topics
      );
      return  {
        who: result[0],
        amountWithdrawn: result[1],
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
  "Stake(address,uint256)":  {
    topic: abi.getEventTopic("Stake(address,uint256)"),
    decode(data: EvmEvent): Stake0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("Stake(address,uint256)"),
        data.data || "",
        data.topics
      );
      return  {
        who: result[0],
        amountStaked: result[1],
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
  "Unstake(address,uint256)":  {
    topic: abi.getEventTopic("Unstake(address,uint256)"),
    decode(data: EvmEvent): Unstake0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("Unstake(address,uint256)"),
        data.data || "",
        data.topics
      );
      return  {
        who: result[0],
        amountUnstaked: result[1],
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

  async MIN_AMOUNT_TO_COUNT(): Promise<ethers.BigNumber> {
    const result = await this.call("MIN_AMOUNT_TO_COUNT", [])
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

  async claimableReward(null: string): Promise<ethers.BigNumber> {
    const result = await this.call("claimableReward", [null])
    return result[0]
  }

  async cumulativeRewardPerToken(): Promise<ethers.BigNumber> {
    const result = await this.call("cumulativeRewardPerToken", [])
    return result[0]
  }

  async earned(account: string): Promise<ethers.BigNumber> {
    const result = await this.call("earned", [account])
    return result[0]
  }

  async minStakingAmount(): Promise<ethers.BigNumber> {
    const result = await this.call("minStakingAmount", [])
    return result[0]
  }

  async myStakeInfo(): Promise<{_staked: ethers.BigNumber,_earned: ethers.BigNumber,_stakingTime: ethers.BigNumber,_unStakeTime: ethers.BigNumber}> {
    const result = await this.call("myStakeInfo", [])
    return  {
      _staked: result[0],
      _earned: result[1],
      _stakingTime: result[2],
      _unStakeTime: result[3],
    }
  }

  async name(): Promise<string> {
    const result = await this.call("name", [])
    return result[0]
  }

  async paused(): Promise<boolean> {
    const result = await this.call("paused", [])
    return result[0]
  }

  async pkexDistributor(): Promise<string> {
    const result = await this.call("pkexDistributor", [])
    return result[0]
  }

  async pkexToken(): Promise<string> {
    const result = await this.call("pkexToken", [])
    return result[0]
  }

  async previousCumulatedRewardPerToken(null: string): Promise<ethers.BigNumber> {
    const result = await this.call("previousCumulatedRewardPerToken", [null])
    return result[0]
  }

  async staked(null: string): Promise<ethers.BigNumber> {
    const result = await this.call("staked", [null])
    return result[0]
  }

  async stakingTime(null: string): Promise<ethers.BigNumber> {
    const result = await this.call("stakingTime", [null])
    return result[0]
  }

  async stakingToken(): Promise<string> {
    const result = await this.call("stakingToken", [])
    return result[0]
  }

  async totalClaimedRewards(): Promise<ethers.BigNumber> {
    const result = await this.call("totalClaimedRewards", [])
    return result[0]
  }

  async totalFarmRewards(): Promise<ethers.BigNumber> {
    const result = await this.call("totalFarmRewards", [])
    return result[0]
  }

  async totalStaked(): Promise<ethers.BigNumber> {
    const result = await this.call("totalStaked", [])
    return result[0]
  }

  async unlockClaimTime(): Promise<ethers.BigNumber> {
    const result = await this.call("unlockClaimTime", [])
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

  async userStakeInfo(_user: string): Promise<{_staked: ethers.BigNumber,_earned: ethers.BigNumber,_stakingTime: ethers.BigNumber,_unStakeTime: ethers.BigNumber}> {
    const result = await this.call("userStakeInfo", [_user])
    return  {
      _staked: result[0],
      _earned: result[1],
      _stakingTime: result[2],
      _unStakeTime: result[3],
    }
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
          "name": "who",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amountClaimed",
          "type": "uint256"
        }
      ],
      "name": "Claim",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "who",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amountWithdrawn",
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
          "name": "who",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amountStaked",
          "type": "uint256"
        }
      ],
      "name": "Stake",
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
          "indexed": true,
          "internalType": "address",
          "name": "who",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amountUnstaked",
          "type": "uint256"
        }
      ],
      "name": "Unstake",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "MIN_AMOUNT_TO_COUNT",
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
          "internalType": "contract IERC20Upgradeable",
          "name": "_stakingToken",
          "type": "address"
        },
        {
          "internalType": "contract IPkexDistributor",
          "name": "_pkexDistributor",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "admin",
          "type": "address"
        }
      ],
      "name": "__Pools_init",
      "outputs": [],
      "stateMutability": "nonpayable",
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
          "name": "",
          "type": "address"
        }
      ],
      "name": "claimableReward",
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
      "inputs": [],
      "name": "cumulativeRewardPerToken",
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
          "name": "account",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenAmount",
          "type": "uint256"
        }
      ],
      "name": "easySave",
      "outputs": [],
      "stateMutability": "nonpayable",
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "exit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "exitAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "minStakingAmount",
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
          "name": "_stakingTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_unStakeTime",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
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
      "name": "pkexDistributor",
      "outputs": [
        {
          "internalType": "contract IPkexDistributor",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pkexToken",
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
          "name": "",
          "type": "address"
        }
      ],
      "name": "previousCumulatedRewardPerToken",
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
          "name": "tokenAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenAmount",
          "type": "uint256"
        }
      ],
      "name": "recoverERC20",
      "outputs": [],
      "stateMutability": "nonpayable",
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
          "internalType": "address",
          "name": "_newDistributor",
          "type": "address"
        }
      ],
      "name": "setDistributorTo",
      "outputs": [],
      "stateMutability": "nonpayable",
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
      "name": "setMinStakingAmount",
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
      "name": "setUnlockClaimTime",
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
      "name": "setUnstakingPeriod",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "stake",
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
      "name": "staked",
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
      "name": "stakingTime",
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
      "name": "totalClaimedRewards",
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
      "name": "totalFarmRewards",
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
      "name": "totalStaked",
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
      "name": "unlockClaimTime",
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
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "unstake",
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
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "userStakeInfo",
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
          "name": "_stakingTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_unStakeTime",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]
}
