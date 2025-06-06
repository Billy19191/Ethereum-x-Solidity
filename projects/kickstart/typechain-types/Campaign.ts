/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface CampaignInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "approveRequest"
      | "approverCount"
      | "approvers"
      | "contribute"
      | "createRequest"
      | "finalizeRequest"
      | "manager"
      | "minimumContribution"
      | "requests"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "approveRequest",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "approverCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "approvers",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "contribute",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createRequest",
    values: [string, BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "finalizeRequest",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "manager", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "minimumContribution",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "requests",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "approveRequest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approverCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "approvers", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "contribute", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createRequest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "finalizeRequest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "manager", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "minimumContribution",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "requests", data: BytesLike): Result;
}

export interface Campaign extends BaseContract {
  connect(runner?: ContractRunner | null): Campaign;
  waitForDeployment(): Promise<this>;

  interface: CampaignInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  approveRequest: TypedContractMethod<[index: BigNumberish], [void], "payable">;

  approverCount: TypedContractMethod<[], [bigint], "view">;

  approvers: TypedContractMethod<[arg0: AddressLike], [boolean], "view">;

  contribute: TypedContractMethod<[], [void], "payable">;

  createRequest: TypedContractMethod<
    [description: string, value: BigNumberish, recipient: AddressLike],
    [void],
    "payable"
  >;

  finalizeRequest: TypedContractMethod<
    [index: BigNumberish],
    [void],
    "payable"
  >;

  manager: TypedContractMethod<[], [string], "view">;

  minimumContribution: TypedContractMethod<[], [bigint], "view">;

  requests: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, string, boolean, bigint] & {
        description: string;
        value: bigint;
        recipient: string;
        complete: boolean;
        approvalCount: bigint;
      }
    ],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "approveRequest"
  ): TypedContractMethod<[index: BigNumberish], [void], "payable">;
  getFunction(
    nameOrSignature: "approverCount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "approvers"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "contribute"
  ): TypedContractMethod<[], [void], "payable">;
  getFunction(
    nameOrSignature: "createRequest"
  ): TypedContractMethod<
    [description: string, value: BigNumberish, recipient: AddressLike],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "finalizeRequest"
  ): TypedContractMethod<[index: BigNumberish], [void], "payable">;
  getFunction(
    nameOrSignature: "manager"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "minimumContribution"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "requests"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, string, boolean, bigint] & {
        description: string;
        value: bigint;
        recipient: string;
        complete: boolean;
        approvalCount: bigint;
      }
    ],
    "view"
  >;

  filters: {};
}
