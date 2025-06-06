// This file is auto-generated by @hey-api/openapi-ts

import type { Options as ClientOptions, TDataShape, Client } from '@hey-api/client-fetch';
import type { CreatorRolesListData, CreatorRolesListResponse, CreatorsListData, CreatorsListResponse, CreatorsReadData, CreatorsReadResponse, DevelopersListData, DevelopersListResponse, DevelopersReadData, DevelopersReadResponse, GamesListData, GamesListResponse, GamesAdditionsListData, GamesAdditionsListResponse, GamesDevelopmentTeamListData, GamesDevelopmentTeamListResponse, GamesGameSeriesListData, GamesGameSeriesListResponse, GamesParentGamesListData, GamesParentGamesListResponse, GamesScreenshotsListData, GamesScreenshotsListResponse, GamesStoresListData, GamesStoresListResponse, GamesReadData, GamesReadResponse, GamesAchievementsReadData, GamesAchievementsReadResponse, GamesMoviesReadData, GamesMoviesReadResponse, GamesRedditReadData, GamesRedditReadResponse, GamesSuggestedReadData, GamesSuggestedReadResponse, GamesTwitchReadData, GamesTwitchReadResponse, GamesYoutubeReadData, GamesYoutubeReadResponse, GenresListData, GenresListResponse, GenresReadData, GenresReadResponse, PlatformsListData, PlatformsListResponse, PlatformsListsParentsListData, PlatformsListsParentsListResponse, PlatformsReadData, PlatformsReadResponse, PublishersListData, PublishersListResponse, PublishersReadData, PublishersReadResponse, StoresListData, StoresListResponse, StoresReadData, StoresReadResponse, TagsListData, TagsListResponse, TagsReadData, TagsReadResponse } from './types.gen';
import { client as _heyApiClient } from './client.gen';

export type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean> = ClientOptions<TData, ThrowOnError> & {
    /**
     * You can provide a client instance returned by `createClient()` instead of
     * individual options. This might be also useful if you want to implement a
     * custom client.
     */
    client?: Client;
    /**
     * You can pass arbitrary values through the `meta` object. This can be
     * used to access values that aren't defined as part of the SDK function.
     */
    meta?: Record<string, unknown>;
};

/**
 * Get a list of creator positions (jobs).
 */
export const creatorRolesList = <ThrowOnError extends boolean = false>(options?: Options<CreatorRolesListData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<CreatorRolesListResponse, unknown, ThrowOnError>({
        url: '/creator-roles',
        ...options
    });
};

/**
 * Get a list of game creators.
 */
export const creatorsList = <ThrowOnError extends boolean = false>(options?: Options<CreatorsListData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<CreatorsListResponse, unknown, ThrowOnError>({
        url: '/creators',
        ...options
    });
};

/**
 * Get details of the creator.
 */
export const creatorsRead = <ThrowOnError extends boolean = false>(options: Options<CreatorsReadData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<CreatorsReadResponse, unknown, ThrowOnError>({
        url: '/creators/{id}',
        ...options
    });
};

/**
 * Get a list of game developers.
 */
export const developersList = <ThrowOnError extends boolean = false>(options?: Options<DevelopersListData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<DevelopersListResponse, unknown, ThrowOnError>({
        url: '/developers',
        ...options
    });
};

/**
 * Get details of the developer.
 */
export const developersRead = <ThrowOnError extends boolean = false>(options: Options<DevelopersReadData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<DevelopersReadResponse, unknown, ThrowOnError>({
        url: '/developers/{id}',
        ...options
    });
};

/**
 * Get a list of games.
 */
export const gamesList = <ThrowOnError extends boolean = false>(options?: Options<GamesListData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<GamesListResponse, unknown, ThrowOnError>({
        url: '/games',
        ...options
    });
};

/**
 * Get a list of DLC's for the game, GOTY and other editions, companion apps, etc.
 */
export const gamesAdditionsList = <ThrowOnError extends boolean = false>(options: Options<GamesAdditionsListData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GamesAdditionsListResponse, unknown, ThrowOnError>({
        url: '/games/{game_pk}/additions',
        ...options
    });
};

/**
 * Get a list of individual creators that were part of the development team.
 */
export const gamesDevelopmentTeamList = <ThrowOnError extends boolean = false>(options: Options<GamesDevelopmentTeamListData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GamesDevelopmentTeamListResponse, unknown, ThrowOnError>({
        url: '/games/{game_pk}/development-team',
        ...options
    });
};

/**
 * Get a list of games that are part of the same series.
 */
export const gamesGameSeriesList = <ThrowOnError extends boolean = false>(options: Options<GamesGameSeriesListData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GamesGameSeriesListResponse, unknown, ThrowOnError>({
        url: '/games/{game_pk}/game-series',
        ...options
    });
};

/**
 * Get a list of parent games for DLC's and editions.
 */
export const gamesParentGamesList = <ThrowOnError extends boolean = false>(options: Options<GamesParentGamesListData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GamesParentGamesListResponse, unknown, ThrowOnError>({
        url: '/games/{game_pk}/parent-games',
        ...options
    });
};

/**
 * Get screenshots for the game.
 */
export const gamesScreenshotsList = <ThrowOnError extends boolean = false>(options: Options<GamesScreenshotsListData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GamesScreenshotsListResponse, unknown, ThrowOnError>({
        url: '/games/{game_pk}/screenshots',
        ...options
    });
};

