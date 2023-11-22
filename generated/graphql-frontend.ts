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
  name: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
};

export type CreateUserInput = {
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  salt: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type DisplayUser = {
  __typename?: 'DisplayUser';
  accessToken?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  message: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<DisplayUser>;
  login?: Maybe<DisplayUser>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationLoginArgs = {
  input: UserLoginInput;
};

export type Query = {
  __typename?: 'Query';
  counties: Array<County>;
  users: Array<User>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int']['output'];
  password: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  salt: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserLoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CountiesQueryVariables = Exact<{ [key: string]: never; }>;


export type CountiesQuery = { __typename?: 'Query', counties: Array<{ __typename?: 'County', id: number, name: string, shortName: string }> };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'DisplayUser', id?: number | null, username: string, phoneNumber: string } | null };

export type LogInMutationVariables = Exact<{
  input: UserLoginInput;
}>;


export type LogInMutation = { __typename?: 'Mutation', login?: { __typename?: 'DisplayUser', id?: number | null, username: string, phoneNumber: string, message: string, accessToken?: string | null } | null };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, username: string, password: string, salt: string, phoneNumber: string }> };


export const CountiesDocument = gql`
    query Counties {
  counties {
    id
    name
    shortName
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
export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    username
    phoneNumber
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LogInDocument = gql`
    mutation LogIn($input: UserLoginInput!) {
  login(input: $input) {
    id
    username
    phoneNumber
    message
    accessToken
  }
}
    `;
export type LogInMutationFn = Apollo.MutationFunction<LogInMutation, LogInMutationVariables>;

/**
 * __useLogInMutation__
 *
 * To run a mutation, you first call `useLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInMutation, { data, loading, error }] = useLogInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLogInMutation(baseOptions?: Apollo.MutationHookOptions<LogInMutation, LogInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogInMutation, LogInMutationVariables>(LogInDocument, options);
      }
export type LogInMutationHookResult = ReturnType<typeof useLogInMutation>;
export type LogInMutationResult = Apollo.MutationResult<LogInMutation>;
export type LogInMutationOptions = Apollo.BaseMutationOptions<LogInMutation, LogInMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    username
    password
    salt
    phoneNumber
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export function useUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersSuspenseQueryHookResult = ReturnType<typeof useUsersSuspenseQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;