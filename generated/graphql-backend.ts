import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type County = {
  __typename?: 'County';
  id: Scalars['Int']['output'];
  lakes: Array<Lake>;
  name: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type DisplayUser = {
  __typename?: 'DisplayUser';
  accessToken?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id?: Maybe<Scalars['Int']['output']>;
  lakeIds?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  lakes?: Maybe<Array<Maybe<Lake>>>;
  lastLogin?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  sendEmail?: Maybe<Scalars['Boolean']['output']>;
  sendText?: Maybe<Scalars['Boolean']['output']>;
  stockingReports?: Maybe<Array<Maybe<StockingReport>>>;
};

export type Lake = {
  __typename?: 'Lake';
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<DisplayUser>;
  updateUser?: Maybe<Scalars['Int']['output']>;
  updateUserLakes?: Maybe<UserLakes>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateUserLakesArgs = {
  input: UpdateUserLakesInput;
};

export type Query = {
  __typename?: 'Query';
  counties: Array<County>;
  user?: Maybe<User>;
};


export type QueryUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
};

export type StockingReport = {
  __typename?: 'StockingReport';
  date?: Maybe<Scalars['String']['output']>;
  lakeId?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['Int']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
  species?: Maybe<Scalars['String']['output']>;
};

export type UpdateUserInput = {
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  sendEmail?: InputMaybe<Scalars['Boolean']['input']>;
  sendText?: InputMaybe<Scalars['Boolean']['input']>;
  userId: Scalars['Int']['input'];
};

export type UpdateUserLakesInput = {
  lakeIds: Array<InputMaybe<Scalars['Int']['input']>>;
  userId: Scalars['Int']['input'];
};

export type UpdateUserValues = {
  __typename?: 'UpdateUserValues';
  phoneNumber?: Maybe<Scalars['String']['output']>;
  sendEmail?: Maybe<Scalars['Boolean']['output']>;
  sendText?: Maybe<Scalars['Boolean']['output']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lakeIds?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  lakes?: Maybe<Array<Maybe<Lake>>>;
  lastLogin?: Maybe<Scalars['String']['output']>;
  lastNotification?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  sendEmail?: Maybe<Scalars['Boolean']['output']>;
  sendText?: Maybe<Scalars['Boolean']['output']>;
  stockingReports?: Maybe<Array<Maybe<StockingReport>>>;
};

export type UserLakes = {
  __typename?: 'UserLakes';
  userLakes: Array<Maybe<Scalars['Int']['output']>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  County: ResolverTypeWrapper<County>;
  CreateUserInput: CreateUserInput;
  DisplayUser: ResolverTypeWrapper<DisplayUser>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Lake: ResolverTypeWrapper<Lake>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  StockingReport: ResolverTypeWrapper<StockingReport>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateUserInput: UpdateUserInput;
  UpdateUserLakesInput: UpdateUserLakesInput;
  UpdateUserValues: ResolverTypeWrapper<UpdateUserValues>;
  User: ResolverTypeWrapper<User>;
  UserLakes: ResolverTypeWrapper<UserLakes>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  County: County;
  CreateUserInput: CreateUserInput;
  DisplayUser: DisplayUser;
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Lake: Lake;
  Mutation: {};
  Query: {};
  StockingReport: StockingReport;
  String: Scalars['String']['output'];
  UpdateUserInput: UpdateUserInput;
  UpdateUserLakesInput: UpdateUserLakesInput;
  UpdateUserValues: UpdateUserValues;
  User: User;
  UserLakes: UserLakes;
};

export type CountyResolvers<ContextType = any, ParentType extends ResolversParentTypes['County'] = ResolversParentTypes['County']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lakes?: Resolver<Array<ResolversTypes['Lake']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shortName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DisplayUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['DisplayUser'] = ResolversParentTypes['DisplayUser']> = {
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  lakeIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  lakes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Lake']>>>, ParentType, ContextType>;
  lastLogin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sendEmail?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  sendText?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  stockingReports?: Resolver<Maybe<Array<Maybe<ResolversTypes['StockingReport']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LakeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Lake'] = ResolversParentTypes['Lake']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<Maybe<ResolversTypes['DisplayUser']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
  updateUserLakes?: Resolver<Maybe<ResolversTypes['UserLakes']>, ParentType, ContextType, RequireFields<MutationUpdateUserLakesArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  counties?: Resolver<Array<ResolversTypes['County']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUserArgs>>;
};

export type StockingReportResolvers<ContextType = any, ParentType extends ResolversParentTypes['StockingReport'] = ResolversParentTypes['StockingReport']> = {
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lakeId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  species?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateUserValuesResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateUserValues'] = ResolversParentTypes['UpdateUserValues']> = {
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sendEmail?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  sendText?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lakeIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  lakes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Lake']>>>, ParentType, ContextType>;
  lastLogin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastNotification?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sendEmail?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  sendText?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  stockingReports?: Resolver<Maybe<Array<Maybe<ResolversTypes['StockingReport']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserLakesResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserLakes'] = ResolversParentTypes['UserLakes']> = {
  userLakes?: Resolver<Array<Maybe<ResolversTypes['Int']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  County?: CountyResolvers<ContextType>;
  DisplayUser?: DisplayUserResolvers<ContextType>;
  Lake?: LakeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  StockingReport?: StockingReportResolvers<ContextType>;
  UpdateUserValues?: UpdateUserValuesResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserLakes?: UserLakesResolvers<ContextType>;
};

