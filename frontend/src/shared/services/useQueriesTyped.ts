// For typing useQueries
// - UseQueryResult uses <unknown, unknown>[] by default and it
// - isn't currently possible by default to strongly type useQueries
// - without a custom wrapper of your own

// Referenced from https://blog.johnnyreilly.com/2021/01/03/strongly-typing-react-query-s-usequeries/

import { useQueries, UseQueryOptions, UseQueryResult } from 'react-query';

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

export function useQueriesTyped<TQueries extends readonly UseQueryOptions[]>(
	queries: [...TQueries]
): {
	[ArrayElement in keyof TQueries]: UseQueryResult<
		TQueries[ArrayElement] extends { select: infer TSelect }
			? TSelect extends (data: any) => any
				? ReturnType<TSelect>
				: never
			: Awaited<
					ReturnType<
						NonNullable<
							Extract<TQueries[ArrayElement], UseQueryOptions>['queryFn']
						>
					>
			  >
	>;
} {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return useQueries(
		queries as UseQueryOptions<unknown, unknown, unknown>[]
	) as any;
}
