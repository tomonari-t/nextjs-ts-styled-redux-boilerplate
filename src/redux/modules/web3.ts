import web3 from 'web3'
import { IStoreState } from '../createStore'
import { actionCreatorFactory } from 'typescript-fsa'

export enum Web3NetWork {
  main = 1,
  ropsten = 3,
  rinkeby = 4,
  kovan = 42,
}

const REQUIRE_NETWORK: { [key: string]: Web3NetWork } = {
  main: Web3NetWork.main,
  rinkeby: Web3NetWork.rinkeby,
}

export enum Web3Status {
  uninitialized,
  walletNotFound,
  walletAvailable,
  walletLocked,
}

const NetworkNameMap = {
  [Web3NetWork.main]: 'Main Ethereum Network',
  [Web3NetWork.kovan]: 'Kovan Test Network',
  [Web3NetWork.rinkeby]: 'Rinkeby Test Network',
  [Web3NetWork.ropsten]: 'Ropsten Test Network',
}

const getNetworkName = (networkId: Web3NetWork) => {
  return NetworkNameMap[networkId]
}

export enum Web3NetWorkStatus {
  collect,
  wrong,
}

const isCollectNerwork = (networkId: number) => {
  return (
    networkId ===
    REQUIRE_NETWORK[process.env.REACT_APP_TARGET_NETWORK as string]
  )
}

const getRequiredNetworkName = () => {
  return getNetworkName(
    REQUIRE_NETWORK[process.env.REACT_APP_TARGET_NETWORK as string],
  )
}

const getHTTPProviderAddress = () => {
  switch (process.env.REACT_APP_TARGET_NETWORK) {
    case 'rinkeby':
      return 'https://rinkeby.infura.io/'
    case 'main':
      return 'https://rinkeby.infura.io/'
    default:
      throw new Error('REACT_APP_TARGET_NETWORK is not collect')
  }
}

/**
 * Action
 */

const WEB3 = 'web3'
const UPDATE_ADDRESS = 'updateAddress'
const UPDATE_NETWORK = 'updateNetwork'
const UPDATE_NETWORK_STATUS = 'updateNetworkStatus'
const UPDATE_STATUS = 'updateStatus'
const UPDATE_METAMASK = 'updateMetamask'
const UPDATE_PRIVACY_MODE_STATUS = 'updateMetamaskPrivacyMode'

/**
 * Action Creator
 */

const actionFactory = actionCreatorFactory(WEB3)
const updateAddress = actionFactory<{ address: string }>(UPDATE_ADDRESS)
const updateNetwork = actionFactory<{ network: Web3NetWork; name: string }>(
  UPDATE_NETWORK,
)
const updateStatus = actionFactory<{ status: Web3Status }>(UPDATE_STATUS)
const updateNetworkStatus = actionFactory<{ status: Web3NetWorkStatus }>(
  UPDATE_NETWORK_STATUS,
)
const updateMetamask = actionFactory<{ isMetamask: boolean }>(UPDATE_METAMASK)
const updatePrivacyModeStatus = actionFactory<{ status: boolean }>(
  UPDATE_PRIVACY_MODE_STATUS,
)

export const enableMetamask = () => async (
  dispatch: Dispatch,
  getState: () => IStoreState,
) => {
  const { isMetamask } = getState().web3
  if (!isMetamask) {
    return
  }

  await (window as any).ethereum
    .enable()
    .then(() => {
      dispatch(updatePrivacyModeStatus({ status: true }))
    })
    .catch((err: Error) => {
      dispatch(updatePrivacyModeStatus({ status: false }))
      throw err
    })
}

export const updateWeb3Status = () => async (
  dispatch: Dispatch,
  getState: () => IMononokeState,
) => {
  const instance: any = getState().web3.web3
  const { status } = getState().web3
  if (typeof Web3.givenProvider === 'undefined') {
    // Not Metamask
    dispatch(updateStatus({ status: Web3Status.walletNotFound }))
    const provider = new Web3.providers.HttpProvider(getHTTPProviderAddress())
    instance.setProvider(provider)
  } else {
    // Found provider
    if (typeof (window as any).ethereum !== 'undefined') {
      dispatch(updateMetamask({ isMetamask: true }))
    } else {
      dispatch(updateMetamask({ isMetamask: false }))
    }

    if (
      status === Web3Status.uninitialized ||
      status === Web3Status.walletNotFound
    ) {
      instance.setProvider(Web3.givenProvider)
    }

    const address = await instance.eth.getAccounts()
    if (address.length === 0) {
      dispatch(updateStatus({ status: Web3Status.walletLocked }))
    } else {
      dispatch(updateAddress({ address: address[0] }))
      dispatch(updateStatus({ status: Web3Status.walletAvailable }))
    }
  }

  const networkId = await instance.eth.net.getId()
  if (isCollectNerwork(networkId)) {
    dispatch(updateNetworkStatus({ status: Web3NetWorkStatus.collect }))
  } else {
    dispatch(updateNetworkStatus({ status: Web3NetWorkStatus.wrong }))
  }
  dispatch(
    updateNetwork({ network: networkId, name: getNetworkName(networkId) }),
  )
}

/**
 * INITIAL STATE
 */

export interface IWeb3State {
  web3: Web3
  status: Web3Status
  network: Web3NetWork
  networkName: string
  networkStatus: Web3NetWorkStatus
  isMetamask: boolean
  isMetamaskPrivacyEnable: boolean
  userAddress: string
  requiredNetworkName: string
}

const INITIAL_STATE: IWeb3State = {
  isMetamask: false,
  isMetamaskPrivacyEnable: false,
  network: Web3NetWork.rinkeby,
  networkName: '',
  networkStatus: Web3NetWorkStatus.wrong,
  requiredNetworkName: getRequiredNetworkName(),
  status: Web3Status.uninitialized,
  userAddress: '',
  web3: new Web3(new Web3.providers.HttpProvider(getHTTPProviderAddress())),
}

export default reducerWithInitialState(INITIAL_STATE)
  .case(updateNetwork, (state, { network, name }) => ({
    ...state,
    network,
    networkName: name,
  }))
  .case(updateAddress, (state, { address }) => ({
    ...state,
    userAddress: toLower(address),
  }))
  .case(updateStatus, (state, { status }) => ({
    ...state,
    status,
  }))
  .case(updateNetworkStatus, (state, { status }) => ({
    ...state,
    networkStatus: status,
  }))
  .case(updateMetamask, (state, { isMetamask }) => ({
    ...state,
    isMetamask,
  }))
  .case(updatePrivacyModeStatus, (state, { status }) => ({
    ...state,
    isMetamaskPrivacyEnable: status,
  }))
