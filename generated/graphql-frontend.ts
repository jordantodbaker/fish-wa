import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
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
  updateUser?: Maybe<Scalars['Int']['output']>;
  updateUserLakes?: Maybe<UserLakes>;
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

export type CountiesQueryVariables = Exact<{ [key: string]: never; }>;


export type CountiesQuery = { __typename?: 'Query', counties: Array<{ __typename?: 'County', id: number, name: string, shortName: string, lakes: Array<{ __typename?: 'Lake', id: number, name?: string | null }> }> };

export type UpdateUserLakesMutationVariables = Exact<{
  input: UpdateUserLakesInput;
}>;


export type UpdateUserLakesMutation = { __typename?: 'Mutation', updateUserLakes?: { __typename?: 'UserLakes', userLakes: Array<number | null> } | null };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: number | null };

export type UserQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, email: string, phoneNumber?: string | null, lastLogin?: string | null, lastNotification?: string | null, sendText?: boolean | null, sendEmail?: boolean | null, lakeIds?: Array<number | null> | null, lakes?: Array<{ __typename?: 'Lake', id: number, name?: string | null } | null> | null, stockingReports?: Array<{ __typename?: 'StockingReport', lakeId?: number | null, name?: string | null, date?: string | null, number?: number | null, species?: string | null, size?: number | null } | null> | null } | null };


export const CountiesDocument = gql`
    query Counties {
  counties {
    id
    name
    shortName
    lakes {
      id
      name
    }
  }
}
    `;

/**
 * __useCountiesQuery__
 *
 * To run a query within a React component, call `useCountiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountiesQuery(baseOptions?: Apollo.QueryHookOptions<CountiesQuery, CountiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountiesQuery, CountiesQueryVariables>(CountiesDocument, options);
      }
export function useCountiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountiesQuery, CountiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountiesQuery, CountiesQueryVariables>(CountiesDocument, options);
        }
export function useCountiesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CountiesQuery, CountiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CountiesQuery, CountiesQueryVariables>(CountiesDocument, options);
        }
export type CountiesQueryHookResult = ReturnType<typeof useCountiesQuery>;
export type CountiesLazyQueryHookResult = ReturnType<typeof useCountiesLazyQuery>;
export type CountiesSuspenseQueryHookResult = ReturnType<typeof useCountiesSuspenseQuery>;
export type CountiesQueryResult = Apollo.QueryResult<CountiesQuery, CountiesQueryVariables>;
export const UpdateUserLakesDocument = gql`
    mutation UpdateUserLakes($input: UpdateUserLakesInput!) {
  updateUserLakes(input: $input) {
    userLakes
  }
}
    `;
export type UpdateUserLakesMutationFn = Apollo.MutationFunction<UpdateUserLakesMutation, UpdateUserLakesMutationVariables>;

/**
 * __useUpdateUserLakesMutation__
 *
 * To run a mutation, you first call `useUpdateUserLakesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserLakesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserLakesMutation, { data, loading, error }] = useUpdateUserLakesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserLakesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserLakesMutation, UpdateUserLakesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserLakesMutation, UpdateUserLakesMutationVariables>(UpdateUserLakesDocument, options);
      }
export type UpdateUserLakesMutationHookResult = ReturnType<typeof useUpdateUserLakesMutation>;
export type UpdateUserLakesMutationResult = Apollo.MutationResult<UpdateUserLakesMutation>;
export type UpdateUserLakesMutationOptions = Apollo.BaseMutationOptions<UpdateUserLakesMutation, UpdateUserLakesMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input)
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UserDocument = gql`
    query User($email: String!) {
  user(email: $email) {
    id
    email
    phoneNumber
    lastLogin
    lastNotification
    sendText
    sendEmail
    lakes {
      id
      name
    }
    lakeIds
    stockingReports {
      lakeId
      name
      date
      number
      species
      size
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export function useUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<typeof useUserSuspenseQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;