/**
 * Get links to the stores that sell the game.
 */
export const gamesStoresList = <ThrowOnError extends boolean = false>(options: Options<GamesStoresListData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GamesStoresListResponse, unknown, ThrowOnError>({
        url: '/games/{game_pk}/stores',
        ...options
    });
};

/**
 * Get details of the game.
 */
export const gamesRead = <ThrowOnError extends boolean = false>(options: Options<GamesReadData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GamesReadResponse, unknown, ThrowOnError>({
        url: '/games/{id}',
        ...options
    });
};

/**
 * Get a list of game achievements.
 */
export const gamesAchievementsRead = <ThrowOnError extends boolean = false>(options: Options<GamesAchievementsReadData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GamesAchievementsReadResponse, unknown, ThrowOnError>({
        url: '/games/{id}/achievements',
        ...options
    });
};

/**
 * Get a list of game trailers.
 */
export const gamesMoviesRead = <ThrowOnError extends boolean = false>(options: Options<GamesMoviesReadData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GamesMoviesReadResponse, unknown, ThrowOnError>({
        url: '/games/{id}/movies',
        ...options
    });
};

/**
 * Get a list of most recent posts from the game's subreddit.
 */
export const gamesRedditRead = <ThrowOnError extends boolean = false>(options: Options<GamesRedditReadData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GamesRedditReadResponse, unknown, ThrowOnError>({
        url: '/games/{id}/reddit',
        ...options
    });
};

/**
 * Get a list of visually similar games, available only for business and enterprise API users.
 */
export const gamesSuggestedRead = <ThrowOnError extends boolean = false>(options: Options<GamesSuggestedReadData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GamesSuggestedReadResponse, unknown, ThrowOnError>({
        url: '/games/{id}/suggested',
        ...options
    });
};

/**
 * Get streams on Twitch associated with the game, available only for business and enterprise API users.
 */
export const gamesTwitchRead = <ThrowOnError extends boolean = false>(options: Options<GamesTwitchReadData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GamesTwitchReadResponse, unknown, ThrowOnError>({
        url: '/games/{id}/twitch',
        ...options
    });
};

/**
 * Get videos from YouTube associated with the game, available only for business and enterprise API users.
 */
export const gamesYoutubeRead = <ThrowOnError extends boolean = false>(options: Options<GamesYoutubeReadData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GamesYoutubeReadResponse, unknown, ThrowOnError>({
        url: '/games/{id}/youtube',
        ...options
    });
};

/**
 * Get a list of video game genres.
 */
export const genresList = <ThrowOnError extends boolean = false>(options?: Options<GenresListData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<GenresListResponse, unknown, ThrowOnError>({
        url: '/genres',
        ...options
    });
};

/**
 * Get details of the genre.
 */
export const genresRead = <ThrowOnError extends boolean = false>(options: Options<GenresReadData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GenresReadResponse, unknown, ThrowOnError>({
        url: '/genres/{id}',
        ...options
    });
};

/**
 * Get a list of video game platforms.
 */
export const platformsList = <ThrowOnError extends boolean = false>(options?: Options<PlatformsListData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<PlatformsListResponse, unknown, ThrowOnError>({
        url: '/platforms',
        ...options
    });
};

/**
 * Get a list of parent platforms.
 * For instance, for PS2 and PS4 the “parent platform” is PlayStation.
 */
export const platformsListsParentsList = <ThrowOnError extends boolean = false>(options?: Options<PlatformsListsParentsListData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<PlatformsListsParentsListResponse, unknown, ThrowOnError>({
        url: '/platforms/lists/parents',
        ...options
    });
};

/**
 * Get details of the platform.
 */
export const platformsRead = <ThrowOnError extends boolean = false>(options: Options<PlatformsReadData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<PlatformsReadResponse, unknown, ThrowOnError>({
        url: '/platforms/{id}',
        ...options
    });
};

/**
 * Get a list of video game publishers.
 */
export const publishersList = <ThrowOnError extends boolean = false>(options?: Options<PublishersListData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<PublishersListResponse, unknown, ThrowOnError>({
        url: '/publishers',
        ...options
    });
};

/**
 * Get details of the publisher.
 */
export const publishersRead = <ThrowOnError extends boolean = false>(options: Options<PublishersReadData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<PublishersReadResponse, unknown, ThrowOnError>({
        url: '/publishers/{id}',
        ...options
    });
};

/**
 * Get a list of video game storefronts.
 */
export const storesList = <ThrowOnError extends boolean = false>(options?: Options<StoresListData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<StoresListResponse, unknown, ThrowOnError>({
        url: '/stores',
        ...options
    });
};

/**
 * Get details of the store.
 */
export const storesRead = <ThrowOnError extends boolean = false>(options: Options<StoresReadData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<StoresReadResponse, unknown, ThrowOnError>({
        url: '/stores/{id}',
        ...options
    });
};

/**
 * Get a list of tags.
 */
export const tagsList = <ThrowOnError extends boolean = false>(options?: Options<TagsListData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<TagsListResponse, unknown, ThrowOnError>({
        url: '/tags',
        ...options
    });
};

/**
 * Get details of the tag.
 */
export const tagsRead = <ThrowOnError extends boolean = false>(options: Options<TagsReadData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<TagsReadResponse, unknown, ThrowOnError>({
        url: '/tags/{id}',
        ...options
    });
};